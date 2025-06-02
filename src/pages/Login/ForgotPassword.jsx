import { useState } from 'react';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

export default function ForgotPassword() {

    const isDark = useSelector((state)=> state.Theme.dark);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
    });

    const handleSendOtp = async () => {
        if (!email) {
            setMessage({ text: 'Please enter your email', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/auth/forgot-password`, { email });
            setMessage({ text: res.data.message, type: 'success' });
            setStep(2);
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Error sending OTP',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setMessage({ text: 'Please enter a valid 6-digit OTP', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/auth/verify-otp`, { email, otp });
            setMessage({ text: res.data.message, type: 'success' });
            setStep(3);
        } catch (err) {
            setMessage({
                text: err.response?.data?.message || 'Invalid OTP',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        // Client-side validation
        if (!newPassword || !confirmPassword) {
            setMessage({ text: 'All fields are required', type: 'error' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            return;
        }

        if (newPassword.length < 8) {
            setMessage({ text: 'Password must be at least 8 characters', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/auth/reset-password`, {
                email,       // Make sure email is included
                otp,         // Include the OTP that was verified
                newPassword, // The new password
                confirmPassword // Some backends require confirmation
            });

            setMessage({
                text: res.data.message || 'Password reset successfully',
                type: 'success'
            });

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                'Error resetting password';

            setMessage({
                text: errorMessage,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} pt-10 pb-10`}>
        <div className={`max-w-md mx-auto min-h-[70vh] p-6 border rounded-lg shadow-md ${isDark ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-2xl font-bold mb-6 text-center ">Forgot Password</h2>

            {step === 1 && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your registered email"
                            className="w-full border text-gray-900 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSendOtp}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        We've sent a 6-digit OTP to <span className="font-semibold">{email}</span>
                    </p>
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                            OTP Code
                        </label>
                        <input
                            id="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full border border-gray-300 text-gray-900 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        />
                    </div>
                    <button
                        onClick={handleVerifyOtp}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                    <button
                        onClick={() => {
                            setStep(1);
                            setMessage({ text: '', type: '' });
                        }}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Change Email
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showPassword.new ? "text" : "password"}
                                placeholder="Enter new password (min 8 characters)"
                                className="w-full border text-gray-900 border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                            >
                                {showPassword.new ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showPassword.confirm ? "text" : "password"}
                                placeholder="Confirm your new password"
                                className="w-full text-gray-900 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                            >
                                {showPassword.confirm ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleResetPassword}
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </div>
            )}

            {message.text && (
                <div
                    className={`mt-4 p-3 rounded-md text-sm ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}
                >
                    {message.text}
                </div>
            )}
            <div className="mt-4 text-center">
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                    Back to Login
                </a>
            </div>
        </div>
        </div>
    );
}