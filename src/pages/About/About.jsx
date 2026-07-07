import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function About() {
  const isDark = useSelector((state) => state.Theme.dark);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>

      {/* Background Subtle Gradient */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-10 md:py-16 w-full">

        {/* --- Hero Section --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 border ${isDark ? 'bg-blue-900/20 text-blue-300 border-blue-900/50' : 'bg-white text-blue-700 border-blue-100 shadow-sm'}`}>
            <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
            Established 2024
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            Redefining <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Streetwear.</span>
          </h1>

          <p
            className={`max-w-2xl text-base md:text-lg leading-relaxed mb-8 text-balance ${isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
          >
            At{" "}
            <span
              className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"
                }`}
            >
              TeeFusion
            </span>
            , we’re not just selling T-shirts — we’re building a culture. We are the
            voice of a new generation, creating wearable art that speaks your vibe.
          </p>

          <button
            onClick={() => navigate('/')}
            className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/40 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-[#09090b]"
          >
            Explore the Collection
          </button>
        </div>

        {/* --- Mission & Image Split Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Image Container */}
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-xl group border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
            {/* Replace this src with your own brand image */}
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="TeeFusion Clothing Rack"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Trendy, fearless, and <br /> 100% original.
            </h2>

            <div className="w-12 h-1.5 rounded-full bg-yellow-400"></div>

            <p
              className={`text-base md:text-lg leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
            >
              Every piece is crafted with premium quality materials, bold custom graphics,
              and pure attitude — whether you're into heavy-set streetwear, minimalist
              anime aesthetics, pure sarcasm, or trends freshly scraped off the internet.
            </p>

            <p
              className={`text-base md:text-lg leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-900"
                }`}
            >
              We design what you feel. Our drops are strictly limited, our heavy-blend
              cotton quality is elite, and our fits are always perfectly oversized.
            </p>
          </div>
        </div>

        {/* --- Core Values Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {/* Card 1 */}
          <div
            className={`p-8 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 border ${isDark
              ? "bg-zinc-900/60 border-zinc-800 hover:border-blue-900/50"
              : "bg-white border-zinc-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              }`}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-yellow-400 flex items-center justify-center mb-5 shadow-md shadow-blue-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-2">
              What We Stand For
            </h3>

            <p
              className={`leading-relaxed text-base ${isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
            >
              Creativity, unhinged expression, elite comfort, and absolute boldness.
              We celebrate unapologetic individuality and aim to empower raw youth
              style.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className={`p-8 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 border ${isDark
              ? "bg-zinc-900/60 border-zinc-800 hover:border-yellow-600/30"
              : "bg-white border-zinc-200 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-900/5"
              }`}
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-400 text-blue-900 flex items-center justify-center mb-5 shadow-md shadow-yellow-400/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499c-.105-.21-.302-.35-.533-.35s-.428.14-.532.35L8.497 7.7l-4.743.689c-.23.033-.424.18-.49.405a.519.519 0 0 0 .126.516l3.431 3.344-.81 4.723c-.04.23.053.465.244.6a.517.517 0 0 0 .515.023L11 15.827l4.183 2.199a.516.516 0 0 0 .515-.023.518.518 0 0 0 .244-.6l-.81-4.722 3.431-3.344a.519.519 0 0 0 .127-.516.518.518 0 0 0-.491-.405l-4.743-.69L11.48 3.5Z"
                />
              </svg>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Why TeeFusion?
            </h3>

            <p
              className={`leading-relaxed text-base ${isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
            >
              We completely vibe with your aesthetic. Our product drops are strictly
              limited, our heavy-blend cotton quality is elite, and our fits are always
              perfectly on point.
            </p>
          </div>
        </div>

        {/* --- Stats Footer --- */}
        <div className={`py-10 rounded-[1.5rem] flex flex-wrap justify-center gap-12 md:gap-24 text-center border ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-lg shadow-zinc-200/40'}`}>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1">
              100<span className="text-yellow-500">%</span>
            </span>
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-zinc-500">Original Designs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1">
              Prem<span className="text-yellow-500">.</span>
            </span>
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-zinc-500">Cotton Blends</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-blue-600 mb-1">
              LTD<span className="text-yellow-500">.</span>
            </span>
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-zinc-500">Style Drops</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;