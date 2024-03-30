"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
 
interface UserProfile {
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  age: string;
  city: string;
  state: string;
  zip: string;
  // Add other fields as they are defined in your database
}
 
const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    firstname: '',
    lastname: '',
    address: '',
    age: '',
    city: '',
    state: '',
    zip: '',
    // Initialize other fields as needed
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
 
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
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
 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found in localStorage');
      return;
    }
 
    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: profile.firstname,
          lastname: profile.lastname,
          address: profile.address,
          // Exclude email and other fields that should not be updated
        }),
      });
 
      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
      }
 
      alert('Profile updated successfully');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Edit Profile</h1>
      <div className="first-name block">
        <label htmlFor="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          name="firstname"
          value={profile.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div className="last-name block">
        <label htmlFor="lastname">Last Name</label>
        <input
          id="lastname"
          type="text"
          name="lastname"
          value={profile.lastname}
          onChange={handleChange}
          required
        />
      </div>
      {/* Include other fields as needed */}
      <div className="email block">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={profile.email}
          readOnly // Make the email field read-only
        />
      </div>
      {/* Include other fields as needed */}
      <div className="button block">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};
 
export default ProfilePage;