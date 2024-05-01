"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserProfile {
  admin: boolean;
  // Add other fields as they are defined in your database
}

const ManageMovies: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);

  // Initialize state variables for movie details
  const [movieDetails, setMovieDetails] = useState({
    movie_id: queryParams.get('movieId'),
    title: queryParams.get('title') || '',
    rating: queryParams.get('rating') || '',
    duration: queryParams.get('duration') || '',
    imageUrl: queryParams.get('imageUrl') || '',
    trailerUrl: queryParams.get('trailerUrl') || '',
    category: queryParams.get('category') || '',
    genre: queryParams.get('genre') || '',
    cast: queryParams.get('cast') || '',
    director: queryParams.get('director') || '',
    description: queryParams.get('description') || '',
  });


  console.log("Movie id card: " + movieDetails.movie_id);

  const [profile, setProfile] = useState<UserProfile>({
    admin: true,
    // Initialize other fields as needed
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

  // Function to handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found in localStorage');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/edit-movie/{movieDetails.movie_id}`,
        movieDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(`Failed to update movie: ${response.data.error}`);
      }

      alert('Movie updated successfully');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Does not allow users and non-logged in users to access this page
  if (profile.admin === false) {
    router.push('/unauth-page');
    return null;
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Edit Movie Details</h1>
      <div className="movie-name block">
        <label htmlFor="frm-movie">Movie Name</label>
        <input
          id="inp"
          type="text"
          name="title"
          autoComplete="movie-name"
          value={movieDetails.title}
          onChange={handleChange}
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
          value={movieDetails.rating}
          onChange={handleChange}
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
          value={movieDetails.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div className="movie-image block">
        <label htmlFor="frm-movieimage">Movie Poster</label>
        <input
          id="inp"
          type="text"
          name="imageUrl"
          autoComplete="movieimage"
          value={movieDetails.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="movie-trailer block">
        <label htmlFor="frm-trailer">Trailer Link</label>
        <input
          id="inp"
          type="text"
          name="trailerUrl"
          autoComplete="trailer"
          value={movieDetails.trailerUrl}
          onChange={handleChange}
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
          value={movieDetails.category}
          onChange={handleChange}
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
          value={movieDetails.genre}
          onChange={handleChange}
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
          value={movieDetails.cast}
          onChange={handleChange}
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
                    value={movieDetails.director}
                    onChange={handleChange}
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
                    value={movieDetails.description}
                    onChange={handleChange}
                    required
                />
            </div> 
      <div className="save-button block">
        <button className="save-button block" type="submit">Save</button>
      </div>
    </form>
  );
}

export default ManageMovies;
