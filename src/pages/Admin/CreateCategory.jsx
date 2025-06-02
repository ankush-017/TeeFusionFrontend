import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdEdit, MdDelete } from "react-icons/md";
import { Modal } from "antd";
import CategoryForm from '../../components/CategoryFrom';
import { useSelector } from 'react-redux';

function CreateCategory() {

  const [category, setcategory] = useState([]);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const getCategory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/category/all-category`);
      if (response.data.success) {
        // toast.success("Categories loaded", {
        //   toastId: "category-load"
        // });
        setcategory(response.data.category);
      } else {
        toast.error("Failed on Load");
      }

    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      if (data?.success) {
        toast.success(`${name} is created`);
        getCategory();
        setName("");
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  }

  const handleUdateSubmit = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API}/category/update-category/${selected._id}`,
        { name: updateName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${updateName} is created`);
        getCategory();
        setName("");
        setVisible(false);
        setSelected(null);
        setUpdateName("");
      }
    }
    catch (err) {
      console.log(err);
      toast.error("somthing went wrong in update form");
    }
  }


  const handleDelete = async (id) => {
  const token = localStorage.getItem("authToken");
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API}/category/delete-category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.success) {
      const deletedCat = category.find((c) => c._id === id);
      setcategory((prev) => prev.filter(c => c._id !== id));
      toast.success(`${deletedCat?.name || "Category"} is deleted`);
      getCategory();
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong in delete category");
  }
};


  useEffect(() => {
    getCategory();
  }, []);

  const isDark = useSelector((state) => state.Theme.dark);

  return (
    <div className='flex-col'>
      {/* <h1 className='text-center text-'>Manage Category</h1> */}
      <div className='flex justify-center mb-3'>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
      </div>
      <div className={`overflow-x-auto ${isDark ? 'bg-black text-white' : 'bg-white text-black'} shadow-lg rounded-lg`}>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {
              category.map((c) => (
                <tr key={c._id} className={`transition duration-150`}>
                  <td className="px-6 py-4 font-semibold">{`${c.name}`}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => {
                        setVisible(true)
                        setUpdateName(c.name)
                        setSelected(c)
                      }
                      } className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-md shadow transition">
                        <MdEdit className="text-lg" />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(c._id)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-md shadow transition">
                        <MdDelete className="text-lg" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
      >
        <CategoryForm
          handleSubmit={handleUdateSubmit}
          value={updateName}
          setValue={setUpdateName}
        />
      </Modal>
    </div>
  );
}

export default CreateCategory;