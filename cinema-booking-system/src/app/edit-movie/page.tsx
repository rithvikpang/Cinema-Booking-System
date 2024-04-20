"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
    admin: boolean;
}

interface Movie {
    title: string;
    descr: string;
    duration: number; // Assuming duration is in minutes
    release_date: string; // Or Date, if you want to convert the string to a Date object
    genre_id: number;
    rating: string;
    category: string;
    cast: string;
    director: string;
    image_url: string;
    trailer_url: string;
}
   
  const ManageMovies: React.FC = () => {
    
    const [profile, setProfile] = useState<UserProfile>({
      admin: true,
      // Initialize other fields as needed
    });
    
    const [movie, setMovie] = useState<Movie>({
        title: '',
        descr: '',
        duration: 0, // Assuming duration is in minutes
        release_date: '', // Or Date, if you want to convert the string to a Date object
        genre_id: 0,
        rating: '',
        category: '',
        cast: '',
        director: '',
        image_url: '',
        trailer_url: '',
      });

    const [token, setToken] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();
  
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile(prevProfile => ({
          ...prevProfile,
          [name]: value,
        }));
      };
     
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found in localStorage');
          return;
        }
     
        try {
          const response = await fetch('http://localhost:8080/api/user/movies', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
    
            body: JSON.stringify({
              title: movie.title,
              descr: movie.descr,
              duration: movie.duration,
              release_date: movie.release_date,
              genre_id: movie.genre_id,
              rating: movie.rating,
              category: movie.category,
              cast: movie.cast,
              director: movie.director,
              image_url: movie.image_url,
              trailer_url: movie.trailer_url,

              // Exclude email and other fields that should not be updated
            }),
          });
     
          if (!response.ok) {
            throw new Error(`Failed to update movie: ${response.status} ${response.statusText}`);
          }
     
          alert('Movie updated successfully');
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };
     
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

    // Does not allow users and non-logged in users to access this page
    if (profile.admin == false) {
        router.push('/unauth-page')
        return null;
    }
    
    return (
        <form className="container">
            <h1>Edit Movie Details</h1> 
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie Name</label>
                <input
                    id="inp"
                    type="text"
                    name="movie-name"
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="category block">
                <label htmlFor="frm-category">Category</label>
                <input
                    id="inp"
                    type="text"
                    name="category"
                    autoComplete="category"
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Genre</label>
                <input
                    id="inp"
                    type="text"
                    name="genre"
                    autoComplete="genre"
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Cast</label>
                <input
                    id="inp"
                    type="text"
                    name="cast"
                    autoComplete="cast"
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Director</label>
                <input
                    id="inp"
                    type="text"
                    name="director"
                    autoComplete="director"
                    required
                />
            </div>
            <div className="summary block">
                <label htmlFor="frm-description">Description</label>
                <input
                    id="inp"
                    type="text"
                    name="description"
                    autoComplete="description"
                    required
                />
            </div> 
            <div className="duration block">
                <label htmlFor="frm-duration">Duration</label>
                <input
                    id="inp"
                    type="text"
                    name="duration"
                    autoComplete="duration"
                    required
                />
            </div>
            <div className="rating block">
                <label htmlFor="frm-rating">Rating</label>
                <input
                    id="inp"
                    type="text"
                    name="rating"
                    autoComplete="rating"
                    required
                />
            </div>
            <div className="movie-image block">
                <label htmlFor="frm-movieimage">Movie Poster</label>
                <input
                    id="inp"
                    type="text"
                    name="movieimage"
                    autoComplete="movieimage"
                    required
                />
            </div>
            <div className="movie-trailer block">
                <label htmlFor="frm-trailer">Trailer Link</label>
                <input
                    id="inp"
                    type="text"
                    name="trailer"
                    autoComplete="trailer"
                    required
                />
            </div>
            <div className="save-button block">
                <button className="save-button block">Save</button>
            </div>
            
        </form>
    )
}

export default ManageMovies;