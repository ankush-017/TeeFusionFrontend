import React, { useEffect,useState } from 'react'
// import API from '../API';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function About() {

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // useEffect(() => {
  //   API.get('/about') // <- Axios sends JWT token with request
  //     .then((res) => setMessage(res.data.message))
  //     .catch(() => navigate('/login')); // if token invalid
  // }, [navigate]);


  return (
    <>
      <div className='min-h-[80vh] flex justify-center items-center'>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">About TeeFusion</h1>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed text-center">
            At <span className="text-blue-500 font-semibold">TeeFusion</span>, we’re not just selling T-shirts —
            we’re building a culture. We’re the voice of the Gen-Z generation. Our mission is to create wearable art that
            speaks your vibe, matches your mood, and makes you stand out in the crowd.
          </p>
          <p className="text-md text-gray-600 mb-6 leading-relaxed text-center">
            Every TeeFusion T-shirt is crafted with premium quality, bold graphics, and
            Gen-Z attitude — whether you're into streetwear, anime, sarcasm, or trends fresh off the internet.
            We design what you feel. Trendy, fearless, and 100% original.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-around mt-10 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">What We Stand For</h2>
              <p className="text-[16px] font-tino text-gray-600">
                Creativity, expression, comfort, and boldness. We celebrate individuality and aim to empower youth through style.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
              <h2 className="text-2xl font-semibold text-blue-500 mb-2">Why TeeFusion?</h2>
              <p className="text-[16px] font-tino text-gray-600">
                We vibe with your aesthetic. Our designs are limited, our quality is elite, and our tees are always on point.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default About;