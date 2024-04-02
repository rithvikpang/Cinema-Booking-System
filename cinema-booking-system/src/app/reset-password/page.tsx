"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ResetPasswordPage: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const queryParams = new URLSearchParams(location.search);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const router = useRouter();
        const email = localStorage.getItem('resetEmail');
        try {
            const response = await axios.post('/api/user/reset-password', { email, newPassword});
            if (response.status === 200) {
                localStorage.removeItem('resetEmail');
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
                <label htmlFor="frm-email">New Password</label>
                <input
                    id = "frm-email"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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