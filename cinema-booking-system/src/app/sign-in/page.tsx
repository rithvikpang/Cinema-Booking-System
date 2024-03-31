"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/Link'

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

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.data.token); // Storing the JWT token, make sure this is data.data
        console.log('Login successful:', data);
        const destination = data.isAdmin ? "/" : "/";
        window.location.href = destination;
      } else {
        console.error('Login failed:', data.data.message);
        setLoginError(data.data.message);
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
      <Link className="forgot-password" href="/forgot-password">
        <label className="forgot-password">Forgot Password</label>
      </Link>
      {loginError && <div className="error-message">{loginError}</div>}
      <div className="sign-in button block">
        <button type="submit">Login</button>
      </div>
    </form>
  );
}