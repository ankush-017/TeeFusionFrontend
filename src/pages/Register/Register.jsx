import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { login } from '../../slice/authSlice';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    });

    const isDark = useSelector((state)=> state.Theme.dark);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, phone, address } = formData;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/auth/register`, {
                name,
                email,
                password,
                phone,
                address
            });
            if (response && response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                const userInfo = response.data.user;
                localStorage.setItem('user', JSON.stringify({name: userInfo.name,userId: userInfo._id,role: userInfo.role}));
                toast.success(response.data && response.data.message);
                // Dispatch login to Redux
                dispatch(login({
                    user: response.data.user,
                    token: response.data.token,
                }));
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };


    return (
        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-br from-blue-50 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-black'}`}>
            <div className="flex-grow flex items-center justify-center px-4 py-10">
                <div className={`w-full max-w-lg ${isDark ? 'bg-black text-white' : 'bg-white text-black'} rounded-2xl shadow-2xl p-8 md:p-12`}>
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
                        Register for TeeFusion
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5 text-gray-800">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Shipping Address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Register
                        </button>
                        <p className={`text-center text-[16px] md:text-[18px] mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Login Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;