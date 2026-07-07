import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { toast } from 'react-toastify';
import SearchInput from '../SearchInput';
import { Badge } from 'antd';
import { BsMenuButtonWide, BsBagHeart, BsCart3 } from "react-icons/bs";
import { MdDarkMode, MdLightMode, MdClose, MdAccountCircle, MdDashboard } from "react-icons/md";
import { toggleTheme } from '../../slice/darkTheme';

const Header = () => {
  const isDark = useSelector((state) => state.Theme.dark);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const cartItem = useSelector((state) => state.cart.cartItem);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarOpen && !e.target.closest('#mobile-sidebar') && !e.target.closest('#menu-button')) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully');
    navigate('/login');
    setIsOpen(false);
  };

  const SidebarLink = ({ to, icon, label, onClick, isDark, badge }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors
      ${isDark
          ? 'text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400'
          : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'}`}
    >
      <span className={isDark ? 'text-zinc-500' : 'text-slate-400'}>{icon}</span>
      <span className="flex-1">{label}</span>
      {badge > 0 && (
        <span className="bg-blue-600 dark:bg-yellow-400 text-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );

  const activeLink = "text-blue-700 dark:text-yellow-400 font-bold border-b-4 border-yellow-400 pb-1 transition-all";
  const normalLink = "text-slate-500 dark:text-slate-400 hover:text-blue-800 dark:hover:text-yellow-400 transition-all duration-200 pb-1";

  return (
    <>
      <nav className={`sticky top-0 z-50 px-4 md:px-10 py-4 transition-all duration-500 border-b-2
        ${isDark
          ? 'bg-zinc-900 border-yellow-400/20 text-white shadow-2xl'
          : 'bg-white border-blue-800/10 text-slate-900 shadow-lg'}`}>

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

          {/* LOGO - Streetwear Style */}
          <Link to="/" className="flex items-center space-x-0.5">
            <span className={`text-3xl font-black tracking-tight px-2 rounded ${isDark ? 'bg-yellow-400 text-black' : 'bg-blue-800 text-white'}`}>
              TEE
            </span>
            <span className={`text-3xl font-black tracking-tight italic ${isDark ? 'text-blue-800' : 'text-yellow-500 '}`}>
              FUSION
            </span>
          </Link>

          {/* SEARCHBAR - Centered & Rounded */}
          <div className="hidden md:block flex-1 max-w-lg">
            <div className="relative group">
              <SearchInput />
              <div className="absolute inset-0 rounded-lg group-focus-within:ring-2 ring-yellow-400 pointer-events-none transition-all"></div>
            </div>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-4">

            {/* Desktop Navigation Links */}
            <ul className="hidden xl:flex items-center gap-8 text-sm font-black uppercase tracking-widest">
              <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Shop</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About</NavLink></li>
              <li>
                <NavLink to="/cart" className={({ isActive }) => isActive ? activeLink : normalLink}>
                  <div className="flex items-center gap-2">
                    <Badge count={cartItem.length} size="small" offset={[2, 0]} color="#1e3a8a">
                      <BsBagHeart size={22} className={isDark ? 'text-yellow-400' : 'text-blue-800'} />
                    </Badge>
                    <span>Cart</span>
                  </div>
                </NavLink>
              </li>
            </ul>

            <div className={`flex items-center gap-2 md:gap-4 pl-4 border-l transition-colors duration-300 ${isDark ? 'border-zinc-700' : 'border-blue-100'}`}>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`p-2 rounded-lg transition-all ${isDark ? 'bg-zinc-800 text-yellow-400' : 'bg-slate-100 text-blue-800'}`}
              >
                {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
              </button>

              {/* Profile / Auth Section */}
              {isAuthenticated ? (
                <div className="relative md:block hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-3 px-1 py-1 rounded-full shadow-md border transition-all duration-200 hover:scale-105 ${isDark
                      ? "bg-zinc-800 border-yellow-400 text-white hover:bg-zinc-700"
                      : "bg-white border-blue-700 text-gray-800 hover:bg-blue-50"
                      }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isDark
                        ? "bg-yellow-400 text-black"
                        : "bg-blue-700 text-white"
                        }`}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Welcome Text */}
                    <span
                      className={`hidden sm:block text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      Welcome, {user?.name?.split(" ")[0]}
                    </span>

                    {/* Arrow */}
                    <svg
                      className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""
                        } ${isDark ? "text-yellow-400" : "text-blue-700"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div
                      className={`absolute right-0 mt-4 w-52 rounded-2xl shadow-2xl border-2 overflow-hidden z-50 ${isDark
                        ? "bg-zinc-800 border-yellow-400"
                        : "bg-white border-blue-800"
                        }`}
                    >
                      <Link
                        to={user.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition ${isDark
                          ? "bg-zinc-700 text-white hover:bg-zinc-600"
                          : "bg-yellow-50 text-black hover:bg-yellow-400/10"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <MdAccountCircle size={18} />
                        My Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-3 text-sm font-bold transition border-t ${isDark
                          ? "text-red-400 border-zinc-700 hover:bg-zinc-700"
                          : "text-red-600 border-gray-200 hover:bg-red-50"
                          }`}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-6 py-2.5 rounded-lg bg-blue-800 dark:bg-yellow-400 text-white dark:text-black text-xs font-black uppercase tracking-tighter hover:scale-105 transition active:scale-95 shadow-[4px_4px_0px_0px_rgba(253,224,71,1)] dark:shadow-[4px_4px_0px_0px_rgba(30,58,138,1)]">
                  Join Now
                </Link>
              )}

              {/* Burger Menu for Mobile */}
              <button
                id="menu-button"
                onClick={() => setSidebarOpen(true)}
                className="xl:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
              >
                <BsMenuButtonWide
                  size={26}
                  className={isDark ? "text-yellow-400" : "text-blue-800"}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden mt-4">
          <SearchInput />
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-full w-[280px] z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl
    ${isDark ? 'bg-zinc-900' : 'bg-white'}
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Professional Header - Dark Blue (Light Mode) or Zinc (Dark Mode) */}
        <div className={`flex items-center gap-3 p-4 ${isDark ? 'bg-zinc-800 text-white' : 'bg-blue-600 text-white'}`}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MdAccountCircle size={28} />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-80">Welcome,</p>
            <p className="text-sm font-bold uppercase tracking-wide">
              {isAuthenticated ? user?.name : 'Guest User'}
            </p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="hover:rotate-90 transition-transform">
            <MdClose size={24} />
          </button>
        </div>

        <nav className="flex flex-col py-2">
          {/* Navigation Items */}
          <SidebarLink
            to="/"
            icon={<BsBagHeart size={20} />}
            label="Shop"
            onClick={() => setSidebarOpen(false)}
            isDark={isDark}
          />
          <SidebarLink
            to="/cart"
            icon={<BsCart3 size={20} />}
            label="My Cart"
            badge={cartItem.length}
            onClick={() => setSidebarOpen(false)}
            isDark={isDark}
          />
          <SidebarLink
            to="/about"
            icon={<MdAccountCircle size={20} />}
            label="About & Privacy"
            onClick={() => setSidebarOpen(false)}
            isDark={isDark}
          />

          <div className="h-[1px] bg-slate-100 dark:bg-zinc-800 my-2 mx-4" />

          {/* Account Section */}
          <p className="px-6 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Account</p>

          {isAuthenticated ? (
            <>
              <SidebarLink
                to="/dashboard/user"
                icon={<MdDashboard size={20} />}
                label="Dashboard"
                onClick={() => setSidebarOpen(false)}
                isDark={isDark}
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className="mx-6 my-2 py-2.5 bg-blue-600 dark:bg-yellow-400 text-white dark:text-black text-center text-sm font-bold rounded-sm shadow-sm"
            >
              Sign In / Join Now
            </Link>
          )}
        </nav>
      </div>

      {/* BLUR OVERLAY */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] transition-all" />
      )}
    </>
  );
};

export default Header;