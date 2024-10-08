'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    // Add other fields as they are defined in your database
}

interface OrderHistory {
    movieTitle: string;
    ticketCount: string;
    showDate: string;
    showTime: string;
}

interface OrderHistoryArray extends Array<OrderHistory> {}

const OrderHistory: React.FC = () => {
    const [order, setOrder] = useState<OrderHistoryArray>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/unauth-page'); // Redirect if not logged in
                setError('No token found in localStorage');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/api/user/order-history', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
                }

                const data: OrderHistoryArray = await response.json();
                setOrder(data);
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

        fetchProfile();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>Order History</h1>
            <div className="form-section">
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Movie</label>
                    <label className="tickets-label" htmlFor="message">No. of Tickets</label>
                    <label className="tickets-label" htmlFor="message">Show Date</label>
                    <label className="tickets-label" htmlFor="message">Show Time</label>
                </div>
                <hr></hr>
                {order.map((orderItem, index) => (
                    <div key={`${orderItem.movieTitle}-${index}`} className="order-sum-item">
                        <label className="tickets-label" htmlFor="message">{orderItem.movieTitle}</label>
                        <label className="tickets-label" htmlFor="message">{orderItem.ticketCount}</label>
                        <label className="tickets-label" htmlFor="message">{orderItem.showDate}</label>
                        <label className="tickets-label" htmlFor="message">{orderItem.showTime}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;