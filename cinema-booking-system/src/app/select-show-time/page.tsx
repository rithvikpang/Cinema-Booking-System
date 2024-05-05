"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShowTimeSelection from '../../../components/ShowTimeSelection';

export interface Movie {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
  title: string;
  rating: string;
  genre: number;
  cast: string;
  director: string;
  descr: string;
  imageUrl: string;
  producer: string;
  reviews: string;
  shows: Show[];
}

interface Show {
  showId: number;
  showroomId: number;
  date: string;
  time: string;
}

const SelectShowTime: React.FC<Movie> = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const queryParams = new URLSearchParams(window.location.search);
  const title = queryParams.get('title');
  const imageUrl = queryParams.get('imageUrl');

  const showsFromQueryParams: Show[] = [];
  queryParams.forEach((value, key) => {
    const match = key.match(/show(\d+)Date/);
    if (match && match[1]) {
      const showId = parseInt(match[1]);
      const date = queryParams.get(`show${showId}Date`) || '';
      const time = queryParams.get(`show${showId}Time`) || '';
      const showroomId = parseInt(queryParams.get(`show${showId}ShowroomId`) || '');
      showsFromQueryParams.push({
        showId,
        date,
        time,
        showroomId,
      });
    }
  });

  console.log(showsFromQueryParams);

  const handleSelect = (selectedOption: string | null) => {
    console.log('Selected option:', selectedOption);
    setButtonClicked(true);
  };

  const handleNextButtonClick = () => {
    if (buttonClicked) {
      router.push('/select-seats');
    } else {
      alert('Please select a showtime');
    }
  };

  return (
    <div className="container">
      <form className="select-time block">
        <h1 className="movie-item">Select Showtime</h1>
        <h2>{title}</h2>
        <img className="movie-item" src={imageUrl || ''} width={360} height={450} alt="poster" />

        <div className="combobox">
          <div className="combobox">
            <ShowTimeSelection options={showsFromQueryParams.map(show => `${show.date} ${show.time}`)} onSelect={handleSelect} />
          </div>
        </div>
        <div className="h-button block">
          <button type="button" onClick={handleNextButtonClick}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default SelectShowTime;
