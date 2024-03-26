import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Navbar = () => {
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

export default Navbar