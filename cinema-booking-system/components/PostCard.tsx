// components/PostCard.tsx
import Image from 'next/image';
import React from 'react';
import { Movie } from '../utils/types'; // Import the type

/*
interface PostCardProps {
  movie: Movie;
}

const PostCard: React.FC<PostCardProps> = ({ movie }) => {
  return (
    <div className="card">
      <Image
        src={movie.image_url || '../public/placeholder-image.jpg'} // Replace with a placeholder or a default image if the URL is not available
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
          <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
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
*/

/*
const PostCard = () => {
  return (
    <div className="three-col">
        <div className="card">
            <Image
            src="/Wonka.jpg"
            width={240}
            height={300}
            alt="wonka poster"/>

            <h3 className="description">Wonka</h3>
            <dl>
                <dt className="description">1 HR 56 MIN | PG</dt>
                <dt className="description">Released Dec 15, 2023</dt>
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
  )
}
*/

// components/PostCard.tsx
// import Image from 'next/image';
// import React from 'react';


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


export default PostCard;
