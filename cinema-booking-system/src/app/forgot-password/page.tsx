"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
  
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const encodedEmail = encodeURIComponent(email);
      try {
        const response = await fetch('http://localhost:8080/api/user/${encodedEmail}/forgot-password/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
            localStorage.setItem('resetEmail', email);
            setMessage('If an account with that email exists, we have sent you a reset email.');
            router.push('/forgot-code');
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
                id="inp"
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