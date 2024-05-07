'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
    isadmin: boolean;
    // Add other fields as they are defined in your database
}

const ScheduleMovie: React.FC = () => {
    
    const [profile, setProfile] = useState<UserProfile>({
        isadmin: true,
    });

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        duration: '',
        showroomId: '',
        movieId: ''
    });

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
    
        const fetchProfile = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            router.push('/unauth-page'); // Does not allow non-logged in users to access this page
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

      useEffect(() => {
        if (!profile.isadmin) {
          router.push("/unauth-page");
        }
      }, [profile.isadmin]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        
        try {
            const response = await fetch('http://localhost:8080/api/admin/schedule-show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to schedule show');
            }

            // Handle success, redirect or display message
            router.push('/manage-movies'); // Redirect to success page
        } catch (error) {
            alert('Show time overlaps or already exists');
            console.error('Error scheduling show:', error);
            // Handle error, display message to user
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === 'time') {
            // Split the input value into hours and minutes
            const [hoursInput, minutesInput] = value.split(':');
    
            // Ensure hours and minutes have leading zeros if necessary
            const hours = hoursInput.padStart(2, '0');
            const minutes = minutesInput ? minutesInput.padStart(2, '0') : '00';
    
            const formattedTime = `${hours}:${minutes}:00`;
            setFormData({
                ...formData,
                [name]: formattedTime
            });
        } else if (name === 'date') {
            const formattedDate = new Date(value).toISOString().split('T')[0];
            setFormData({
                ...formData,
                [name]: formattedDate
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
  

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h1>Schedule Movie</h1>
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie ID</label>
                <input
                    id="movieId"
                    type="text"
                    name="movieId"
                    autoComplete="movieId"
                    value={formData.movieId}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* <div className="summary block">
                <label htmlFor="frm-description">Show Time ID</label>
                <input
                    id="showId"
                    type="text"
                    name="showId"
                    autoComplete="showId"
                    value={formData.showId}
                    onChange={handleChange}
                    // required
                />
            </div> */}
            <div className="category block">
                <label htmlFor="frm-category">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    autoComplete="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Time</label>
                <input
                    id="time"
                    type="text"
                    name="time"
                    autoComplete="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Duration</label>
                <input
                    id="duration"
                    type="text"
                    name="duration"
                    autoComplete="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Show Room</label>
                <input
                    id="showroomId"
                    type="text"
                    name="showroomId"
                    autoComplete="showroomId"
                    value={formData.showroomId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="save-button block">
                <button className="save-button block" type="submit">Save</button>
            </div>
        </form>
    );
};

export default ScheduleMovie;
