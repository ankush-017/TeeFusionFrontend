import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select, Button, Spin } from "antd";
import UseDropzone from '../../components/UploadImageUI/UseDropZone';
import TextArea from 'antd/es/input/TextArea';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

function UpdateProduct() {
    const params = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState(false);
    const [photo, setImage] = useState(null);
    const [id, setId] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/product/get-product/${params.slug}`);
            if (data?.Aproduct) {
                const p = data.Aproduct;
                setName(p.name);
                setDescription(p.description);
                setPrice(p.price);
                setQuantity(p.quantity);
                setShipping(p.shipping);
                setId(p._id);
                setCategory(p.category._id);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/category/all-category`);
            if (response?.data?.success) {
                setCategories(response.data.category);
            } else {
                toast.error("Failed to load categories");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error loading categories");
        }
    };

    useEffect(() => {
        getCategories();
        getSingleProduct();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            formData.append("category", category);
            formData.append("photo", photo);

            const token = localStorage.getItem("authToken");

            const res = await axios.put(
                `${import.meta.env.VITE_API}/product/update-product/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res?.data?.success) {
                toast.success("Product Updated successfully!");
                navigate('/dashboard/admin/product');
            } else {
                toast.error(res?.data?.message || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Update product failed");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        try {
            const userConfirmed = window.confirm("Are you sure you want to delete this product?");
            if (!userConfirmed) return;

            const token = localStorage.getItem("authToken");

            const { data } = await axios.delete(
                `${import.meta.env.VITE_API}/product/delete-product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (data?.success) {
                toast.success("Product deleted successfully!");
                navigate('/dashboard/admin/product');
            } else {
                toast.error(data?.message || "Failed to delete product.");
            }

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong while deleting the product.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" tip="Loading product..." />
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Update Product</h2>

            <Select
                placeholder="Select a category"
                size="large"
                className="w-full"
                showSearch
                onChange={(val) => setCategory(val)}
                value={category || undefined}
            >
                {categories.map((c) => (
                    <Option value={c._id} key={c._id}>
                        {c.name}
                    </Option>
                ))}
            </Select>

            <UseDropzone setImage={setImage} photo={photo} />

            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-lg font-semibold placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />

            <TextArea
                rows={4}
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 resize-none
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />


            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <Select
                placeholder="Shipping Available?"
                size="large"
                className="w-full"
                onChange={(val) => setShipping(val === "1")}
                value={shipping ? "1" : "0"}
            >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
            </Select>

            <div className="flex space-x-5 flex-row mt-7">
                <Button
                    type="primary"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleUpdate}
                    loading={updating}
                >
                    {updating ? 'Updating...' : 'Update'}
                </Button>
                <Button
                    type="primary"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default UpdateProduct;