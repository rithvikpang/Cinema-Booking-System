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