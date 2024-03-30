"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


const Navbar = () => {

  const [hospitals, setHospitals] = useState([]);
  const [userToken, setUserToken] = useState<string | null>();
  const [adminToken, setAdminToken] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    const userTkn = localStorage.getItem("userToken");
    const adminTkn = localStorage.getItem("adminToken");

    // If user token exists, assign value to token
    if (userTkn) {
      setUserToken(userTkn);
    }

    // If admin token exists, assign value to token
    if (adminTkn) {
      setAdminToken(adminTkn);
    }

  }, []);


  /**
    useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // If token exists, assign value to token
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
   */

  /**
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
   */

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    window.location.replace("/log-out");
  };

    if (userToken) {
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
    else if (adminToken) {
      if (userToken) {
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
                <Link className="home-btn" href="/admin">
                  <button type="button">Admin</button>
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
              <Link className="home-btn" href="/user-sign-in">
                <button type="submit">User Sign In</button>
              </Link>
            </div>
            <div className="home-btn block">
              <Link className="home-btn" href="/admin-sign-in">
                <button type="submit">Admin Sign In</button>
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
}

export default Navbar