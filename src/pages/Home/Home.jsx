import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Prices } from '../../components/Prices';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaFilter } from "react-icons/fa";
import { addToCart } from '../../slice/cartSlice';


function Home() {

  const isDark = useSelector((state) => state.Theme.dark);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const perPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/category/all-category`);
      if (res?.data?.success) {
        setCategories(res.data.category);
      } else {
        toast.error("Failed to load Category");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error on load category");
    }
  };

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/product/get-product-count`);
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
      toast.error("Error on load Total Product");
    }
  };

  const getProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/product/productList/${page}`);
      setProduct(data?.prod);
      getTotalCount();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFilterProduct = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/product/getFilter-product`, {
        checked,
        radio,
        page,
      });
      setProduct(data?.filterProduct);
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
      toast.error("Error on Filter Product");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    setPage(1);
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getProduct();
    } else {
      getFilterProduct(page);
    }
  }, [checked, radio, page]);

  useEffect(() => {
    getAllCategory();
    getTotalCount();
  }, []);

  const handleNext = () => {
    if (page * perPage < total) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (showMobileFilter) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileFilter]);


  return (
    <div className={`w-full mx-auto p-6 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} shadow p-4 h-screen rounded-lg min-w-[200px] md:w-[200px] md:flex hidden flex-col border flex-shrink-0`}>
          {/* Filter by Category */}
          <h2 className="text-[16px] font-semibold mb-3">🧩 Filter by Category</h2>
          {categories.map((cat) => (
            <div key={cat._id} className="mb-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  checked={checked.includes(cat._id)}
                  onClick={(e) => handleFilter(e.target.checked, cat._id)}
                />
                <span className="ml-2 text-sm">{cat.name}</span>
              </label>
            </div>
          ))}

          {/* Filter by Price */}
          <h2 className="text-[16px] font-semibold mb-3 mt-4">💰 Filter by Price</h2>
          {Prices.map((p) => (
            <div key={p._id} className="mb-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={radio === p.array}
                  className="form-radio text-blue-600"
                  onChange={() => {
                    setRadio(p.array);
                    setPage(1);
                  }}
                />
                <span className="ml-2 text-sm">{p.name}</span>
              </label>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setChecked([]);
                setRadio([]);
                getProduct();
              }}
              className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* mobile filter */}
        <div className={`flex-1 flex flex-col  overflow-auto" style={{ minHeight: '600px' }} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <button
            onClick={() => setShowMobileFilter(true)}
            className="md:hidden flex items-center gap-1 text-blue-600 mb-4"
          >
            <FaFilter size={20} />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <Spin spinning={loading} size="large" tip="Loading Products...">


            {/* Mobile Filter Drawer */}
            {showMobileFilter && (
              <>
                {/* Overlay */}
                <div
                  className={`fixed inset-0 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} bg-opacity-50 z-40`}
                  onClick={() => setShowMobileFilter(false)}
                />

                {/* Sliding Drawer */}
                <div className={`fixed top-[64px] left-0 w-[80%] max-w-sm h-[calc(100vh-64px)] ${isDark ? 'bg-black text-white' : 'bg-white text-black'} z-50 shadow-xl rounded-tr-2xl rounded-br-2xl overflow-y-auto transition-transform duration-300 transform translate-x-0`}>
                  <div className="p-4">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">🔍 Filters</h2>
                      <button
                        onClick={() => setShowMobileFilter(false)}
                        className="hover:text-red-500 text-2xl font-bold"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Filter by Category */}
                    <h3 className="text-base font-medium mb-2">🧩 Category</h3>
                    {categories.map((cat) => (
                      <div key={cat._id} className="mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={checked.includes(cat._id)}
                            onClick={(e) => handleFilter(e.target.checked, cat._id)}
                          />
                          <span className="ml-2 text-sm">{cat.name}</span>
                        </label>
                      </div>
                    ))}

                    {/* Filter by Price */}
                    <h3 className="text-base font-medium mt-6 mb-2">💰 Price</h3>
                    {Prices.map((p) => (
                      <div key={p._id} className="mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="mobile-price"
                            className="form-radio text-blue-600"
                            checked={radio === p.array}
                            onChange={() => {
                              setRadio(p.array);
                              setPage(1);
                            }}
                          />
                          <span className="ml-2 text-sm">{p.name}</span>
                        </label>
                      </div>
                    ))}

                    {/* Reset Button */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => {
                          setChecked([]);
                          setRadio([]);
                          getProduct();
                          setShowMobileFilter(false);
                        }}
                        className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className={`min-h-[600px] ${loading ? 'flex items-center justify-center' : ''} ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-grow">
                {products.length === 0 && !loading ? (
                  <p className="col-span-full">No products found.</p>
                ) : (
                  products.map((p) => (
                    <div
                      key={p._id}
                      onClick={() => navigate(`/product-detail/${p.slug}`)}
                      className="border cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-md transition"
                    >
                      <div className="w-full h-40 sm:h-48 md:h-72 overflow-hidden">
                        <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <h5 className="text-[14px] md:text-base font-semibold truncate mb-1">
                          {p.name}
                        </h5>
                        <p className="text-[11px] md:text-[12px] truncate mb-1">
                          {p.description}
                        </p>

                        <div className="flex justify-between items-center mt-1 md:mt-2">
                          {/* Price Section */}
                          <div className='flex max-365:flex-col flex-row'>
                            <span className="text-green-600 text-[10px] md:text-[16px] font-bold">
                              Rs. {p.price}
                            </span>
                            <span className="text-[10px] md:text-[15px] text-red-700 line-through ml-1 md:ml-2">
                              Rs. {(p.price + (p.price * 20) / 100).toFixed(0)}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <div onClick={(e) => e.stopPropagation()} className="relative group">
                            <button onClick={() => {
                              dispatch(addToCart(p))
                              toast.success("Successfully Added")
                            }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-[12px] md:text-[20px]">
                              <MdOutlineAddShoppingCart />
                            </button>

                            <div className="absolute left-[-85px] md:left-[-105px] top-1/2 -translate-y-1/2 md:w-[100px] w-[80px] bg-white border text-center border-gray-300 shadow-md p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                              <p className="text-[11px] md:text-sm text-blue-800">Add To Cart</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Spin>

          {/* Pagination */}
          <div className={`flex justify-center items-center gap-4 mt-4 py-4 ${isDark ? 'bg-black text-white' : 'bg-white text-black'} rounded-lg shadow-md sticky bottom-0 z-10`}>
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`px-3 py-1 rounded-lg text-[14px] text-white transition ${page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              Previous
            </button>

            <span className="text-[14px] font-semibold">Page {page}</span>

            <button
              onClick={handleNext}
              disabled={page * perPage >= total}
              className={`px-3 py-1 text-[14px] rounded-lg text-white transition ${page * perPage >= total ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;