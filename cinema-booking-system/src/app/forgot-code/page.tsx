"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const VerificationCodeEntryPage: React.FC = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/verify-code', { verificationCode });
            if (response.status === 200){
                router.push('/reset-password');
            } else {
                alert('Invalid or expired verification code.');
            } // Assuming you're not passing the code in the URL for security reasons
        } catch (error) {
            alert('Invalid or expired verification code.');
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <h1>Verification Code Entry</h1>
            <div>
                <label htmlFor="frm-password">Verification Code</label>
                <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
            </div>
            <div className="cancel-save block">
                <button type="submit">Submit</button>
            </div>
        </form>
    );

};

export default VerificationCodeEntryPage;
