"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/Link';
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