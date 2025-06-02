import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spin } from 'antd'; // 👈 Add this
import { useSelector } from 'react-redux';

function Product() {

    const isDark = useSelector((state) => state.Theme.dark);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/product/get-product`);
            if (data?.success) {
                setProducts(data.AllProducts);
            } else {
                toast.error("Failed to fetch products");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error while fetching products");
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading products..." />
            </div>
        );
    }

    return (
        <div className={`md:p-6 w-full md:max-w-7xl ${isDark ? 'bg-black text-white' : 'bg-white text-black'} mx-auto`}>
            <h2 className="text-3xl font-bold text-blue-800 mb-6">🛍️ All Products</h2>

            {products.length === 0 ? (
                <p className="text-center">No products found.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((p) => (
                        <Link
                            key={p._id}
                            to={`/dashboard/admin/product/${p.slug}`}
                            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                            <div className="border rounded overflow-hidden shadow hover:shadow-lg transition">
                                <div className="w-full h-40 sm:h-48 md:h-72 overflow-hidden">
                                    <img
                                        src={p.photo}
                                        alt={p.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-3">
                                    <h5 className="text-base font-semibold truncate mb-1">{p.name}</h5>
                                    <p className="text-sm line-clamp-1">{p.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Product;