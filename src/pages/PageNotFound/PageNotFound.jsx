import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PageNotFound() {

  const isDark = useSelector((state)=> state.Theme.dark);

  return (
    <>
      <div className={`h-[80vh] flex justify-center items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'} `}>
        <div className="flex flex-col items-center justify-center  text-center px-4">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className=" mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFound;