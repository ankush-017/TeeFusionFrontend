import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, AddQuantity, DecreaseQuantity, clearCart } from '../../slice/cartSlice'; // adjust path if needed
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Cart() {

    const cartItem = useSelector((state) => state.cart.cartItem);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    const [userDetail, setUserDetail] = useState({});

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

    const total = cartItem.reduce((acc, p) => acc + p.price * p.cartQuantity, 0);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [cartItem]);

    const handleIncrease = (p) => {
        dispatch(AddQuantity(p));
    };

    const handleDecrease = (p) => {
        if (p.cartQuantity == 1) {
            dispatch(removeCartItem(p));
        }
        else {
            dispatch(DecreaseQuantity(p));
        }
    };

    const handleRemove = (p) => {
        dispatch(removeCartItem(p));
    };

    const deliveryCharge = 0;
    const amountToPay = total + deliveryCharge;

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleCheckout = async () => {
        const res = await loadRazorpayScript();
        if (!res) return alert("Razorpay SDK failed to load. Check your internet.");

        try {
            // Create order on backend, pass amount in rupees
            const orderRes = await axios.post(`${import.meta.env.VITE_API}/payment/create-order`, {
                amount: amountToPay,
            });

            const order = orderRes.data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "TeeFusion Store",
                description: "Product Purchase",
                image: "/logo.png",
                order_id: order.id,
                handler: async function (response) {
                    // On successful payment, call your backend to save order info
                    try {
                        // verify signature first
                        const verifyRes = await axios.post(
                            `${import.meta.env.VITE_API}/payment/verify-payment`, // also save order
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                amount: amountToPay,
                                items: cartItem,
                                userId: user.userId,
                                shippingAddress: userDetail.address,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if(verifyRes?.data?.success){
                            dispatch(clearCart());
                            toast.success("Payment Completed");
                            navigate("/dashboard/user/orders");
                        }
                    }
                    catch (err) {
                        console.error("Order save error:", err);
                        alert("Payment succeeded but order save failed. Contact support.");
                    }
                },
                prefill: {
                    name: userDetail.name || "",
                    email: userDetail.email || "",
                    contact: userDetail.phone || "",
                },
                theme: {
                    color: "#1A56DB",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } 
        catch (error) {
            alert("Server error while creating order. Please try again.");
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
                {/* Cart Items */}
                <div className="md:col-span-6 space-y-4">
                    {cartItem.length > 0 ? (
                        cartItem.map((p) => (
                            <div
                                key={p._id}
                                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 items-center"
                            >
                                <img
                                    src={p.photo}
                                    alt={p.name}
                                    onClick={() => navigate(`/product-detail/${p.slug}`)}
                                    className="w-24 cursor-pointer h-24 sm:w-32 sm:h-32 object-cover rounded border"
                                />
                                <div className="flex-1 w-full sm:text-left text-center">
                                    <div onClick={() => navigate(`/product-detail/${p.slug}`)} className='flex cursor-pointer flex-col'>
                                        <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
                                        <p className="text-sm text-gray-500 mb-1">{p.description}</p>
                                    </div>
                                    <div className="flex justify-center sm:justify-start items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <span className='font-semibold'>Quantity: </span>
                                            <button
                                                onClick={() => handleDecrease(p)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="font-medium">{p.cartQuantity}</span>
                                            <button
                                                onClick={() => handleIncrease(p)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(p)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Remove"
                                        >
                                            <RiDeleteBinLine size={18} />
                                        </button>
                                    </div>
                                    <p className="mt-2">
                                        <span className="text-green-600 text-md font-bold">
                                            ₹{p.price}
                                        </span>
                                        <span className="text-sm text-red-500 line-through ml-2">
                                            ₹{(p.price + (p.price * 20) / 100).toFixed(0)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Your cart is empty.</p>
                    )}
                </div>

                {/* Cart Summary */}
                <div className="md:col-span-3">
                    <div className="mb-6 p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-3">
                        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 w-full text-center">
                            Shipping Address
                        </h2>
                        <p className="text-gray-600 text-center break-words max-w-full px-2">
                            {userDetail.address || "No shipping address provided."}
                        </p>
                        <button
                            onClick={() => navigate('/dashboard/user/profile')}
                            className="mt-3 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-300"
                        >
                            Update Address
                        </button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-700">
                            <span>Subtotal: </span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-gray-800">
                            <span>Delivery Charge: </span>
                            <span>₹{deliveryCharge}</span>
                        </div>
                        <div className="flex justify-between font-semibold mt-3 text-gray-800">
                            <span>Total: </span>
                            <span>₹{total + deliveryCharge}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-300">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;