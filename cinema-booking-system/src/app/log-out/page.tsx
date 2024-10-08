"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/Link';


const Logout = () => {
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            setToken(localStorage.getItem("token"));
        }
    }, []);

    return (    
      <div className="log-out-container">
        <h3>You have been succesfully logged out.</h3>
        <Link className="link" href='/'>
            <h3>Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default Logout; 