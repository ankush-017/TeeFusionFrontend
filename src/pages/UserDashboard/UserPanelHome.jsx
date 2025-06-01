import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function UserPanelHome() {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-yellow-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl px-6 py-10 transition-all duration-300 border border-white/30">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <FaUserCircle className="text-7xl text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome, {userDetail?.name || user?.name || 'User'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{userDetail?.email}</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoCard label="📧 Email" value={userDetail?.email} />
          <InfoCard label="📱 Phone" value={userDetail?.phone || 'Not Provided'} />
          <InfoCard label="🏠 Address" value={userDetail?.address || 'Not Provided'} />
          <InfoCard
            label="🔑 Role"
            value={
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${userDetail?.role === 1
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'}`}
              >
                {userDetail?.role === 1 ? 'Admin' : 'User'}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ label, value }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 hover:shadow-lg transition">
    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-gray-800 font-semibold text-base">{value}</p>
  </div>
);

export default UserPanelHome;