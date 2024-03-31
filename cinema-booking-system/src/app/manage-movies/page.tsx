"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface UserProfile {
    admin: boolean;
    // Add other fields as they are defined in your database
  }
   
  const ManageMovies: React.FC = () => {
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
            <h1>Manage Movies</h1> 
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className='combobox'> 
                    <button className="seats">Select Movie</button>
                    <ul className='dropdown'>
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="edit-movie-button">
                    <button className="seats">Add Movie</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/wonka.jpg" alt="movie poster" style={{width: '200px', height: '250px'}}/>
            </div>
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie Name</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="movie-name"
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="category block">
                <label htmlFor="frm-category">Category</label>
                <input
                    id="frm-category"
                    type="text"
                    name="category"
                    autoComplete="category"
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Genre</label>
                <input
                    id="frm-genre"
                    type="text"
                    name="genre"
                    autoComplete="genre"
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Cast</label>
                <input
                    id="frm-cast"
                    type="text"
                    name="cast"
                    autoComplete="cast"
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Director</label>
                <input
                    id="frm-director"
                    type="text"
                    name="director"
                    autoComplete="director"
                    required
                />
            </div>
            <div className="summary block">
                <label htmlFor="frm-description">Description</label>
                <input
                    id="frm-description"
                    type="text"
                    name="description"
                    autoComplete="description"
                    required
                />
            </div> 
            <div className="duration block">
                <label htmlFor="frm-duration">Duration</label>
                <input
                    id="frm-duration"
                    type="text"
                    name="duration"
                    autoComplete="duration"
                    required
                />
            </div>
            <div className="rating block">
                <label htmlFor="frm-rating">Rating</label>
                <input
                    id="frm-rating"
                    type="text"
                    name="rating"
                    autoComplete="rating"
                    required
                />
            </div>
            <div className="movie-image block">
                <label htmlFor="frm-movieimage">Movie Poster</label>
                <input
                    id="frm-movieimage"
                    type="text"
                    name="movieimage"
                    autoComplete="movieimage"
                    required
                />
            </div>
            <div className="movie-trailer block">
                <label htmlFor="frm-trailer">Trailer Link</label>
                <input
                    id="frm-trailer"
                    type="text"
                    name="trailer"
                    autoComplete="trailer"
                    required
                />
            </div>
            <div className="save-button block">
                <button className="save-button block">Save</button>
            </div>
            
        </form>
    )
}

export default ManageMovies;


/*
export default function Home() {
    return (
        <form className="container">
            <div className = 'leftThirdContent'>
                <div className="combobox">
                    <input type="text" placeholder="Select Movie to Edit"/>
                    <ul className="dropdown">
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="add button">
                    <button type="submit">Add</button>
                </div>
            </div>
        </form>
    )

}
*/

/*
const Home = () => {
    return (
      <div className="grid-container">
        <LeftThirdContent>
          
            <div className = 'leftThirdContent'>
                <div className="combobox">
                    <input type="text" placeholder="Select Movie to Edit"/>
                    <ul className="dropdown">
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="add button">
                    <button type="submit">Add</button>
                </div>
            </div>
        </LeftThirdContent>
      </div>
    );
  };
  
  export default Home;
  */