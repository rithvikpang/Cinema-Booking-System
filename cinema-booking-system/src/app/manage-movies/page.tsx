"use client"
import React, { useEffect, useState } from 'react';
import EditMoviePostCard from '../../../components/EditMoviePostCard';
import { Movie } from '../../../utils/types'; // Import the type
import { useRouter } from 'next/navigation';

interface UserProfile {
  admin: boolean;
  // Add other fields as they are defined in your database
}

const ManagePromos: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    admin: true,
    // Initialize other fields as needed
  });

  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false); // Tracks if a search has been performed


  useEffect(() => {
    const storedToken = localStorage.getItem("token");

  // If token exists, assign value to token
  if (storedToken) {
    setToken(storedToken);
  }
  
}, []);

useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/unauth-page')  // Does not allow non-logged in users to access this page
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

//const test2 = profile.admin;
//console.log("admin test 2: " + test2);

// Does not allow users and non-logged in users to access this page
if (profile.admin == false) {
    router.push('/unauth-page')
    return null;
}

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:8080/api/movies/getAll');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  // Filter movies based on category
  const nowPlayingMovies = movies.filter(movie => movie.category === "Now Playing");
  const comingSoonMovies = movies.filter(movie => movie.category === "Coming Soon");

  // Decide which movies to display based on search or default categories
  const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : (isSearched ? [] : movies);

  return (
    <div className="container">
        <h1>Manage Movies</h1>
        <div className="three-col">
            {displayedMovies.map((movie, index) => (
                <EditMoviePostCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
        </div>
    </div>
  );
}

export default ManagePromos;
