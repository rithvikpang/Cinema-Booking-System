'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SuspensionData {
  email: string;
  reason: string;
  startDate: string;
  endDate: string;
}

interface ActiveSuspension {
  suspensionId: number;
  email: string;
  reason: string;
  startDate: string;
  endDate: string;
}

const ManageSuspensions: React.FC = () => {
  const [formData, setFormData] = useState<SuspensionData>({
    email: '',
    reason: '',
    startDate: '',
    endDate: '',
  });
  const [activeSuspensions, setActiveSuspensions] = useState<ActiveSuspension[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetchActiveSuspensions();
  }, []);

  const fetchActiveSuspensions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page'); // Redirect if not logged in
        setError('No token found in localStorage');
        return;
      }

      const response = await fetch('http://localhost:8080/api/suspensions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch active suspensions: ${response.status} ${response.statusText}`);
      }

      const data: ActiveSuspension[] = await response.json();
      setActiveSuspensions(data);
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page'); // Redirect if not logged in
        setError('No token found in localStorage');
        return;
      }

      const response = await fetch('http://localhost:8080/api/suspend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to suspend user: ${response.status} ${response.statusText}`);
      }

      // Clear the form data and hide the form
      setFormData({ email: '', reason: '', startDate: '', endDate: '' });
      setShowForm(false);

      // Fetch the updated active suspensions
      await fetchActiveSuspensions();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleRemoveSuspension = async (suspensionId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/unauth-page'); // Redirect if not logged in
        setError('No token found in localStorage');
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/suspend/${suspensionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to remove suspension: ${response.status} ${response.statusText}`);
      }
  
      // Remove the suspended user from the state
      setActiveSuspensions((prevSuspensions) =>
        prevSuspensions.filter((suspension) => suspension.suspensionId !== suspensionId)
      );
  
      // Fetch the updated active suspensions
      await fetchActiveSuspensions();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="container">
      <h1>Manage Suspensions</h1>
      {error && <p className="error">{error}</p>}
      <div className="button block">
        <button onClick={() => setShowForm(true)}>Add a Suspension</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <input
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button block">
            <button type="submit">Add Suspension</button>
          </div>
        </form>
      )}
      <div>
        <h2>Active Suspensions</h2>
        {activeSuspensions.length === 0 ? (
          <p>No active suspensions found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Reason</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
            {activeSuspensions.map((suspension) => (
                <tr key={suspension.suspensionId}>
                <td>{suspension.email}</td>
                <td>{suspension.reason}</td>
                <td>{new Date(suspension.startDate).toLocaleDateString()}</td>
                <td>{new Date(suspension.endDate).toLocaleDateString()}</td>
                <td>
                    <td className="button block">
                    <button onClick={() => handleRemoveSuspension(suspension.suspensionId)}>Remove</button>
                    </td>
                </td>
                </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageSuspensions;