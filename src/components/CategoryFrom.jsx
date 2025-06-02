import React from "react";
import { useSelector } from "react-redux";

const CategoryForm = ({ handleSubmit, value, setValue }) => {

  const isDark = useSelector((state) => state.Theme.dark);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isDark ? 'bg-black text-white shadow-[0_2px_8px_rgba(255,255,255,0.5)]' : 'bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.5)]'} p-6 rounded-xl w-full mx-auto`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          className="w-full text-gray-800 sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;