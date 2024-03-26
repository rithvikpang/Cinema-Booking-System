import React from 'react';

export default function Home() {
  return (
    <form className="container">
      <h1>Profile</h1>
      <div className="first-name block">
        <label htmlFor="frm-first">First Name</label>
        <input
          id="frm-first"
          type="text"
          name="first"
          autoComplete="given-name"
          required
        />
      </div>
      <div className="last-name block">
        <label htmlFor="frm-last">Last Name</label>
        <input
          id="frm-last"
          type="text"
          name="last"
          autoComplete="family-name"
          required
        />
      </div>
      <div className="age block">
        <label htmlFor="frm-last">Age</label>
        <input
          id="from-age"
          type="text"
          name="age"
          autoComplete="age"
          required
        />
      </div>
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
      <div className="address block">
        <label htmlFor="frm-email">Address</label>
        <input
          id="frm-address"
          type="address"
          name="text"
          autoComplete="address"
          required
        />
      </div>
      <div className="loc block">
        <div>
          <label htmlFor="frm-city">City</label>
          <input
            id="frm-city"
            type="text"
            name="city"
            autoComplete="city"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-state">State</label>
          <input
            id="frm-state"
            type="text"
            name="state"
            autoComplete="state"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-zip">Zip Code</label>
          <input
            id="frm-zip"
            type="text"
            name="zip"
            autoComplete="zip"
            required
          />
        </div>
      </div>
      <div className="left-button block">
          <button type="submit">Change Password</button>
      </div>
      <div className="check-boxes">
        <div>
          <input type="checkbox" name="myCheckbox"/>
          <label>Register for Promotions</label>
        </div>
        <div>
          <input className="check" type="checkbox" name="myCheckbox"/>
          <label>Remember Me</label>
        </div>
      </div>
      <h2>Cards:</h2>
      <div className="cards">
        <h3>XXXX-XXXX-XXXX-1234</h3>
        <div className="delete block">
            <button type="submit">Delete</button>
        </div>
      </div>
      <div>
        <h2>Add Card</h2>
      </div>
      <div className="name block">
        <label htmlFor="frm-name">Name on Payment Card</label>
        <input
          id="frm-name"
          type="text"
          name="name"
          autoComplete="name"
          required
        />
      </div>
      <div className="card-num block">
        <label htmlFor="frm-card-num">Card Number</label>
        <input
          id="frm-card-num"
          type="card-num"
          name="text"
          autoComplete="card-num"
          required
        />
      </div>
      <div className="card-info block">
        <div>
          <label htmlFor="frm-exp">State</label>
          <input
            id="frm-exp"
            type="text"
            name="exp"
            autoComplete="exp"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-cvv">Zip Code</label>
          <input
            id="frm-cvv"
            type="text"
            name="cvv"
            autoComplete="cvv"
            required
          />
        </div>
      </div>
      <div className="button block">
        <button type="submit">Add Card</button>
      </div>
      <div className="left-button block">
        <div className="button block">
            <button type="submit">Cancel</button>
        </div>
        <div className="button block">
            <button type="submit">Save Changes</button>
        </div>
      </div>
    </form>
  );
}