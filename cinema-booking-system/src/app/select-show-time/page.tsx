"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShowTimeSelection from '../../../components/ShowTimeSelection';

interface Movie {
    shows: Show[];
}

interface Show {
    showId: number;
    showroomId: number;
}

const SelectShowTime: React.FC<Movie> = () => {

    const [token, setToken] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const router = useRouter();

    const queryParams = new URLSearchParams(window.location.search);
    const title = queryParams.get('title');
    const imageUrl = queryParams.get('imageUrl');
    const show1Date = queryParams.get('show1Date') || '';
    const show2Date = queryParams.get('show2Date') || '';
    const show3Date = queryParams.get('show3Date') || '';
    const show1Time = queryParams.get('show1Time') || '';
    const show2Time = queryParams.get('show2Time') || '';
    const show3Time = queryParams.get('show3Time') || '';

    
    const show1ShowId = queryParams.get('show1ShowId') || '';
    const show1ShowRoom = queryParams.get('show1ShowRoom') || '';

    const show1 = show1Date.substring(0, 4) + "-" + show1Date[5] + "-" + show2Date.substring(7, 9) + " " + show1Time.substring(0, 2) + ":" + show1Time[3] + "0";
    const show2 = show2Date.substring(0, 4) + "-" + show2Date[5] + "-" + show2Date.substring(7, 9) + " " + show2Time.substring(0, 2) + ":" + show2Time[3] + "0";
    const show3 = show3Date.substring(0, 4) + "-" + show3Date[5] + "-" + show2Date.substring(7, 9) + " " + show3Time.substring(0, 2) + ":" + show3Time[3] + "0";

    const options = [show1, show2, show3];
    var showIdd = null;

    console.log('show1ShowRoom: ', show1ShowId);
    console.log("ss: ", show1ShowRoom);


    const handleSelect = (selectedOption: string | null) => {
        console.log('Selected option:', selectedOption);
        setButtonClicked(true);

        if (selectedOption == show1) {
        }

    };

    // Function to handle the next button click
    const handleNextButtonClick = () => {
        if (buttonClicked) {
            // Perform actions before navigating
            // For example, navigate to the select-seats page
            router.push('/select-seats');
        } else {
            // Handle the case when the button is clicked before selecting an option
            // For example, display a message asking the user to select a showtime
            console.log('Please select a showtime');
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
    
        // If token exists, assign value to token
        if (storedToken) {
          setToken(storedToken);
        }
    
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/log-in-redir'); // Does not allow non-logged in users to access this page
                setError('No token found in localStorage');
                setLoading(false);
                return;
            }

        };
    
        fetchProfile();
      }, []);

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
                    alt="poster"
                />

                <div className="combobox">
                    <div className="combobox">
                        <ShowTimeSelection options={options} onSelect={handleSelect} />
                    </div>
                </div>
                <div className="h-button block">
                    <button type="button" onClick={handleNextButtonClick}>Next</button>
                </div>
            </form>
        </div>
    );
}

export default SelectShowTime;
