import React from "react";

export default function Home() {
    return (
        <form className="container">
            <h1>Tickets</h1>
                <div className="order-label">
                    <label className="movie-tickets-label" htmlFor="message">Movie</label>
                    <label className="movie-tickets-label" htmlFor="message">Time</label>
                </div>
                <div className="form-section">
                    <div className="order-sum-item">
                        <label className="tickets-label" htmlFor="message">Wonka</label>
                        <label className="tickets-label" htmlFor="message">February 20th, 2024 at 12:00</label>
                    </div>
                </div>

                <div className="order-label">
                    <label className="movie-tickets-label" htmlFor="message">Seat</label>
                    <label className="movie-tickets-label" htmlFor="message">Age</label>
                    <label className="movie-tickets-label" htmlFor="message">Price</label>
                    <label className="movie-tickets-label" htmlFor="message"></label>
                    <label className="movie-tickets-label" htmlFor="message"></label>
                </div>
                <div>
                <div className="form-section">
                    <div className="order-sum-item">
                        <label className="tickets-label" htmlFor="message">A1</label>
                        <label className="tickets-label" htmlFor="message">Adult</label>
                        <label className="tickets-label" htmlFor="message">$11.99</label>
                        
                        <div className="tickets-button block">
                            <button type="submit">Cancel</button>
                        </div>
                    </div>
                    <div className="order-sum-item">
                        <label className="tickets-label" htmlFor="message">A2</label>
                        <label className="tickets-label" htmlFor="message">Adult</label>
                        <label className="tickets-label" htmlFor="message">$11.99</label>

                        <div className="tickets-button block">
                            <button type="submit">Cancel</button>
                        </div>
                    </div>
                    
                    <div className="order-sum-item">
                        <label className="tickets-label" htmlFor="message">A3</label>
                        <label className="tickets-label" htmlFor="message">Child</label>
                        <label className="tickets-label" htmlFor="message">$8.99</label>
                        
                        <div className="tickets-button block">
                            <button type="submit">Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="order-label" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div className='back-cont-button block'>
                        <button className='seats'>Back</button>
                    </div>
                    <div className='back-cont-button block'>
                        <button className='seats'>Continue</button>
                    </div>
                </div>
            </div>
        </form>
    )
}