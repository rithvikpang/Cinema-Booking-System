"use client"

// components/Body.tsx
// components/Body.tsx
import React, { useEffect, useState } from 'react';
import { useSearch, SearchResult } from './SearchContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostCard from './PostCard';
import SearchBar from './SearchBar'; // Assuming SearchBar is now a child component used for searching
import { Movie } from '../utils/types'; // Import the type



const Body = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false); // Tracks if a search has been performed
  const [selectedCategory, setSelectedCategory] = useState<string>('Now Playing');

  useEffect(() => {
    async function fetchMovies() {
      try {
          const response = await fetch('http://localhost:8080/api/movies/getAll');
          const data = await response.json();
          setMovies(data);
      } catch (error) {
          console.error('Error fetching movies:', error);
          toast.error('Failed to load movies.');
      }
    }

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log("Selected Category: ", selectedCategory); // Check if state updates
    const filteredMovies = selectedCategory ? movies.filter(movie => movie.category === selectedCategory) : movies;
    setSearchResults(filteredMovies);
  }, [selectedCategory, movies]);

  const handleSearch = async (query: string) => {
    setIsSearched(true); // Indicate that a search was attempted

    if (query.trim() === '') {
      // If query is empty, revert to showing all movies and clear previous search results
      setSearchResults([]);
      toast.info('Please enter a valid movie title.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/movies/search/by-title?title=${encodeURIComponent(query)}`);
      const data: Movie[] = await response.json();
      setSearchResults(data);
      if (data.length === 0) {
        toast.error('No movies found for the given search criteria.');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      toast.error('Failed to perform search.');
      setSearchResults([]); // Optionally handle error by clearing search results or other means
    }
  };

  // Filter movies based on category
  const nowPlayingMovies = movies.filter(movie => movie.category === "Now Playing");
  const comingSoonMovies = movies.filter(movie => movie.category === "Coming Soon");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setIsSearched(false); // Reset search when category changes
  };

  // Decide which movies to display based on search or default categories
  //const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : (isSearched ? [] : movies);
  //const displayedMovies = selectedCategory ? movies.filter(movie => movie.category === selectedCategory) : movies;
  const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : 
  (selectedCategory ? movies.filter(movie => movie.category === selectedCategory) : movies);

  return (
    <div className="container">
        <div className="search-button block">
          <SearchBar onSearch={handleSearch} />
          <select onChange={handleCategoryChange} value={selectedCategory} className="movie-cat">
          <option value="Now Playing">Now Showing</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>
          <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true}
          newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
          <div className="three-col">
            {displayedMovies.map((movie, index) => (
              <PostCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
          </div>
    </div>
  );
}

export default Body;
