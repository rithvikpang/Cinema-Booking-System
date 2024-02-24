import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar">
        <Image
        className="navbar"
        src="/camera.png"
        width={100}
        height={100}
        alt="camera"
        />
        <h1 className="navbar">Cinema Booking</h1>
      </div>
        <div className="home-buttons">
          <div className="edit-button">
              <button className="edit-button" type="submit">Edit Profile</button>
          </div>
          <div className="edit-button">
              <button className="edit-button" type="submit">Edit Cards</button>
          </div>
          <div className="h-button block">
              <button type="submit">Sign In</button>
          </div>
          <div className="h-button block">
              <button type="submit">Register</button>
          </div>
        </div>
    </div>
  )
}

export default Navbar