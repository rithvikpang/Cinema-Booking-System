"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


const Navbar = () => {

  const [hospitals, setHospitals] = useState([]);
  const [token, setToken] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");

    // If token exists, assign value to token
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/hospitals/'); // Replace with your server endpoint
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push('/logout');
  };

    if (!token) {
      return (
        <div className="navbar">
          <div className="navbar">
            <Link href="/">
              <Image
              className="navbar"
              src="/camera.png"
              width={100}
              height={100}
              alt="camera"
              />
            </Link>
            <Link className="site-name" href="/">
              <h1 className="navbar">Cinema Booking</h1>
            </Link>
          </div>
          <div className="home-buttons">
            <div className="edit-button">
              <Link className="edit-button" href="/profile">
                <button className="edit-button">Profile</button>
              </Link>
            </div>
            <div className="home-btn block">
              <Link className="home-btn" href="/sign-in">
                <button type="submit">Sign In</button>
              </Link>
            </div>
            <div className="home-btn block">
              <Link className="home-btn" href="/register">
                <button type="submit">Register</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="navbar">
          <div className="navbar">
            <Link href="/">
              <Image
              className="navbar"
              src="/camera.png"
              width={100}
              height={100}
              alt="camera"
              />
            </Link>
            <Link className="site-name" href="/">
              <h1 className="navbar">Cinema Booking</h1>
            </Link>
          </div>
          <div className="home-buttons">
            <div className="edit-button">
              <Link className="edit-button" href="/profile">
                <button className="edit-button">Profile</button>
              </Link>
            </div>
            <div className="home-btn block">
              <Link className="home-btn" href="/">
                <button type="button" onClick={handleLogout}>Log Out</button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
}

export default Navbar