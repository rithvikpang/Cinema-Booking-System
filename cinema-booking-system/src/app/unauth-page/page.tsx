"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const UnAuth = () => {
    return (    
      <div className="log-out-container">
        <h3>You are attempting to access an unauthorized page.</h3>
        <Link className="link" href='/'>
            <h3>Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default UnAuth; 