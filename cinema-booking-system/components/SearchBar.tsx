"use client"

/*
import React from 'react'

const SearchBar = () => {
  return (
    <div className="search">
        <div className="search-item">
            <input
            id="search"
            type="text"
            name="search"
            defaultValue="Search for a movie"
            style={{ fontSize: '16px' }} 
            autoComplete="search"
            required
            />
        </div>
        <div className="button block">
            <button type="submit">Search</button>
        </div>
    </div>
  )
}

export default SearchBar
*/

/*
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Perform search when the search button is clicked
    try {
      const response = await fetch(`/api/search?term=${encodeURIComponent(searchQuery)}`);
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

export default SearchBar
*/


// components/SearchBar.tsx
import { useState } from 'react';
import axios from 'axios';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
            <li key={result.movie_id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
