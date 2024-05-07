import React from "react";
import Link from 'next/link'

export default function Home() {
    return (
        <div className="log-out-container">
            <h3>Thank you for registering with CINEMA BOOKING! You have been sent a confirmation email.</h3>
            <Link className="link" href='/'>
                <h3>Click here to return to home</h3>
            </Link>
        </div>
    )
}