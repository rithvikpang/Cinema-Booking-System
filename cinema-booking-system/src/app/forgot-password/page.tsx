"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await fetch('/api/user/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
  
        if (response.status === 200) {
            localStorage.setItem('resetEmail', email);
            setMessage('If an account with that email exists, we have sent you a reset email.');
        } else {
          setMessage('Email not found.');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again later.');
      }
    };

    return (
        <form className="container" onSubmit = { handleSubmit }>
            <h1>Forgot Password</h1>
            <div className="email block">
                <label htmlFor="frm-email">Email</label>
                <input
                id="frm-email"
                type="email"
                name="text"
                value = { email }
                onChange = { handleEmailChange }
                autoComplete="email"
                required
                />
            </div>
            <div className="forgot-password">
                <Link href="/sign-in">
                    <label className="forgot-password">Back to login</label>
                </Link>
            </div>
            <div className="cancel-save block">
                <button type="submit">Submit</button>
            </div>
            <div className="message">
                <p>{ message }</p>
            </div>
        </form>
    )
    
};

export default ForgotPassword;