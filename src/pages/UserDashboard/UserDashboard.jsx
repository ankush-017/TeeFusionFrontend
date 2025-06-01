import { NavLink, Outlet, Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const UserDashboard = () => {

  const [sidebarWidth, setSidebarWidth] = useState(280);
  const resizerRef = useRef(null);
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;
    if (newWidth >= 180 && newWidth <= 400) {
      setSidebarWidth(newWidth);
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div
        className="bg-white shadow-lg hidden md:flex flex-col p-5 transition-all duration-200 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <Link to='/dashboard/user' >
          <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg mb-6 text-center shadow">
            User Panel
          </h1>
        </Link>

        <nav className="space-y-2">
          <NavLink
            to="profile"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            👤 Profile
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            📦 Order
          </NavLink>
        </nav>
      </div>

      {/* Resizer */}
      <div
        ref={resizerRef}
        onMouseDown={startResizing}
        className="w-1 cursor-col-resize bg-blue-400 hover:bg-blue-600 transition"
      />

      {/* Main content */}
      <div className="flex-1 bg-white shadow-inner rounded-l-2xl">
        <Outlet />
      </div>
    </div>
  );
};
export default UserDashboard;