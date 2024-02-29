import React from 'react';

interface GridProps {
  rows: number;
  cols: number;
}

const SeatsGrid: React.FC<GridProps> = ({ rows, cols }) => {
  const generateSeats = () => {
    const seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const buttonLabel = String.fromCharCode(65 + i) + (j + 1); // ASCII code for A is 65
        seats.push(
          <button key={`${i}-${j}`} className='seats'>
            {buttonLabel}
          </button>
        );
      }
    }
    return seats;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {generateSeats()}
    </div>
  );
};

export default SeatsGrid;
