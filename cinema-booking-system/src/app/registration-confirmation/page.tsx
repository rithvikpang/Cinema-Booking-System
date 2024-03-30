import React from "react";
import Link from 'next/Link'

export default function Home() {
    return (
        <div className="log-out-container">
            <h3>Registration Confirmation</h3>
            <div>
                <label htmlFor="message" style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>Thank you for registering with CINEMA! You have been sent a confirmation email.</label>
            </div>
            <div className="button block">
                <Link href="/">
                    <button type="submit" style={{marginTop: '20px' }}>Back to Home</button>
                </Link>
            </div>
        </div>
    )
}