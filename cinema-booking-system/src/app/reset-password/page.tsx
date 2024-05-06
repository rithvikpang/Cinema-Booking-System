"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ResetPasswordPage: React.FC = () => {
    // const [newPassword, setNewPassword] = useState<string>('');
    // const queryParams = new URLSearchParams(location.search);
    // const router = useRouter();

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const router = useRouter();
    //     try {
    //         const response = await axios.post('/api/user/reset-password');
    //         if (response.status === 200) {
    //             alert('Password reset successfully.');
    //             router.push('/sign-in');
    //         } else {
    //             alert('Failed to reset password.');
    //         }
    //     } catch (error) {
    //         alert('Failed to reset password.');
    //     }
    // };

    // return (
    //     <form className="container" onSubmit={handleSubmit}>
    //         <h1>Reset Password</h1>
    //         <div>
    //             <label htmlFor="frm-email">New Password</label>
    //             <input
    //                 id = "frm-email"
    //                 type="password"
    //                 value={newPassword}
    //                 onChange={(e) => setNewPassword(e.target.value)}
    //                 required
    //             />
    //         </div>
    //         <div className="cancel-save block">
    //             <button type="submit">Submit</button>
    //         </div>
    //     </form>
    // );

    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();
    const token = router.query.token;  // Assuming you pass the token via query parameters

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/user/reset-password', {
                token: token,
                password: newPassword  // Assuming your backend expects a password and token
            });
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