import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OrdersAdmin() {

    const isDark = useSelector((state) => state.Theme.dark);
    const [orders, setOrders] = useState([]);
    const token = useSelector((state) => state.auth.token);

    const getAllOrder = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/orders/adminorders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data.success) {
                setOrders(res.data.orders);
            }
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            getAllOrder();
        }
    }, [token]);

    const handleStatusChange = async (orderId, newStatus) => {
    try {
        const res = await axios.put(
            `${import.meta.env.VITE_API}/orders/update-status/${orderId}`,
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.data.success) {
            getAllOrder();
        }
    } catch (error) {
        console.log("Error updating status:", error);
    }
};


    return (
        <div className={`p-2 mx-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h2 className="md:text-3xl text-2xl font-bold text-indigo-700 mb-8 text-center">All Customer Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className={`border flex-col justify-center items-center border-gray-200 rounded-xl p-6 mb-6 shadow-md hover:shadow-lg transition ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        <div className="flex justify-between flex-wrap items-center mb-2">
                            <h3 className="md:text-lg text-[14px] font-semibold text-indigo-600">Order ID: <span className={`${isDark ? ' text-white' : ' text-black'}`}>{order._id}</span></h3>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                className="text-sm px-2 py-1 rounded bg-white border text-gray-800 border-gray-300 focus:outline-none focus:ring focus:border-indigo-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                            </select>

                        </div>

                        <p className="text-sm mb-1"><span className="font-medium">User:</span> {order.user.name || 'N/A'}</p>
                        <p className="text-sm mb-1"><span className="font-medium">Email:</span> {order.user.email || 'N/A'}</p>
                        <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {order.user.phone || 'N/A'}</p>
                        <p className="text-sm mb-1"><span className="font-medium">Amount:</span> ₹{order.amount}</p>
                        <p className="text-sm mb-3"><span className="font-medium">Shipping:</span> {order.shippingAddress}</p>

                        <div className="bg-gray-50 p-4 rounded-md border">
                            <h4 className="font-semibold mb-2 text-gray-800">Items:</h4>
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

                        <p className="text-xs mt-3 text-right">
                            Placed on: {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrdersAdmin;