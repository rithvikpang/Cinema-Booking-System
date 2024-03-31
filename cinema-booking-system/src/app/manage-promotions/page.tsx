"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

interface UserProfile {
    admin: boolean;
    // Add other fields as they are defined in your database
  }
   
  const ManagePromos: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
      admin: true,
      // Initialize other fields as needed
    });
    

    //const test1 = profile.admin;
    //console.log("admin test 1: " + test1);

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
      
    }, []);
  
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/unauth-page')  // Does not allow non-logged in users to access this page
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

    //const test2 = profile.admin;
    //console.log("admin test 2: " + test2);

    // Does not allow users and non-logged in users to access this page
    if (profile.admin == false) {
        router.push('/unauth-page')
        return null;
    }
    
    return (
        <form className="container">
            <h1>Manage Promotions</h1>
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
            
            <h1 style={{marginTop: '50px' }}>Add Promotion</h1>
            <div className="first-name block">
                <label htmlFor="frm-first">Promotion Name</label>
                <input
                    id="inp"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Promo Code</label>
                <input
                    id="inp"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Expiration Date</label>
                <input
                    id="inp"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Discount</label>
                <input
                    id="inp"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="save-button block">
                <button type="submit">Add</button>
            </div>
        </form>

    )
}

export default ManagePromos;
