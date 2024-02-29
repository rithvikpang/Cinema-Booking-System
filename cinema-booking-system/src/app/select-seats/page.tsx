import React from 'react';
import Grid from '../../../components/SeatsGrid';

const MyPage: React.FC = () => {
  return (
    <div className='card'>
      <h1>Select Seats</h1>
      <Grid rows={10} cols={10} />
    </div>
  );
};

export default MyPage;
