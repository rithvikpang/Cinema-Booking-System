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

import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Perform search when the search button is clicked
    try {
      const response = await fetch(`/api/movies?search=${encodeURIComponent(searchQuery)}`);
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