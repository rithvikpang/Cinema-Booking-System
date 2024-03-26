import Image from 'next/image';
import React, { useState } from 'react';
import { Movie } from '../utils/types'; // Import the type
import TrailerModal from './TrailerPopup'; // Make sure this path matches where you place the TrailerModal component

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
              layout="responsive" // Add this if you want the image to be responsive
            />

            <h3 className="description">{movie.title}</h3>
            <dl>
                <dt className="description">{movie.duration} MIN | PG</dt> {/* Assuming duration is in minutes */}
                <dt className="description">Released {movie.release_date}</dt>
            </dl>
            <div className="home-buttons block">
                <div className="h-button block">
                    {/* Update this button to call openTrailerModal when clicked */}
                    <button type="button" onClick={openTrailerModal}>Watch Trailer</button>
                </div>
                <div className="h-button block">
                    <button type="button">Book Movie</button> {/* Changed type to 'button' */}
                </div>
            </div>
        </div>
        {/* Include the TrailerModal component and pass the necessary props */}
        <TrailerModal
          isOpen={isTrailerModalOpen}
          onClose={closeTrailerModal}
          videoUrl={movie.trailer_url}
        />
    </div>
  );
}

export default PostCard;