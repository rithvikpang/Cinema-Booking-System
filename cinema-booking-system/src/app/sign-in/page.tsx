import React from "react";

export default function Home() {
  return (
    <form className="container">
      <h1>Sign In</h1>
      <div className="email block">
        <label htmlFor="frm-email">Email</label>
        <input
          id="frm-email"
          type="email"
          name="email"
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
          autoComplete="current-password"
          required
        />
      </div>
      <div className="sign-in button">
              <button type="submit">Login</button>
        </div>
    </form>
  );
}