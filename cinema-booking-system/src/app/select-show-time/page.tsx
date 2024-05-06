"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

const formatDateTime = (dateString: string, timeString: string) => {
  const [year, month, day] = dateString.split(',');
  const [hour, minute] = timeString.split(',');

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${formattedDate} at ${formattedTime}`;
};

const SelectShowTime: React.FC<Movie> = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams?.get('title') ?? '';
  const imageUrl = searchParams?.get('imageUrl') ?? '';

  const showsFromQueryParams: Show[] = [];
  searchParams?.forEach((value, key) => {
    const match = key.match(/show(\d+)Date/);
    if (match && match[1]) {
      const showId = parseInt(match[1]);
      const date = searchParams.get(`show${showId}Date`) || '';
      const time = searchParams.get(`show${showId}Time`) || '';
      const showroomId = parseInt(searchParams.get(`show${showId}ShowroomId`) || '');
      showsFromQueryParams.push({ showId, date, time, showroomId });
    }
  });

  console.log(showsFromQueryParams);

  const handleSelect = (selectedOption: string | null, showroomId: number, showId: number) => {
    console.log('Selected option:', selectedOption);
    setButtonClicked(true);
    // Pass selected showroomId and showId to the next page
    handleNextButtonClick(selectedOption, showroomId, showId);
  };

  const handleNextButtonClick = (selectedShowTime: string | null, showroomId: number, showId: number) => {
    if (selectedShowTime) {
      const selectedShow = showsFromQueryParams.find(show => formatDateTime(show.date, show.time) === selectedShowTime);
      if (selectedShow) {
        const { date, time } = selectedShow;
        // Append showroomId, showId, title, date, and time to the URL
        router.push(`/select-tickets?selectedShowTime=${encodeURIComponent(selectedShowTime)}&showroomId=${showroomId}&showId=${showId}&title=${encodeURIComponent(title || '')}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
      }
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
            <ShowTimeSelection
              options={showsFromQueryParams.map(show => formatDateTime(show.date, show.time))}
              onSelect={(selectedOption, showroomId, showId) => handleSelect(selectedOption, showroomId, showId)}
              showroomIds={showsFromQueryParams.map(show => show.showroomId)} // Pass showroomIds
              showIds={showsFromQueryParams.map(show => show.showId)} // Pass showIds
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectShowTime;