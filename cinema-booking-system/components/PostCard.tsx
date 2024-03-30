
import Image from 'next/image';
import React, { useState } from 'react';
import { Movie } from '../utils/types'; // Import the type
import TrailerModal from './TrailerPopup'; // Make sure this path matches where you place the TrailerModal component
import Link from 'next/Link';

interface Props {
  movie: Movie;
}

const PostCard = ({ movie }: Props) => {
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false); // State to control the modal visibility

  // Function to open the trailer modal
  const openTrailerModal = () => setIsTrailerModalOpen(true);

  // Function to close the trailer modal
  const closeTrailerModal = () => setIsTrailerModalOpen(false);

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
                    {/* Update this button to call openTrailerModal when clicked */}
                    <button type="button" onClick={openTrailerModal}>Watch Trailer</button>
                </div>
                <div>
                    <Link className="home-btn block" href="/select-show-time">
                      <button type="button">Book Movie</button> 
                    </Link>
                </div>
            </div>
        </div>
        <TrailerModal
          isOpen={isTrailerModalOpen}
          onClose={closeTrailerModal}
          videoUrl={movie.trailer_url}
        />
    </div>
  );
}

/*
import Image from 'next/image';
import React from 'react';
import { Movie } from '../utils/types'; // Import the type


interface Props {
  movie: Movie;
}

const PostCard = ({ movie }: Props) => {
  return (
    <div className="three-col">
        <div className="card">
            <Image
            src={movie.image_url}
            width={240}
            height={300}
            alt={`${movie.title} poster`}/>

            <h3 className="description">{movie.title}</h3>
            <dl>
                <dt className="description">{movie.duration} | PG</dt>
                <dt className="description">Released {movie.release_date}</dt>
            </dl>
            <div className="home-buttons block">
                <div className="h-button block">
                    <button type="submit">Watch Trailer</button>
                </div>
                <div className="h-button block">
                    <button type="submit">Book Movie</button>
                </div>
            </div>
        </div>
    </div>
  );
}
*/

export default PostCard;