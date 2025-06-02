import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slice/authSlice';

const Login = () => {

    const isDark = useSelector((state) => state.Theme.dark);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`, {
                email,
                password
            });

            if (response.data.success) {
                // Save both to localStorage safely
                const userInfo = response.data.user;
                localStorage.setItem('user', JSON.stringify({ name: userInfo.name, userId: userInfo._id, role: userInfo.role }));
                localStorage.setItem('authToken', response.data.token);
                toast.success(response && response.data.message);

                dispatch(login({
                    user: response.data.user,
                    token: response.data.token,
                }));

                const from = location.state?.from || '/';
                navigate(from); // Go back to the page user originally wanted
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top
    }, []);

    const handleForgotPassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <div className={`min-h-[76vh] flex flex-col ${isDark ? 'bg-gradient-to-br from-blue-50 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-black'}`}>
            <div className="flex-grow flex items-center justify-center px-4 py-10">
                <div className={`w-full max-w-md ${isDark ? 'bg-black text-white' : 'bg-white text-black'} rounded-2xl shadow-2xl p-8 md:p-12`}>
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                        Login to TeeFusion
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[15px] text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Login
                        </button>
                        <p className="text-center text-[16px] md:text-[18px] mt-4">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Register Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;