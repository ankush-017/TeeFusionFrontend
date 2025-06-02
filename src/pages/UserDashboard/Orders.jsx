import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Orders() {

  const isDark = useSelector((state)=> state.Theme.dark);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("authToken");

  const getOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/orders/user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusClasses[status] || "bg-gray-200 text-gray-700"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className={`p-6 overflow-x-hidden ${isDark ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
      <h2 className="md:text-3xl text-2xl font-bold text-indigo-700 mb-8 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={`${isDark ? 'bg-black text-white' : 'bg-white text-gray-800'} border flex-col justify-center items-center border-gray-200 rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition`}>
            <div className="flex flex-wrap justify-between items-center mb-2">
              <h3 className="md:text-lg text-[14px] font-semibold text-indigo-600">Order ID: <span className="text-black">{order._id}</span></h3>
              {getStatusBadge(order.status)}
            </div>

            <p className="text-sm mb-1"><span className="font-medium">Amount Paid:</span> ₹{order.amount}</p>
            <p className="text-sm mb-3"><span className="font-medium">Shipping Address:</span> {order.shippingAddress}</p>

            <div className="bg-gray-50 p-4 rounded-md border">
              <h4 className="font-semibold mb-2 text-gray-800">Items in this order:</h4>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                  <li key={index} className="flex flex-wrap items-center space-x-4">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">× {item.cartQuantity} — ₹{item.price} each</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-right">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;