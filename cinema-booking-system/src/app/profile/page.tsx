"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from "next/link"
 
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
          age: profile.age,
          city: profile.city,
          state: profile.state,
          zip: profile.zip,
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
      <h1>Profile</h1>
      <h2>Account Information</h2>
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
      <div className="age block">
        <label htmlFor="lastname">Age</label>
        <input
          id="age"
          type="text"
          name="age"
          value={profile.age}
          onChange={handleChange}
          required
        />
      </div>
      {/* Include other fields as needed */}
      <div className="email block">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={profile.email}
          readOnly // Make the email field read-only
        />
      </div>
      <div className="address block">
        <label htmlFor="email">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          required // Make the email field read-only
        />
      </div>
      <div className="loc block">
        <div className="city block">
          <label htmlFor="email">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={profile.city}
            readOnly // Make the email field read-only
          />
        </div>
        <div className="state block">
          <label htmlFor="email">State</label>
          <input
            id="state"
            type="text"
            name="state"
            value={profile.state}
            readOnly // Make the email field read-only
          />
        </div>
        <div className="zip block">
          <label htmlFor="email">Zip Code</label>
          <input
            id="zip-code"
            type="text"
            name="zip-code"
            value={profile.zip}
            readOnly // Make the email field read-only
          />
        </div>
      </div>
      <div className="cancel-save">
        <div className="left-button block">
          <Link href="/change-password">
            <button type="submit">Change Password</button>
          </Link>
        </div>
        <div className="left-button block">
          <Link href="/edit-cards">
            <button type="submit">Edit Cards</button>
          </Link>
        </div>
      </div>
      <div className="check-boxes">
        <div>
          <input type="checkbox" name="myCheckbox"/>
          <label>Register for Promotions</label>
        </div>
        <div>
          <input className="check" type="checkbox" name="myCheckbox"/>
          <label>Remember Me</label>
        </div>
      </div>
      <div className="button block">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  )
};
 
export default ProfilePage;