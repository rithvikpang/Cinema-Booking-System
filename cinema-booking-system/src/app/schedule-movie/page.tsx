"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface UserProfile {
    admin: boolean;
    // Add other fields as they are defined in your database
  }
   
  const ScheduleMovie: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
      admin: true,
      // Initialize other fields as needed
    });
    

    //const test1 = profile.admin;
    //console.log("admin test 1: " + test1);

    const [token, setToken] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();
  
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
  
      // If token exists, assign value to token
      if (storedToken) {
        setToken(storedToken);
      }
      
    }, []);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/unauth-page')  // Does not allow non-logged in users to access this page
          setError('No token found in localStorage');
          setLoading(false);
          return;
        }
   
        try {
          const response = await fetch('http://localhost:8080/api/user/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
   
          if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
          }
   
          const data: UserProfile = await response.json();
          setProfile(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };
   
      fetchProfile();
    }, []);

    //const test2 = profile.admin;
    //console.log("admin test 2: " + test2);

    // Does not allow users and non-logged in users to access this page
    if (profile.admin == false) {
        router.push('/unauth-page')
        return null;
    }
    
    return (
        <form className="container">
            <h1>Schedule Movie</h1>
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie ID</label>
                <input
                    id="inp"
                    type="text"
                    name="movie-id"
                    autoComplete="movie-id"
                    required
                />
            </div>
            <div className="summary block">
                <label htmlFor="frm-description">Show Time ID</label>
                <input
                    id="inp"
                    type="text"
                    name="description"
                    autoComplete="description"
                    required
                />
            </div>
            <div className="category block">
                <label htmlFor="frm-category">Date</label>
                <input
                    id="inp"
                    type="text"
                    name="date"
                    autoComplete="date"
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Time</label>
                <input
                    id="inp"
                    type="text"
                    name="time"
                    autoComplete="time"
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Duration</label>
                <input
                    id="inp"
                    type="text"
                    name="duration"
                    autoComplete="duration"
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Show Room</label>
                <input
                    id="inp"
                    type="text"
                    name="show-room"
                    autoComplete="show-room"
                    required
                />
            </div>
            <div className="save-button block">
                <button className="save-button block">Save</button>
            </div>
            
        </form>
    )
}

export default ScheduleMovie;