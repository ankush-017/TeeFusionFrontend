import React, { useEffect } from 'react';
import privacyImg from '../../assets/Image/privacyImg.png'
import {useSelector} from 'react-redux';

function Privacy() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDark = useSelector((state)=> state.Theme.dark);

  return (
    <>
      <div className={`min-h-[80vh] flex justify-center items-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* LEFT: Privacy Policy Text */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-blue-600 mb-6">
                Privacy Policy
              </h1>

              <p className="mb-4 text-lg">
                At <span className="font-semibold">TeeFusion</span>, your privacy is our priority. This policy outlines how we collect, use, and protect your information.
              </p>

              <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">
                1. Information We Collect
              </h2>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Personal Info: name, email, and address.</li>
                <li>Order Details and Transactions.</li>
                <li>Website Interactions and preferences.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">
                2. How We Use It
              </h2>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>To deliver and improve our service.</li>
                <li>To provide customer support.</li>
                <li>To send promotional content if you opt-in.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">
                3. Your Rights
              </h2>
              <p className="mb-4">
                You can access, update, or delete your data by contacting us at
                <span className="text-blue-600 underline"> support@teefusion.com</span>.
              </p>

              <p className="text-sm mt-6">
                Last updated: April 2025
              </p>
            </div>

            {/* RIGHT: Image */}
            <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <img
                src={privacyImg}
                alt="Privacy Banner"
                className="w-full h-auto max-h-[400px] md:max-h-[500px] rounded-xl shadow-lg object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Privacy;