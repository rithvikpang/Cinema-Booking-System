import React from 'react'

const SearchBar = () => {
  return (
    <div className="search">
        <div className="search-item">
            <input
            id="frm-search"
            type="text"
            name="search"
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