"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const LogInRedir = () => {
    return (    
      <div className="log-out-container">
        <h3>Please log in to book a movie.</h3>
        <Link className="link" href='/'>
            <h3>Click here to log in</h3>
        </Link>
      </div>
    )
}

export default LogInRedir; 