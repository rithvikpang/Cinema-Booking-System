'use client';
import React from 'react';

interface GridProps {
  rows: number;
  cols: number;
  onSeatClick?: (seatIndex: number) => void;
  selectedSeats?: number[];
}

const SeatsGrid: React.FC<GridProps> = ({ rows, cols, onSeatClick, selectedSeats = [] }) => {
  const generateSeats = () => {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const buttonLabel = String.fromCharCode(65 + i) + (j + 1); // ASCII code for A is 65
        const seatIndex = i * cols + j;
        const isSelected = selectedSeats.includes(seatIndex);
        seats.push(
          <button
            key={`${i}-${j}`}
            className={`seats ${isSelected ? 'selected' : ''}`}
            onClick={() => onSeatClick && onSeatClick(seatIndex)}
          >
            {buttonLabel}
          </button>
        );
      }
    }
    return seats;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '5px',
        justifyItems: 'center',
      }}
    >
      {generateSeats()}
    </div>
  );
};

export default SeatsGrid;