"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        setLoginError('Login failed. Please check your credentials.');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Login successful:', data);
          // Redirect user or update UI accordingly

          //for now, we have to make it so that admins and users land on different pages i guess?
          window.location.replace("/home");
        } else {
          console.error('Unexpected response:', contentType);
          setLoginError('An unexpected response was received. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };
  

  return (
    <form className="container" onSubmit={handleSignIn}>
      <h1>Sign In</h1>
      <div className="email block">
        <label htmlFor="frm-email">Email</label>
        <input
          id="frm-email"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
          required
        />
      </div>
      <div className="password block">
        <label htmlFor="frm-password">Password</label>
        <input
          id="frm-password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          required
        />
      </div>
      {loginError && <div className="error-message">{loginError}</div>}
      <div className="sign-in button block">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
