import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { toast } from 'react-toastify';
import SearchInput from '../SearchInput';
import { Badge } from 'antd';
import { BsMenuButtonWide } from "react-icons/bs";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(user?.name || '');

  const options = ['Dashboard', 'Logout'];

  const handleSelect = (option) => {
    setSidebarOpen(false);
    if (option === 'Dashboard') {
      navigate(`/dashboard/${user?.role === 1 ? 'admin' : 'user'}`);
    }
    else if (option === 'Logout') {
      dispatch(logout());
      toast.success('Logout Successfully');
      navigate('/login');
    }
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#mobile-sidebar') && !e.target.closest('#menu-button')) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [sidebarOpen]);

  useEffect(() => {
    setSelected(user?.name || '');
  }, [user]);

  return (
    <>
      <nav className="sticky top-0 z-50 flex md:flex-row flex-col justify-between items-center px-6 py-4 shadow-md bg-white rounded-b-xl">
        <div className="text-2xl font-bold flex flex-row justify-between w-full md:w-0 mb-2 text-blue-600">
          <div>
            <Link to="/" className='text-[28px]'>TeeFusion</Link>
          </div>

          <div className='flex lg:hidden flex-row gap-5 mt-1'>
            {/* Dark mode icon kept but non-functional per your request */}
            <div>
              {/* <MdDarkMode size={30} /> */}
            </div>

            {/* Menu button */}
            <div id="menu-button" onClick={() => setSidebarOpen(true)} className="cursor-pointer">
              <BsMenuButtonWide size={30} />
            </div>
          </div>
        </div>

        <div>
          <SearchInput />
        </div>

        <ul className="lg:flex hidden gap-6 mr-4 flex-wrap text-lg font-medium items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-500 transition duration-200'
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-500 transition duration-200'
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <Badge
              count={cartItem.length || 0}
              offset={[5, 0]}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                boxShadow: '0 0 0 1px white',
                fontWeight: 'bold',
              }}
            >
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `inline-block text-lg border-b-2 transition duration-200 ${isActive
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 border-transparent hover:text-blue-500'
                  }`
                }
              >
                Cart
              </NavLink>
            </Badge>
          </li>

          {isAuthenticated ? (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {user?.name || 'Profile'} ▼
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <a
                    href={user.role == 0 ? '/dashboard/user' : '/dashboard/admin'}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {
                      // Replace with your actual logout logic
                      dispatch(logout());
                      toast.success("Logout Successfully");
                      setIsOpen(false); // Close menu after action
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'hover:text-blue-500 transition duration-200'
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 space-y-4 text-lg font-medium">
          <NavLink
            to="/"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition duration-200'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                : 'hover:text-blue-500 transition duration-200'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 border-l-4 border-blue-600 pl-2 flex items-center gap-2'
                : 'hover:text-blue-500 transition duration-200 flex items-center gap-2'
            }
          >
            Cart
            <Badge
              count={cartItem.length || 0}
              style={{ backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold' }}
            />
          </NavLink>

          {isAuthenticated ? (
            <>
              {/* Dashboard with expandable submenu */}
              <div>
                <button
                  onClick={() => setDashboardOpen(prev => !prev)}
                  className="text-left w-full hover:text-blue-500 transition duration-200"
                >
                  Dashboard ▾
                </button>
                {dashboardOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 text-base">
                    <NavLink
                      to={`/dashboard/${user?.role === 1 ? 'admin' : 'user'}`}
                      onClick={() => setSidebarOpen(false)}
                      className="hover:text-blue-500"
                    >
                      User Panel
                    </NavLink>
                    <NavLink
                      to="/dashboard/user/profile"
                      onClick={() => setSidebarOpen(false)}
                      className="hover:text-blue-500"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard/orders"
                      onClick={() => setSidebarOpen(false)}
                      className="hover:text-blue-500"
                    >
                      Orders
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={() => handleSelect('Logout')}
                className="text-left text-red-600 hover:text-red-800 transition duration-200 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-l-4 border-blue-600 pl-2'
                  : 'hover:text-blue-500 transition duration-200'
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {/* Optional: Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Header;