import React from "react";

export default function Home() {
    return (
        <form className="container">
            <h1>Edit Promotions</h1>
            <div className="order-sum-item">
                <label htmlFor="message">Promotion</label>
                <label htmlFor="message">Edit Details</label>
                <label htmlFor="message">Delete</label>
            </div>
            <hr></hr>
            <div className="order-sum-item">
                <label htmlFor="message">Promotion 1</label>
                <div className="button block">
                    <button type="submit">Edit</button>
                </div>
                <div className="button block">
                    <button type="submit">Delete</button>
                </div>
            </div>
            <hr></hr>
            <div className="order-sum-item">
                <label htmlFor="message">Promotion 2</label>
                <div className="button block">
                    <button type="submit">Edit</button>
                </div>
                <div className="button block">
                    <button type="submit">Delete</button>
                </div>
            </div>
            <hr></hr>
            <div className="order-sum-item">
                <label htmlFor="message">Promotion 3</label>
                <div className="button block">
                    <button type="submit">Edit</button>
                </div>
                <div className="button block">
                    <button type="submit">Delete</button>
                </div>
            </div>
        </form>

    )
}