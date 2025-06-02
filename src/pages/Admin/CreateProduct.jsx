import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select, Button, Spin } from "antd";
import UseDropzone from '../../components/UploadImageUI/UseDropZone';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';

const { Option } = Select;

function CreateProduct() {

  const isDark = useSelector((state) => state.Theme.dark);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setImage] = useState(null);
  
  // New loading state
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start spinner
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

      const res = await axios.post(`${import.meta.env.VITE_API}/product/create-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Product created successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setImage(null);
      } else {
        toast.error(res?.data?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Create product failed");
    } finally {
      setLoading(false); // Stop spinner
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
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={`space-y-4 p-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold">Create New Product</h2>

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
        className="w-full p-2 text-gray-800 border rounded"
      />

      <TextArea
        rows={4}
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-gray-800"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 text-gray-800 border rounded"
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full text-gray-800 p-2 border rounded"
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

      {/* Use Ant Design Button's loading prop for spinner */}
      <Button
        type="primary"
        className="w-full mt-4"
        onClick={handleCreate}
        loading={loading}  // spinner shows when loading is true
      >
        Create Product
      </Button>
    </div>
  );
}

export default CreateProduct;