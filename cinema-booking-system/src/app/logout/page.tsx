import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './css/Logout.css';

const Logout = () => {
    const [token, setToken] = useState<string | null>();

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            localStorage.removeItem("auth-token");
            setToken(localStorage.getItem("auth-token"));
        }
    }, []);

    return (    
      <div>
        <h3>You have been succesfully logged out.</h3>
        <Link href='/'>
            <h3>Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default Logout; 