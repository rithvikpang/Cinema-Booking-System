'use client';
import React, { useState, useEffect } from 'react';
import SeatsGrid from '../../../components/SeatsGrid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SelectSeats: React.FC = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);
  const ticketCount = parseInt(queryParams.get('ticketCount') || '0');
  const adultCount = parseInt(queryParams.get('adultCount') || '0');
  const childCount = parseInt(queryParams.get('childCount') || '0');
  const seniorCount = parseInt(queryParams.get('seniorCount') || '0');
  const showroomId = queryParams.get('showroomId') || '';
  const showId = queryParams.get('showId') || '';
  const title = queryParams?.get('title') || '';
  const date = queryParams?.get('date') || '';
  const time = queryParams?.get('time') || '';

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seatNumberToRowCol = (seatNumber: number) => {
    const row = String.fromCharCode(65 + Math.floor(seatNumber / 10));
    const col = seatNumber % 10;
    return `${row}${col + 1}`
  }

  useEffect(() => {
    // Reset selected seats when the component mounts or ticket counts change
    setSelectedSeats([]);
  }, [ticketCount, adultCount, childCount, seniorCount]);

  const handleSeatClick = (seatIndex: number) => {
    if (selectedSeats.length < ticketCount) {
      if (selectedSeats.includes(seatNumberToRowCol(seatIndex))) {
        setSelectedSeats(selectedSeats.filter((seat) => (seat) !== seatNumberToRowCol(seatIndex)));
      } else {
        setSelectedSeats([...selectedSeats, seatNumberToRowCol(seatIndex)]);
      }
    }
  };
  const handleNextButtonClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('selectedSeats', selectedSeats.join(','));
    queryParams.append('adultCount', adultCount.toString());
    queryParams.append('childCount', childCount.toString());
    queryParams.append('seniorCount', seniorCount.toString());
    queryParams.append('showroomId', showroomId);
    queryParams.append('showId', showId);
  
  
    // Append the movie title, date, and time to the query parameters
    queryParams.append('title', title);
    queryParams.append('date', date);
    queryParams.append('time', time);
  
    router.push(`/tickets?${queryParams.toString()}`);
  };

  return (
    <div className="container">
      <h1>Select Seats</h1>
      <div className="seat-grid">
        <SeatsGrid
          rows={10}
          cols={10}
          onSeatClick={handleSeatClick}
          selectedSeats={selectedSeats}
        />
      </div>
      <div className="button block">
        <button
          type="button"
          onClick={handleNextButtonClick}
          disabled={selectedSeats.length !== ticketCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectSeats;