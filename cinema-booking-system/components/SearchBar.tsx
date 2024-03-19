"use client"
// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search">
      <div className="search-item">
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search for a movie"
          style={{ fontSize: '16px' }} 
          autoComplete="search"
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="button block">
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
