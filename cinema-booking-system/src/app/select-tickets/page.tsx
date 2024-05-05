"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SelectTickets: React.FC = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const router = useRouter();

  const queryParams = new URLSearchParams(window.location.search);
  const showroomId = queryParams.get('showroomId') || '';
  const showId = queryParams.get('showId') || '';

  const handleClick = (type: string, action: string) => {
    switch (type) {
      case 'ticket':
        setTicketCount(prevCount => action === 'inc' ? prevCount + 1 : Math.max(prevCount - 1, 0));
        break;
      case 'adult':
        if (action === 'inc' && adultCount + childCount + seniorCount + 1 <= ticketCount) {
          setAdultCount(prevCount => prevCount + 1);
        } else if (action === 'dec' && adultCount > 0) {
          setAdultCount(prevCount => prevCount - 1);
        }
        break;
      case 'child':
        if (action === 'inc' && adultCount + childCount + seniorCount + 1 <= ticketCount) {
          setChildCount(prevCount => prevCount + 1);
        } else if (action === 'dec' && childCount > 0) {
          setChildCount(prevCount => prevCount - 1);
        }
        break;
      case 'senior':
        if (action === 'inc' && adultCount + childCount + seniorCount + 1 <= ticketCount) {
          setSeniorCount(prevCount => prevCount + 1);
        } else if (action === 'dec' && seniorCount > 0) {
          setSeniorCount(prevCount => prevCount - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleNextButtonClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('ticketCount', ticketCount.toString());
    queryParams.append('adultCount', adultCount.toString());
    queryParams.append('childCount', childCount.toString());
    queryParams.append('seniorCount', seniorCount.toString());
    queryParams.append('showroomId', showroomId.toString());
    queryParams.append('showId', showId.toString());
    router.push(`/select-seats?${queryParams.toString()}`);
  };

  return (
    <div className="container">
      <h1>Select Tickets</h1>
      <div className="tickets block">
        <div>
          <h3>Total Tickets</h3>
        </div>
        <div>
          <p>{ticketCount}</p>
        </div>
        <div>
          <button onClick={() => handleClick('ticket', 'inc')}>+</button>
          <button onClick={() => handleClick('ticket', 'dec')}>-</button>
        </div>
      </div>
      <div className="tickets block">
        <div>
          <h3>Adult</h3>
        </div>
        <div>
          <p>{adultCount}</p>
        </div>
        <div>
          <button onClick={() => handleClick('adult', 'inc')}>+</button>
          <button onClick={() => handleClick('adult', 'dec')}>-</button>
        </div>
      </div>
      <div className="tickets block">
        <div>
          <h3>Child</h3>
        </div>
        <div>
          <p>{childCount}</p>
        </div>
        <div>
          <button onClick={() => handleClick('child', 'inc')}>+</button>
          <button onClick={() => handleClick('child', 'dec')}>-</button>
        </div>
      </div>
      <div className="tickets block">
        <div>
          <h3>Senior</h3>
        </div>
        <div>
          <p>{seniorCount}</p>
        </div>
        <div>
          <button onClick={() => handleClick('senior', 'inc')}>+</button>
          <button onClick={() => handleClick('senior', 'dec')}>-</button>
        </div>
      </div>
      <div className="button block">
        <button type="button" onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};

export default SelectTickets;
