
import Image from 'next/image';
import React, { useState } from 'react';
import { Movie } from '../utils/types'; // Import the type
import axios from 'axios';

interface Props {
  movie: Movie;
}

interface Show {
  date: string;
  time: string;
}

const EditMoviePostCard: React.FC<Props> = ({ movie }) => {
  
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const openTrailerModal = () => setIsTrailerModalOpen(true);
  const closeTrailerModal = () => setIsTrailerModalOpen(false);
    
  // Creates url string with movie info
  const handleEditClick = () => {
      const queryString = `?movieId=${encodeURIComponent(movie.movieId)}&title=${encodeURIComponent(movie.title)}&rating=${encodeURIComponent(movie.rating)}&duration=${encodeURIComponent(movie.duration)}&imageUrl=${encodeURIComponent(movie.imageUrl)}&trailerUrl=${encodeURIComponent(movie.trailerUrl)}&category=${encodeURIComponent(movie.category)}&genre=${encodeURIComponent(movie.genre)}&cast=${encodeURIComponent(movie.cast)}&director=${encodeURIComponent(movie.director)}&description=${encodeURIComponent(movie.description)}`;
      window.location.href = `/edit-movie${queryString}`;
      
  };

  // Delete movie from DB
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/delete-movie/${movie.movieId}`);
      alert('Item deleted successfully');
      // Optionally, you can perform additional actions after deletion, such as refreshing the component's data
    } catch (error) {
      alert('Failed to delete item');
      console.error('Error:', error);
    }
  };

  console.log(movie);

  return (
    <div className="three-col">
        <div className="card">
            <Image
              src={movie.imageUrl}
              width={240}
              height={300}
              alt={`${movie.title} poster`}
            />

            <h4 className="description">{movie.title}</h4>
            <div className="home-buttons">
                <div className="home-btn block">
                    <div className="select-time block">
                        <button className="left-button block" onClick={handleEditClick}>Edit</button>
                    </div>
                    <div className="select-time block">
                        <button className="left-button block" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
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

export default EditMoviePostCard;