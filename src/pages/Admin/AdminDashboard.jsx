import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect} from 'react';

const AdminDashboard = () => {
  const location = useLocation();
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const resizerRef = useRef(null);
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const isDefaultProfile = location.pathname === '/dashboard/admin';

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Sidebar */}
      <div
        className="bg-white shadow-lg hidden md:flex flex-col p-5 transition-all duration-200 ease-in-out"
        style={{ width: sidebarWidth }}
      >
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-6 text-center shadow">
          Admin Panel
        </h1>

        <nav className="space-y-2">
          <NavLink
            to="create-category"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive || isDefaultProfile
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            Create Category
          </NavLink>

          <NavLink
            to="create-product"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            Create Product
          </NavLink>

          <NavLink
            to="product"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            Product
          </NavLink>

          <NavLink
            to="adminorder"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            📦 Orders
          </NavLink>
          <NavLink
            to="user"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
              }`
            }
          >
            👤 Users
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
      <div className="flex-1 p-6 bg-white shadow-inner rounded-l-2xl">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;