"use client"
// components/SearchBar.tsx
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Perform search when the search button is clicked
    try {
      const response = await fetch(`/api/movies/api/search?term=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log(data); // Display or use the search results as needed
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <div className="search">
        <div className="search-item">
            <input
            id="search"
            type="text"
            name="search"
            style={{ fontSize: '16px' }} 
            autoComplete="search"
            required
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <div className="button block">
            <button type="submit" onClick={handleSearch}>Search</button>
        </div>
    </div>
  );
};
*/

// Define a type for your search results
interface SearchResult {
  title: string;
  description: string;
  duration: number;
  release_date: string; // Dates are typically represented as strings in JSON and can be parsed into Date objects if necessary
  genre_id: number;
  rating: string;
  category: string;
  cast: string;
  director: string;
  image_url: string;
  trailer_url: string;
}
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission/page reload
    try {
      // const response = await fetch(`/api/movies/search?term=${encodeURIComponent(searchQuery)}`);
      // const data = await response.json();
      // console.log(data); // Display or use the search results as needed
      // // Update state with the search results
      // // Ensure you're setting the searchResults state with the actual data structure returned by your API
      const response = await fetch(`http://localhost:8080/api/movies/search?term=${encodeURIComponent(searchQuery)}`);
      const data: SearchResult[] = await response.json();
      console.log(data); // Display or use the search results as needed
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      // Optionally update the UI to show an error message
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
          <input
            id="search"
            type="text"
            name="search"
            autoComplete="off"
            required
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((movie, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Release Date: {movie.release_date}</p>
            <img src={movie.image_url} alt={movie.title} style={{ width: '100px', height: '150px' }} />
            {/* You can add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
