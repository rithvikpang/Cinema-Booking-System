'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  isadmin: boolean;
  // Add other fields as they are defined in your database
}

const ManageUsers: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page');  // Redirect if not logged in
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
        setIsAdmin(data.isadmin);
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
    if (!loading) {
      if (isAdmin) {
        fetchUsers();
      } else {
        router.push('/unauth-page');
      }
    }
  }, [loading, isAdmin]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/unauth-page');  // Redirect if not logged in
      setError('No token found in localStorage');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data: UserProfile[] = await response.json();
      setUsers(data);
      console.log(data); // Check if data is correct
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

  const handleEditUser = (email: String) => {
    // Logic to edit user information
    router.push(`/edit-user?email=${email}`);
  };

  const handleDeleteUser = async (email: String) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page');  // Redirect if not logged in
        setError('No token found in localStorage');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/user/profile/${email}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
      }

      // Remove the deleted user from the state
      setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
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
    <div className="container">
      <h1>Manage Users</h1>
      <div className="form-section">
        <div className="order-sum-item">
          <label className="tickets-label" htmlFor="message">Name</label>
          <label className="tickets-label" htmlFor="message">Email</label>
          <label className="tickets-label" htmlFor="message">Edit Details</label>
          <label className="tickets-label" htmlFor="message">Delete</label>
        </div>
        <hr></hr>
        {users.map((user, index) => (
          <div key={`${user.user_id}-${index}`} className="order-sum-item">
            <label className="tickets-label" htmlFor="message">{`${user.firstname} ${user.lastname}`}</label>
            <label className="tickets-label" htmlFor="message">{user.email}</label>
            <div className="tickets-button block">
              <button type="button" onClick={() => handleEditUser(user.email)}>Edit</button>
            </div>
            <div className="tickets-button block">
              <button type="button" onClick={() => handleDeleteUser(user.email)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;