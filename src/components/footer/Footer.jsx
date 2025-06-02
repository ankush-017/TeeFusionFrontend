import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-6 shadow-inner">
      <h1 className="text-center text-xl font-semibold">© 2025 TeeFusion. All Rights Reserved.</h1>
      <p className="mt-3 flex flex-wrap justify-center items-center space-x-4 text-[16px] md:text-[18px]">
        <Link
          to="/about"
          className="hover:underline hover:text-blue-100 transition duration-200"
        >
          About
        </Link>
        <span>|</span>
        <Link
          to="/contact"
          className="hover:underline hover:text-blue-100 transition duration-200"
        >
          Contact
        </Link>
        <span>|</span>
        <Link
          to="/privacy"
          className="hover:underline hover:text-blue-100 transition duration-200"
        >
          Privacy Policy
        </Link>
      </p>
    </footer>
  );
}
export default Footer;