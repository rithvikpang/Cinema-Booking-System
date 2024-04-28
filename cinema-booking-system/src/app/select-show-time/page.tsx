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
    const show1Date = queryParams.get('show1Date') || '';
    const show2Date = queryParams.get('show2Date') || '';
    const show3Date = queryParams.get('show3Date') || '';
    const show1Time = queryParams.get('show1Time') || '';
    const show2Time = queryParams.get('show2Time') || '';
    const show3Time = queryParams.get('show3Time') || '';

    const show1 = show1Date.substring(0, 4) + "-" + show1Date[5] + "-" + show2Date.substring(7, 9) + " " + show1Time.substring(0, 2) + ":" + show1Time[3] + "0";
    const show2 = show2Date.substring(0, 4) + "-" + show2Date[5] + "-" + show2Date.substring(7, 9) + " " + show2Time.substring(0, 2) + ":" + show2Time[3] + "0";
    const show3 = show3Date.substring(0, 4) + "-" + show3Date[5] + "-" + show2Date.substring(7, 9) + " " + show3Time.substring(0, 2) + ":" + show3Time[3] + "0";



    const options = [show1, show2, show3];

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