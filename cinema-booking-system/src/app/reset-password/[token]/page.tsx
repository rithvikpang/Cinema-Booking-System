"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {

    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();

    console.log(params.token)

    // const [token, setToken] = useState<string | string[] | undefined>();

    // Safely access the query parameter using useEffect
    // useEffect(() => {
    //     if (router.isReady) {
    //         setToken(router.query.token);
    //     }
    // }, [router.isReady, router.query.token]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (!params.token) {
            alert('Token is missing.');
            return;
        }

        try {
            // const response = await axios.post('http://localhost:8080/api/user/reset-password', {
            //     token: params.token,
            //     password: newPassword  // Assuming your backend expects a password and token
            // });
            const response = await fetch(`http://localhost:8080/api/user/reset-password?token=${params.token}&newPassword=${newPassword}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },})
            if (response.status === 200) {
                alert('Password reset successfully.');
                router.push('/sign-in');
            } else {
                alert('Failed to reset password.');
            }
        } catch (error) {
            alert('Failed to reset password.');
        }

    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <div>
                <label htmlFor="new-password">New Password</label>
                <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm New Password</label>
                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <div className="cancel-save block">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
    
};

export default ResetPasswordPage;