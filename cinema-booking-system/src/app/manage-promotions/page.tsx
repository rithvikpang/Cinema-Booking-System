"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Promotion {
  promotion_id?: number;
  start_date: string; // Change type to string
  end_date: string; // Change type to string
  code: string;
  discount: number;
}

const ManagePromos: React.FC = () => {
  const [profile, setProfile] = useState<{ admin: boolean }>({ admin: true });
  const { register, handleSubmit, reset } = useForm<Promotion>();
  const [routerReady, setRouterReady] = useState(false); // Flag to indicate router readiness
  const router = useRouter();

  useEffect(() => {
    // Set routerReady to true when the component mounts on the client-side
    setRouterReady(true);
  }, []);

  const onSubmit = async (data: Promotion) => {
    try {
      // Convert dates to ISO string format
      const formattedData = {
        ...data,
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString(),
      };

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/add-promotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData), // Send formatted data
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add promotion: ${response.status} ${response.statusText}`);
      }
  
      reset(); // Reset form fields after successful submission
      router.push('/'); // Redirect to manage promos page after adding promotion
    } catch (error: any) { // Specify 'any' type annotation for the error variable
      console.error('Error:', error.message);
      // Handle error, show error message to the user, etc.
    }
  };


  // Check if router is ready before using it
  if (!routerReady) {
    return null; // Render nothing if router is not ready
  }

  // Render form
  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-section">
      <h1>Manage Promotions</h1>
      {/* Your promotion management UI */}
      <div className="form-section">
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion</label>
                    <label className="tickets-label" htmlFor="message">Edit Details</label>
                    <label className="tickets-label" htmlFor="message">Delete</label>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 1</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 2</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 3</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
            </div>
    </div>

    <h1>Add Promotion</h1>
    <div className="first-name block">
      <label htmlFor="start_date">Start Date</label>
      <input id="start_date" type="date" {...register('start_date', { required: true })} />
    </div>
    <div className="first-name block">
      <label htmlFor="end_date">End Date</label>
      <input id="end_date" type="date" {...register('end_date', { required: true })} />
    </div>
    <div className="first-name block">
      <label htmlFor="code">Promo Code</label>
      <input id="code" type="text" {...register('code', { required: true })} />
    </div>
    <div className="first-name block">
      <label htmlFor="discount">Discount</label>
      <input id="discount" type="number" step="0.01" {...register('discount', { required: true })} />
    </div>
    <div className="save-button block">
      <button type="submit">Add</button>
    </div>
  </form>
  );
};

export default ManagePromos;