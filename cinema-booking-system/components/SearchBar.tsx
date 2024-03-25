"use client"
/*
// components/SearchBar.tsx
import React, { useState } from 'react';

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
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
*/

/*
// components/SearchBar.tsx
import React, { useState } from 'react';
import { useSearch, SearchResult } from './SearchContext';

const SearchBar = ({searchQuery, setSearchQuery} : {searchQuery: string ,setSearchQuery : React.Dispatch<React.SetStateAction<string>>}) => {
  const searchResults = useSearch();

  const searchResString = searchResults

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/movies/search?term=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log(data);
      setSearchQuery(data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
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
    </div>
  );
};
*/
import React, { useState } from 'react';


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

/*
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

  return(
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
        </div>
      ))}
    </div>
  </div>
  );
};
*/

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission/page reload
    onSearch(searchQuery); // Use the passed in search handler
  };

  return (
    <div className="search">
        <div className="search-bar">
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
            </form>
        </div>
        <div>
            <button type="submit">Search</button> 
        </div>
    </div>
  );
};

export default SearchBar;
