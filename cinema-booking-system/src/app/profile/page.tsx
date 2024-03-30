"use client"
import React, { useEffect, useState } from 'react';

interface UserProfile {
  email: string;
  firstname: string;
  lastname: string;
  // Add other fields as needed
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found in localStorage');
        // Handle no token found
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        // Handle the error appropriately
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {profile.email}</p>
      <p>First Name: {profile.firstname}</p>
      <p>Last Name: {profile.lastname}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default UserProfile;