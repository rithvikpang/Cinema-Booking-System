// components/PostCard.tsx
import Image from 'next/image';
import React from 'react';
import { Movie } from '../utils/types'; // Import the type

interface PostCardProps {
  movie: Movie;
}

const PostCard: React.FC<PostCardProps> = ({ movie }) => {
  return (
    <div className="card">
      <Image
        src={movie.movie_image || '../public/placeholder-image.jpg'} // Replace with a placeholder or a default image if the URL is not available
        width={240}
        height={300}
        alt={`${movie.title} poster`}
      />
      <h3 className="description">{movie.title}</h3>
      <dl>
        <dt className="description">{movie.duration} MIN | {movie.rating}</dt>
        <dt className="description">Released {movie.release_date}</dt>
      </dl>
      <div className="home-buttons block">
        <div className="h-button block">
          <a href={movie.movie_trailer} target="_blank" rel="noopener noreferrer">
            <button type="button">Watch Trailer</button>
          </a>
        </div>
        <div className="h-button block">
          <button type="button">Book Movie</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
