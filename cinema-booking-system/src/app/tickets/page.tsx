import React from "react";

export default function Home() {
    return (
        <form className="container">
            <h1>Tickets</h1>
            <div className="order-sum-item">
                <label htmlFor="message">Movie:</label>
                <label htmlFor="message">Time:</label>
            </div>
            <div className="rectangle">
                <div className="order-sum-item">
                    <label htmlFor="message">Wonka</label>
                    <label htmlFor="message">February 20th, 2024 at 12:00</label>
                </div>
            </div>
            <div className="order-sum-item">
                <label htmlFor="message">Seat:</label>
                <label htmlFor="message">Age:</label>
                <label htmlFor="message">Price:</label>
            </div>
            <div>
                <div className="rectangle">
                    <div className="order-sum-item">
                        <label htmlFor="message">A1</label>
                        <label htmlFor="message">Adult</label>
                        <label htmlFor="message">$11.99</label>
                    </div>
                    <div className="button block">
                        <button type="submit">Cancel</button>
                    </div>
                    <div className="order-sum-item">
                        <label htmlFor="message">A2</label>
                        <label htmlFor="message">Adult</label>
                        <label htmlFor="message">$11.99</label>
                    </div>
                    <div className="button block">
                        <button type="submit">Cancel</button>
                    </div>
                    <div className="order-sum-item">
                        <label htmlFor="message">A3</label>
                        <label htmlFor="message">Child</label>
                        <label htmlFor="message">$8.99</label>
                    </div>
                    <div className="button block">
                        <button type="submit">Cancel</button>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className='button block'>
                    <button className='seats'>Back</button>
                </div>
                <div className='button block'>
                    <button className='seats'>Continue</button>
                </div>
            </div>
        </form>
    )
}