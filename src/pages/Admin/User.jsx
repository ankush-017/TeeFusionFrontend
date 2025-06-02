import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function User() {

  const isDark = useSelector((state) => state.Theme.dark);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/all-user/adminpanel`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <div className={`max-w-6xl mx-auto p-6 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">All Users</h1>

      {users.length === 0 ? (
        <p className="text-center">No users found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className={`min-w-full ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <thead>
                <tr>
                  {["Name", "Email", "Phone", "Address", "Role"].map((col) => (
                    <th
                      key={col}
                      className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-indigo-50 transition">
                    <td className="py-4 px-6 text-sm font-medium">{user.name}</td>
                    <td className="py-4 px-6 text-sm">{user.email}</td>
                    <td className="py-4 px-6 text-sm">{user.phone}</td>
                    <td className="py-4 px-6 text-sm max-w-xs truncate">{user.address}</td>
                    <td className="py-4 px-6 text-sm">
                      {user.role === 1 ? (
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                          User
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div key={user._id} className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} shadow-md rounded-lg p-4 border border-gray-200`}>
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p><span className="font-semibold">Address:</span> {user.address}</p>
                <p>
                  <span className="font-semibold text-green-500">Role:</span>{" "}
                  {user.role === 1 ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-200 text-green-800">Admin</span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">User</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default User;