"use client"
import React, { useEffect, useState } from 'react';
import EditMoviePostCard from '../../../components/EditMoviePostCard';
import { Movie } from '../../../utils/types'; // Import the type
import { useRouter } from 'next/navigation';

interface UserProfile {
  admin: boolean;
  // Add other fields as they are defined in your database
}
const Body = () => {
  const [profile, setProfile] = useState<UserProfile>({
    admin: true,
  });
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // If token exists, assign value to token
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page'); // Does not allow non-logged in users to access this page
        setError('No token found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile.admin) {
      fetchMovies();
    } else {
      router.push('/unauth-page')
    }
  }, [profile.admin]);

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:8080/api/movies/getAll');
    const data = await response.json();
    setMovies(data);
  };

  const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : (isSearched ? [] : movies);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container">
      <h1>Manage Movies</h1>
        <button type="submit" className="seats" onClick={() => router.push('add-movie')}>
                Add Movie
          </button>
      <div className="three-col">
        {displayedMovies.map((movie, index) => (
          <EditMoviePostCard key={`${movie.title}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Body;
