import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setKeyword, setResult } from '../slice/searchSlice';
import axios from 'axios';

function SearchInput() {
    const keyword = useSelector(state => state.search.keyword);
    const isDark = useSelector((state) => state.Theme.dark);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!keyword) return;
        try {
            const res = await axios.get(`${import.meta.env.VITE_API}/product/search/${encodeURIComponent(keyword)}`);
            dispatch(setResult(res.data.data));
            dispatch(setKeyword(""));
            navigate('/Search');
        } catch(e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full">
            <div className="relative group flex items-center">
                <input
                    type="search"
                    value={keyword}
                    onChange={(e) => dispatch(setKeyword(e.target.value))}
                    placeholder="Search for products, brands and more"
                    className={`w-full pl-4 pr-12 py-2 rounded-sm border-none transition-all text-sm outline-none shadow-sm
                        ${isDark 
                            ? 'bg-zinc-800 text-white placeholder-zinc-500' 
                            : 'bg-white text-slate-900 placeholder-slate-400'}`}
                />
                <button
                    type="submit"
                    className={`absolute right-0 h-full px-4 rounded-r-sm transition-colors
                                ${isDark ? 'text-yellow-400 hover:bg-zinc-700' : 'text-blue-600 hover:bg-slate-50'}`}
                >
                    <FiSearch className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
}
export default SearchInput;