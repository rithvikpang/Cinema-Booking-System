import React from 'react';
import Grid from '../../../components/SeatsGrid';
import Link from 'next/link';

const MyPage: React.FC = () => {
  return (
    <div className="log-out-container">
      <div className="seat-grid">
        <h1>Select Seats</h1>
        <div className="seats">
          <Grid rows={10} cols={10} />
        </div>
      </div>
      <div className="next-button block">
        <Link href="/tickets">
          <button type="button">Next</button> 
        </Link>
      </div>  
    </div>    
  );
};

export default MyPage;
