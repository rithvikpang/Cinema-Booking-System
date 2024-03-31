import React from "react";

export default function Home() {
    return (
        <form className="container">
            <h1>Forgot Password</h1>
            <div className="email block">
                <label htmlFor="frm-email">Email</label>
                <input
                id="inp"
                type="email"
                name="text"
                autoComplete="email"
                required
                />
            </div>
            <div className="cancel-save block">
                <button type="submit">Reset Password</button>
            </div>
        </form>
    )
}