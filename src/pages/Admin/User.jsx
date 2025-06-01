import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function User() {

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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        All Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Phone
                </th>
                <th className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="py-3 px-6 bg-indigo-100 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 hover:bg-indigo-50 transition"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {user.phone}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                    {user.address}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm">
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
      )}
    </div>
  );
}
export default User;