"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/Link';


const UnAuth = () => {
    return (    
      <div className="log-out-container">
        <h3>You are attempting to access an unauthorized page.</h3>
        <Link href='/'>
            <h3>Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default UnAuth; 