// AdminPrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  
  try {
    const decoded = jwt_decode(token);
    return decoded.role === 'admin' ? children : <Navigate to="/unauthorized" />;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};
export default AdminPrivateRoute;