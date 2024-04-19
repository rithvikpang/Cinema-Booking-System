"use client"
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BookingPage: React.FC = () => {

    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const imageUrl = queryParams.get('imageUrl');

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
                    <input
                    type="text"
                    placeholder="Select a showtime"
                    style={{ fontSize: '16px' }} 
                    />
                    <ul className="dropdown">
                        <li>March 14, 2024 at 12:00</li>
                        <li>March 15, 2024 at 14:00</li>
                        <li>March 16, 2024 at 17:00</li>
                    </ul>
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