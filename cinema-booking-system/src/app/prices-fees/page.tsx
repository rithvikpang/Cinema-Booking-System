"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Prices {
  price: number;
}

const PriceFees: React.FC = () => {
  const [adultPrice, setAdultPrice] = useState<Prices>({
    price: 0
  });

  const [childPrice, setChildPrice] = useState<Prices>({
    price: 0
  });

  const [seniorPrice, setSeniorPrice] = useState<Prices>({
    price: 0
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPrice = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/booking/get-ticket-price/ADULT', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch price: ${response.status} ${response.statusText}`);
        }

        const data: Prices = await response.json();
        setAdultPrice({ price: data.price }); // Initialize state with fetched value
        console.log('Data received:', data);
          // Check the structure of the data object
  console.log('Data structure:', Object.keys(data));

  // Check the specific properties you expect
  console.log('Price property:', data.price);


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

    fetchPrice();
  }, []);

  // Function to handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdultPrice(prevState => ({
      ...prevState,
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
      const response = await fetch('http://localhost:8080/api/booking/get-ticket-price/ADULT', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price: adultPrice.price,
        }),
      });


      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.status} ${response.statusText}`);
      }

      alert('Price updated successfully');
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
      <h1>Prices & Fees</h1>
      <div className="first-name block">
        <label htmlFor="adultPrice">Adult Ticket Price</label>
        <input
          id="adultPrice"
          type="text"
          name="adultPrice" // Corrected the name attribute
          value={adultPrice.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button block">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};

export default PriceFees;
