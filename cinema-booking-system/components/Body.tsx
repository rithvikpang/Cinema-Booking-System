import React from 'react'
import PostCard from './PostCard'
import SearchBar from './SearchBar'

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

export default Body