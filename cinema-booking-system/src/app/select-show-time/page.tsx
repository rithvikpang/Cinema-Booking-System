"use client"
import React from 'react';
import Link from 'next/link';
import ComboBox from '../../../components/ShowTimeSelection';

interface Movie {
    shows: Show[];
}

interface Show {
    date: string;
}

const BookingPage: React.FC<Movie> = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const imageUrl = queryParams.get('imageUrl');
    const show1 = queryParams.get('show1');
    const show2 = queryParams.get('show2');
    const show3 = queryParams.get('show3');
    const show1Time = queryParams.get('show1Time');
    const show2Time = queryParams.get('show2Time');
    const show3Time = queryParams.get('show3Time');

    const options = [show1 + " " + show1Time, show2 + " " + show2Time, show3 + " " + show3Time];

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
                    <ComboBox options={options}/>
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