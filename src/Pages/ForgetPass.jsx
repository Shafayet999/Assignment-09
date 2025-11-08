import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';

const ForgetPassword = () => {
    const location = useLocation();
    const { sendPassResetEmailFunc } = useContext(AuthContext); // Firebase password reset function
    const initialEmail = location.state?.email || '';
    const [email, setEmail] = useState(initialEmail);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('❌ Please enter your email');
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            await sendPassResetEmailFunc(email); // Firebase email reset
            setMessage('✅ Reset email sent! Redirecting to Gmail...');
            setEmail(''); 

           
            setTimeout(() => {
                window.location.href = "https://mail.google.com"; 
            }, 1500);
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center mt-20">
            <div className="card bg-white shadow-xl p-8 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
                <form onSubmit={handleReset}>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className={`btn btn-neutral w-full mt-4 ${loading && 'loading'}`}>
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </div>
        </div>
    );
};

export default ForgetPassword;
