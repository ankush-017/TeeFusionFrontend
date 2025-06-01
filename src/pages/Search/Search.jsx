import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../slice/cartSlice'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

function Search() {
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const results = useSelector((state) => state.search.results);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <Spin spinning={loading} size="large" tip="Loading Products...">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Search Results
          </h2>

          {results.length === 0 && !loading ? (
            <p className="text-center text-gray-500 text-lg">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product-detail/${p.slug}`)}
                  className="bg-white cursor-pointer border rounded-lg shadow hover:shadow-lg transition duration-200"
                >
                  <div className="w-full h-40 sm:h-48 md:h-72 overflow-hidden">
                    <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
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
                        <span className="text-green-600 font-bold">
                          ₹{p.price}
                        </span>
                        <span className="ml-2 text-red-500 line-through text-sm">
                          ₹{Math.round(p.price * 1.2)}
                        </span>
                      </div>

                      <div onClick={(e) => e.stopPropagation()} className="relative group">
                        <button onClick={() => {
                          dispatch(addToCart(p))
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
}
export default Search;