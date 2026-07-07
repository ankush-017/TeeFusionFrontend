import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
  const isDark = useSelector((state) => state.Theme.dark);
  const currentYear = new Date().getFullYear();

  return (
    <div className={isDark ? "dark" : ""}>
      <footer className="relative bg-zinc-50 dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-500 font-sans overflow-hidden">
        
        {/* Blue & Yellow Dual-Tone Premium Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-yellow-400/80 opacity-70"></div>
        {/* Subtle secondary glow layer for depth */}
        <div className="absolute top-0 inset-x-1/4 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 dark:via-blue-500 to-transparent blur-[2px] opacity-50"></div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-8">
          
          {/* --- Main Footer Content --- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-8">
            
            {/* Brand & Mission (Left Side) */}
            <div className="md:col-span-5 lg:col-span-5">
              <Link to="/" className="inline-block text-3xl font-black tracking-tighter text-zinc-900 dark:text-white hover:opacity-80 transition-opacity mb-5">
                Tee<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Fusion.</span>
              </Link>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed text-sm md:text-base font-medium">
                Redefining streetwear for the modern generation. Wearable art that speaks your vibe, matches your mood, and makes you stand out.
              </p>
            </div>

            {/* Navigation Links Grid (Right Side) */}
            <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              {/* Column 1: Shop */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-5">Shop</h3>
                <ul className="space-y-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">New Arrivals</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Best Sellers</Link></li>
                  <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Collections</Link></li>
                </ul>
              </div>
              
              {/* Column 2: Company */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-5">Company</h3>
                <ul className="space-y-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Contact</Link></li>
                  {/* <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Careers</Link></li> */}
                </ul>
              </div>

              {/* Column 3: Legal */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-5">Support</h3>
                <ul className="space-y-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Privacy Policy</Link></li>
                  {/* <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">Terms of Service</Link></li> */}
                  <li><Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 hover:translate-x-1 inline-block transform transition-all duration-200">FAQ & Returns</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* --- Bottom Bar --- */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium">
              © {currentYear} TeeFusion. All Rights Reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {/* Instagram */}
              <a href="#" className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-transparent hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-yellow-500/30 dark:hover:bg-yellow-500/10 dark:hover:text-yellow-400 transition-all duration-300 group">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-transparent hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-yellow-500/30 dark:hover:bg-yellow-500/10 dark:hover:text-yellow-400 transition-all duration-300 group">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;