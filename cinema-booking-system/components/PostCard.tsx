// PostCard.tsx
import Image from 'next/image';
import React, { useState } from 'react';
import { Movie } from '../utils/types'; // Import the type
import MovieInfo from './MovieInfo';

interface Props {
  movie: Movie;
}

const PostCard = ({ movie }: Props) => {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const openTrailerModal = () => setIsTrailerModalOpen(true);
  const closeTrailerModal = () => setIsTrailerModalOpen(false);

  console.log(movie);
  console.log(movie.imageUrl);

  return (
    <div className="three-col">
      <div className="card">
        <Image
          src={movie.imageUrl} // Update to use the correct property name
          width={240}
          height={300}
          alt={`${movie.title} poster`}
        />

        <h4 className="description">{movie.title}</h4>
        <dl>
          <dt className="description">{movie.duration} MIN | {movie.rating}</dt>
          <dt className="description">Released {movie.releaseDate}</dt>
        </dl>
        <div className="home-buttons">
          <div className="home-btn block">
            <button onClick={openTrailerModal}>
              More Info
            </button>
          </div>
        </div>
      </div>

      <MovieInfo
        isOpen={isTrailerModalOpen}
        onClose={closeTrailerModal}
        trailerUrl={movie.trailerUrl}
        title={movie.title}
        rating={movie.rating}
        genre={movie.genre_id}
        cast={movie.cast}
        director={movie.director}
        descr={movie.description}
        imageUrl={movie.imageUrl} // Update to use the correct property name
        producer={movie.producer}
        reviews={movie.reviews}
        shows={movie.shows}
      />
    </div>
  );
}

export default PostCard;
