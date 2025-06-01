import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Spin } from 'antd';
import { addToCart } from "../../slice/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const ProductDetail = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params?.slug) getProduct();
        window.scrollTo(0, 0); // scroll to top
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/product/get-product/${params.slug}`
            );
            setProduct(data?.Aproduct);
            getSimilarProduct(data?.Aproduct._id, data?.Aproduct.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getSimilarProduct = async (pid, cid) => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_API}/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Product Detail Section */}
            <div className="flex flex-col md:flex-row gap-10 md:items-center justify-center mb-12">
                {/* Image */}
                <div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px] flex-shrink-0">
                    <img
                        src={product.photo}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1 max-w-xl flex flex-col justify-center h-full">
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">{product.name}</h1>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Description:</span> {product.description}
                    </p>

                    <div className="flex flex-row items-baseline mb-2">
                        <p className="text-green-600 text-xl font-bold">₹ {product.price}</p>
                        <span className="ml-2 text-red-500 line-through text-[19px]">
                            ₹{Math.round(product.price * 1.2)}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-4 font-medium">
                        Category: {product?.category?.name}
                    </p>

                    <button
                        onClick={() => {
                            dispatch(addToCart(product))
                            toast.success("Successfully Added")
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
                        <MdOutlineAddShoppingCart className="inline-block mr-2" />
                        ADD TO CART
                    </button>
                </div>
            </div>

            <hr className="my-8" />

            {/* Similar Products Section */}
            <Spin spinning={loading} size="large" tip="Loading Products...">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Similar Products
                    </h2>

                    {relatedProducts.length === 0 && !loading ? (
                        <p className="text-center text-gray-500 text-lg">No products found.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <div
                                    key={p._id}
                                    onClick={() => navigate(`/product-detail/${p.slug}`)}
                                    className="bg-white cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200"
                                >
                                    <div className="w-full h-40 sm:h-48 md:h-60 overflow-hidden">
                                        <img
                                            src={p.photo}
                                            alt={p.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h5 className="text-lg font-semibold text-gray-800 truncate mb-1">
                                            {p.name}
                                        </h5>
                                        <p className="text-sm text-gray-600 truncate mb-2">
                                            {p.description}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-green-600 font-bold">₹{p.price}</span>
                                                <span className="ml-2 text-red-500 line-through text-sm">
                                                    ₹{Math.round(p.price * 1.2)}
                                                </span>
                                            </div>

                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="relative group"
                                            >
                                                <button onClick={() => {
                                                    dispatch(addToCart(product))
                                                    toast.success("Successfully Added")
                                                }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] md:text-[20px]">
                                                    <MdOutlineAddShoppingCart />
                                                </button>
                                                <div className="absolute left-[-110px] top-1/2 -translate-y-1/2 w-[100px] bg-white border text-center border-gray-300 shadow-md p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                                    <p className="text-sm text-blue-800">Add To Cart</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Spin>
        </div>
    );
};

export default ProductDetail;