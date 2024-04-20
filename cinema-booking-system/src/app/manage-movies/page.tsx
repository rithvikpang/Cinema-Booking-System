"use client"
import React, { useEffect, useState } from 'react';
import ManageMovie from '../../../components/ManageMovie';
import { Movie } from '../../../utils/types'; // Import the type

const Body = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false); // Tracks if a search has been performed

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:8080/api/movies/getAll');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearched(true); // Indicate that a search was attempted

    if (query.trim() === '') {
      // If query is empty, revert to showing all movies and clear previous search results
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/movies/search?term=${encodeURIComponent(query)}`);
      const data: Movie[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setSearchResults([]); // Optionally handle error by clearing search results or other means
    }
  };

  // Filter movies based on category
  const nowPlayingMovies = movies.filter(movie => movie.category === "Now Playing");
  const comingSoonMovies = movies.filter(movie => movie.category === "Coming Soon");

  // Decide which movies to display based on search or default categories
  const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : (isSearched ? [] : movies);

  return (
    <div className="container">
        <div className="three-col">
            {displayedMovies.map((movie, index) => (
                <ManageMovie key={`${movie.title}-${index}`} movie={movie} />
            ))}
        </div>
    </div>
  );
}

export default Body;
