"use client"

// components/Body.tsx
// components/Body.tsx
import React, { useEffect, useState } from 'react';
import { useSearch, SearchResult } from './SearchContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PostCard from './PostCard';
import SearchBar from './SearchBar'; // Assuming SearchBar is now a child component used for searching
import { Movie } from '../utils/types'; // Import the type



const Body = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false); // Tracks if a search has been performed
  const [selectedCategory, setSelectedCategory] = useState<string>('Now Playing');
  const [selectedDate, setSelectedDate] = useState<Date| null>(null);

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

    const genres = ['COMEDY', 'DRAMA', 'ACTION', 'ROMANCE', 'ADVENTURE', 'HORROR'];
    let url;

    if (genres.includes(query.toUpperCase())) {
      url = `http://localhost:8080/api/movies/search/by-genre?genre=${encodeURIComponent(query.toUpperCase())}`;
    } else {
      url = `http://localhost:8080/api/movies/search/by-title?title=${encodeURIComponent(query)}`;
    }

    try {
      const response = await fetch(url);
      const data: Movie[] = await response.json();
      setSearchResults(data);
      if (data.length === 0) {
        toast.error('No movies found for the given search criteria.');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      toast.error('Movie not found.');
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

  useEffect(() => {
    async function fetchMoviesByDate(date: Date) {
      if (date) {  // Ensure a date is selected before fetching
        const formattedDate = date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
        try {
          const response = await fetch(`http://localhost:8080/api/movies/search/by-show-date?showDate=${formattedDate}`);
          const data = await response.json();
          setMovies(data);
        } catch (error) {
          console.error('Error fetching movies by date:', error);
          toast.error('Failed to load movies for the selected date.');
        }
      }
    }
    if (selectedDate) { // Only call fetchMoviesByDate if selectedDate is not null
      fetchMoviesByDate(selectedDate);
    } else {
      setMovies([]); // Clear movies if no date is selected
    }
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Decide which movies to display based on search or default categories
  //const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : (isSearched ? [] : movies);
  //const displayedMovies = selectedCategory ? movies.filter(movie => movie.category === selectedCategory) : movies;
  const displayedMovies = isSearched && searchResults.length > 0 ? searchResults : 
  (selectedCategory ? movies.filter(movie => movie.category === selectedCategory) : movies);

  return (
    <div className="container">
        <div className="search-button block">
          <SearchBar onSearch={handleSearch}/>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="date-picker"
            //style={{ backgroundColor: '#ffffff', color: '#000000' }}
            placeholderText="Select a date to see movies"
          />
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
