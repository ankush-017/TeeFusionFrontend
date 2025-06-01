import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setKeyword, setResult, clearSearch } from '../slice/searchSlice';
import axios from 'axios';

function SearchInput() {
    
    const keyword = useSelector(state => state.search.keyword);
    const results = useSelector(state => state.search.results);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.get(`${import.meta.env.VITE_API}/product/search/${encodeURIComponent(keyword)}`);
            dispatch(setResult(res.data.data));
            dispatch(setKeyword(""));
            navigate('/Search');
        }
        catch(e){
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full">
            <div className="relative">
                {/* Search Icon */}
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <FiSearch className="w-5 h-5" />
                </span>

                {/* Input Field */}
                <input
                    type="search"
                    value={keyword}
                    onChange={(e) => {
                        dispatch(setKeyword(e.target.value));
                    }}
                    placeholder="Search products ..."
                    className="md:w-[360px] w-[320px] pl-14  py-3 rounded-full border border-gray-300 bg-white text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-blue-600 hover:bg-blue-700 
                     text-white text-sm font-semibold transition duration-150 shadow"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
export default SearchInput;