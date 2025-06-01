import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../slice/authSlice';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, []);

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const [userDetail, setUserDetail] = useState(null);

  const getUserDetail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API}/user/user-detail/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setUserDetail(res.data.user);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getUserDetail();
    }
  }, []);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (userDetail && !isDataLoaded) {
      setFormData({
        name: userDetail.name || '',
        email: userDetail.email || '',
        password: '',
        phone: userDetail.phone || '',
        address: userDetail.address || '',
      });
      setIsDataLoaded(true);
    }
  }, [userDetail, isDataLoaded]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, phone, address } = formData;

    try {
      const updateData = { name, phone, address };
      if (password) updateData.password = password;

      const response = await axios.put(
        `${import.meta.env.VITE_API}/user/profile/${user.userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response && response.data.success) {
        const userInfo = response.data.user;

        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify({
          name: userInfo.name,
          userId: userInfo._id,
          role: userInfo.role,
        }));

        toast.success(response.data.message);
        setFormData((prev) => ({
          ...prev,
          password: '',
        }));
        // Update user in Redux store
        dispatch(login({
          user: response.data.user,
          token: token,
        }));
      }
      else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  // Inside Profile.jsx (only JSX updated below your logic)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-yellow-100  flex items-center justify-center px-4">
      <div className="w-full max-w-lg  bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          ✨ Update Profile
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {["name", "email", "password", "phone"].map((field, idx) => (
            <input
              key={idx}
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1).replace("phone", "Phone Number")
              }
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${field === "email" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              disabled={field === "email"}
              required={field !== "password" && field !== "email"}
            />
          ))}

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;