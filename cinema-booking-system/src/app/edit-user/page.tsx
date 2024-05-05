'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  isadmin: boolean;
  age?: number;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  // Add other fields as they are defined in your database
}

const EditUser: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    user_id: 0,
    firstname: '',
    lastname: '',
    email: '',
    isadmin: false
    // Initialize other fields as needed
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page');  // Redirect if not logged in
        setError('No token found in localStorage');
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get('email');

      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/user/profile/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
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

    fetchUserProfile();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page');  // Redirect if not logged in
        setError('No token found in localStorage');
        return;
      }

      console.log(profile);
      const response = await fetch(`http://localhost:8080/api/user/profile/${profile.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user profile: ${response.status} ${response.statusText}`);
      }

      // Handle successful update (e.g., show a success message, redirect, etc.)
      router.push('/manage-users');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="container">
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
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              name="age"
              value={profile.age || ''}
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
              readOnly
            />
          </div>
          <div className="address block">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={profile.address || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loc block">
            <div className="city block">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="city"
                value={profile.city || ''}
                readOnly
              />
            </div>
            <div className="state block">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                name="state"
                value={profile.state || ''}
                readOnly
              />
            </div>
            <div className="zip block">
              <label htmlFor="zip">Zip Code</label>
              <input
                id="zip"
                type="text"
                name="zip"
                value={profile.zip || ''}
                readOnly
              />
            </div>
          </div>
          <div className="isadmin block">
          <label htmlFor="isadmin">Is Admin</label>
          <input
            id="isadmin"
            type="checkbox"
            name="isadmin"
            checked={profile.isadmin}
            onChange={handleChange}
          />
        </div>
        {/* user_id block */}
        <div className="user-id block">
          <label htmlFor="user_id">User ID</label>
          <input
            id="user_id"
            type="text"
            name="user_id"
            value={profile.user_id || ''}
            readOnly
          />
        </div>
          <div className="button block">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;