"use client"
import React from 'react';
import Link from 'next/link';
import ComboBox from '../../../components/ShowTimeSelection';

const BookingPage: React.FC = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const imageUrl = queryParams.get('imageUrl');
    
    const options = ['Option 1', 'Option 2', 'Option 3'];

    const handleSelect = (selectedOption: string) => {
        console.log('Selected option:', selectedOption);
        // Handle selected option
    };
    
    return (
    <div className="container">
        <form className="select-time block">
            <h1 className="movie-item">Select Showtime</h1>
            <h2>{title}</h2>
            <img
            className="movie-item"
            src={imageUrl || ''}
            width={360}
            height={450}
            alt="poster"/>
            
            <div className="combobox">
                <div className="combobox">
                    <ComboBox options={options} onSelect={handleSelect}/>
                </div>  
            </div>
            <div className="h-button block">
                <Link href="/select-seats">
                    <button type="button">Next</button> 
                </Link>
            </div>  
        </form>
    </div>
  );
}

export default BookingPage;