import React from "react";

export default function Home() {
    return (
        <form className="container">
            <h1>Edit Promotions</h1>
            <div className="form-section">
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion</label>
                    <label className="tickets-label" htmlFor="message">Edit Details</label>
                    <label className="tickets-label" htmlFor="message">Delete</label>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 1</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 2</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
                <hr></hr>
                <div className="order-sum-item">
                    <label className="tickets-label" htmlFor="message">Promotion 3</label>
                    <div className="tickets-button block">
                        <button type="submit">Edit</button>
                    </div>
                    <div className="tickets-button block">
                        <button type="submit">Delete</button>
                    </div>
                </div>
            </div>
            
            <h1 style={{marginTop: '50px' }}>Add Promotion</h1>
            <div className="first-name block">
                <label htmlFor="frm-first">Promotion Name</label>
                <input
                    id="frm-first"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Promo Code</label>
                <input
                    id="frm-first"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Expiration Date</label>
                <input
                    id="frm-first"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="first-name block">
                <label htmlFor="frm-first">Discount</label>
                <input
                    id="frm-first"
                    type="text"
                    name="first"
                    autoComplete="given-name"
                    required
                />
            </div>
            <div className="button block">
                <button type="submit">Add</button>
            </div>
        </form>

    )
}