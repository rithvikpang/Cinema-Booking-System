
import Image from 'next/image';
import React, { useState } from 'react';
import { Movie } from '../utils/types'; // Import the type
import MovieInfo from './MovieInfo'
import Link from 'next/link'

interface Props {
  movie: Movie;
}

const PostCard = ({ movie }: Props) => {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // State to control the modal visibility

  // Function to open the trailer modal
  const openTrailerModal = () => setIsTrailerModalOpen(true);

  // Function to close the trailer modal
  const closeTrailerModal = () => setIsTrailerModalOpen(false);

  const handleClick = () => {
    // Handle click event to show more information about the movie
    alert(`Title: ${movie.title}`);
  }

  return (
    <div className="three-col">
        <div className="card">
            <Image
              src={movie.image_url}
              width={240}
              height={300}
              alt={`${movie.title} poster`}
            />

            <h4 className="description">{movie.title}</h4>
            <dl>
                <dt className="description">{movie.duration} MIN | {movie.rating}</dt>
                <dt className="description">Released {movie.release_date}</dt>
            </dl>
            <div className="home-buttons">
                <div className="home-btn block">
                <Link className="manage-button" href="/edit-movie">
                    <button type="button">Edit Details</button> 
                </Link>
                <Link className="manage-button" href="/select-seats">
                    <button type="button">Edit Showtimes</button> 
                </Link>
                <button className="delete-button" onClick={openTrailerModal}>
                    Delete
                </button>
                </div>
            </div>
        </div>

        <MovieInfo
          isOpen={isTrailerModalOpen}
          onClose={closeTrailerModal}
          trailer={movie.trailer_url}
          title={movie.title}
          rating={movie.rating}
          genre={movie.genre_id}
          cast={movie.cast}
          director={movie.director}
          descr={movie.description}
          imageUrl={movie.image_url}
          producer={movie.producer}
          reviews={movie.reviews}
        />
    </div>
  );
}

export default PostCard;