
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

  /*
    // Creates url string with movie info
    const handleBookClick = () => {
    const queryString = `?title=${encodeURIComponent(title)}&imageUrl=${encodeURIComponent(imageUrl)}&show1=${encodeURIComponent(shows[0].date)}&show2=${encodeURIComponent(shows[1].date)}&show3=${encodeURIComponent(shows[2].date)}&show1Time=${encodeURIComponent(shows[0].time)}&show2Time=${encodeURIComponent(shows[1].time)}&show3Time=${encodeURIComponent(shows[2].time)}`;
    window.location.href = `/select-show-time${queryString}`;
    };
  */

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
                    <Link className="home-btn block" href="/edit-movie">
                            <button type="button">Edit Details</button> 
                    </Link>
                    <Link className="home-btn block" href="/edit-movie">
                            <button type="button">Delete</button> 
                    </Link>
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
          shows={movie.shows}
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