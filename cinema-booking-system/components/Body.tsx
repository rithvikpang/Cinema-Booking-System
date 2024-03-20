"use client"
// components/Body.tsx
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import { Movie } from '../utils/types';

const Body: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch all movies when the component mounts
    fetchMovies();
  }, []);

  const fetchMovies = async (searchQuery?: string) => {
    // Construct the URL based on whether there's a search query
    const apiUrl = searchQuery ? `/api/search?term=${encodeURIComponent(searchQuery)}` : '/api/movies';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  // Call `fetchMovies` with the search term when a search is performed
  const handleSearch = (searchTerm: string) => {
    fetchMovies(searchTerm);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <div>
        <h1 className="movie-label">Movies</h1>
        <div className="three-col">
          {movies.map((movie) => (
            <PostCard key={movie.title} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
