/*
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { userType } from '../hooks/userType';


const Navbar = () => {

  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { isAdmin } = userType();

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
/*
  const c = profile.admin;
  console.log("admin: " + c);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.replace("/log-out");
    };

    if (isAdmin === null) {
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
              <h1 className="navbar">CINEMA BOOKING</h1>
            </Link>
          </div>
          <div className="home-buttons">
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
      );
    }

    if (isAdmin == true) {
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
                      <button type="submit">Admin</button>
                    </Link>
                  </div>
                  <div className="home-btn block">
                    <Link className="home-btn" href="/">
                      <button type="button" onClick={handleLogout}>
                        Log Out
                      </button>
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
                      <button type="button" onClick={handleLogout}>
                        Log Out
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
}

export default Navbar;
*/

"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { userType } from '../hooks/userType';


const Navbar = () => {

  const [token, setToken] = useState<string | null>();
  const router = useRouter();
  const { isAdmin } = userType();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // If token exists, assign value to token
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/log-out");
  };

    if (isAdmin === null) {
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
      );
    }

    if (isAdmin == true) {
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
                      <button type="submit">Admin</button>
                    </Link>
                  </div>
                  <div className="home-btn block">
                    <Link className="home-btn" href="/">
                      <button type="button" onClick={handleLogout}>
                        Log Out
                      </button>
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
                      <button type="button" onClick={handleLogout}>
                        Log Out
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
}

export default Navbar