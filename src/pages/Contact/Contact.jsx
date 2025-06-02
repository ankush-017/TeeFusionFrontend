import React from 'react';
import { IoMdMailOpen } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuMapPinCheck } from "react-icons/lu";
import { useSelector } from 'react-redux';

function Contact() {

  const isDark = useSelector((state) => state.Theme.dark);

  return (
    <div className={`min-h-[80vh] flex justify-center items-center  ${isDark ? 'bg-[#202133] text-white' : 'bg-gradient-to-r from-indigo-50 to-blue-50 text-black'} px-4`}>
      <div className={`max-w-xl w-full ${isDark ? 'bg-black text-white shadow-[0_4px_10px_rgba(255,255,255,0.5)]' : 'bg-white text-black shadow-[0_4px_10px_rgba(0,0,0,0.5)]'} rounded-2xl p-8 text-center`}>
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">Get in Touch</h1>

        <p className="mb-6">
          Feel free to reach out to us for any queries or collaboration. We'd love to hear from you!
        </p>

        <div className="space-y-6 text-left">
          <div className="flex items-center gap-4">
            <FaPhoneVolume className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">8076131983</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <IoMdMailOpen className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">ak4001493@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LuMapPinCheck className="text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;