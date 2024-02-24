import React from 'react';

export default function Home() {
  return (
    <form className="container">
      <h1>Edit Cards</h1>
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