import React from 'react';
import Image from 'next/image'

export default function Home() {    
  return (
    <div className="container">
        <form className="select-time block">
            <h1 className="movie-item">Select Showtime</h1>
            <Image
            className="movie-item"
            src="/Wonka.jpg"
            width={360}
            height={450}
            alt="wonka poster"/>
            
            <div className="combobox">
                <div className="combobox">
                    <input type="text" placeholder="Select a showtime"/>
                    <ul className="dropdown">
                        <li>March 14, 2024 at 12:00</li>
                        <li>March 15, 2024 at 14:00</li>
                        <li>March 16, 2024 at 17:00</li>
                    </ul>
                </div>  
            </div>      
        </form>
    </div>
  );
}