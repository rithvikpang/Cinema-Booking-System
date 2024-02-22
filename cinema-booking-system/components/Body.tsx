import React from 'react'
import PostCard from './PostCard'

const Body = () => {
  return (
    <div className="body">
      <div>
        
      </div>
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