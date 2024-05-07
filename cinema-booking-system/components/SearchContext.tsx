import React, { createContext, useContext, useState } from 'react';

export interface SearchResult {
  id: number; // Added for key purposes in lists
  title: string;
  description: string;
  duration: number;
  release_date: string;
  genre_id: number;
  rating: string;
  category: string;
  cast: string;
  director: string;
  movie_image: string;
  movie_trailer: string;
}

interface SearchContextType {
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};