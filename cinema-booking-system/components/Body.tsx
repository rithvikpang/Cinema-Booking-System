"use client"

// components/Body.tsx
// components/Body.tsx
import React, { useEffect, useState } from 'react';
import { useSearch, SearchResult } from './SearchContext';
import PostCard from './PostCard';
import SearchBar from './SearchBar'; // Assuming SearchBar is now a child component used for searching
import { Movie } from '../utils/types'; // Import the type


/*
const Body: React.FC = () => {
  const { searchResults } = useSearch();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Optionally, you can move the search handling logic here if you want to keep everything within Body
  // For now, it looks like SearchBar will handle its own logic and update the context

  const nowPlayingMovies = searchResults.filter(movie => movie.category === 'Now Playing');
  const comingSoonMovies = searchResults.filter(movie => movie.category === 'Coming Soon');

  return (
    <div>
      <SearchBar setSearchQuery={setSearchQuery} />
      <h2>Now Playing</h2>
      <div className="movies-grid">
        {nowPlayingMovies.map(movie => (
          <PostCard key={movie.id} movie={movie} />
        ))}
      </div>

      <h2>Coming Soon</h2>
      <div className="movies-grid">
        {comingSoonMovies.map(movie => (
          <PostCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};


const Body = () => {
  return (
    <div className="container">
        <SearchBar/>
        <div>
          <h1 className="movie-label">
            Now Playing
          </h1>
        </div>
        <div className="three-col">
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
      </div>
      <div>
        <h1 className="movie-label">
            Coming Soon
        </h1>
      </div>
      <div className="three-col">
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
      </div>
    </div>
  )
}
*/

/*
const Body = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Replace this URL with your actual endpoint
      const response = await fetch('http://localhost:8080/api/movies/getAll');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  // Filter movies based on the 'category' attribute
  const nowPlayingMovies = movies.filter(movie => movie.category === "Now Playing");
  const comingSoonMovies = movies.filter(movie => movie.category === "Coming Soon");

  return (
    <div className="container">
        <SearchBar />
        <div>
          <h1 className="movie-label">Now Playing</h1>
        </div>
        <div className="three-col">
          {nowPlayingMovies.map((movie, index) => (
            // Using a combination of title and index as key to ensure uniqueness
            <PostCard key={`${movie.title}-${index}`} movie={movie} />
          ))}
        </div>
        <div>
          <h1 className="movie-label">Coming Soon</h1>
        </div>
        <div className="three-col">
            {comingSoonMovies.map((movie, index) => (
              // Using a combination of title and index as key to ensure uniqueness
              <PostCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
        </div>
    </div>
  );
}
*/

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
        <SearchBar onSearch={handleSearch} />
        {!isSearched || (isSearched && searchResults.length === 0) ? (
          <>
            <div>
              <h1 className="movie-label">Now Playing</h1>
              <div className="three-col">
                {nowPlayingMovies.map((movie, index) => (
                  <PostCard key={`${movie.title}-${index}`} movie={movie} />
                ))}
              </div>
            </div>
            <div>
              <h1 className="movie-label">Coming Soon</h1>
              <div className="three-col">
                  {comingSoonMovies.map((movie, index) => (
                    <PostCard key={`${movie.title}-${index}`} movie={movie} />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="three-col">
            {displayedMovies.map((movie, index) => (
              <PostCard key={`${movie.title}-${index}`} movie={movie} />
            ))}
          </div>
        )}
    </div>
  );
}

export default Body;
