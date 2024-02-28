import React from 'react';

export default function Home() {    
  return (
    <div>
        <form className="container">
            <h1>Checkout</h1>
            <h2>Use Existing Card</h2>
            <div className="combobox">
                <input
                type="text"
                placeholder="Select a card"
                style={{ fontSize: '14px' }} 
                />
                <ul className="dropdown">
                    <li>XXXX-XXXX-XXXX-1234</li>
                    <li>XXXX-XXXX-XXXX-5678</li>
                    <li>XXXX-XXXX-XXXX-9876</li>
                </ul>
            </div>
            <h1>Or</h1>
            <h2>Add New Card</h2>
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
            <div className="add block">
                <button type="submit">Add Card</button>
            </div>
            <div className="loc block">
                <button type="submit">Next</button>
            </div>
        </form>
    </div>
  );
}