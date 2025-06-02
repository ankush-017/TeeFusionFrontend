import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Privacy from './pages/Privacy/Privacy.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Cart from './pages/Cart/Cart.jsx';
import ForgotPassword from './pages/Login/ForgotPassword.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import Profile from './pages/UserDashboard/Profile.jsx';
import Orders from './pages/UserDashboard/Orders.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import User from './pages/Admin/User.jsx';
import Product from './pages/Admin/Product.jsx';
import UpdateProduct from './pages/Admin/UpdateProduct.jsx';
import Search from './pages/Search/Search.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import UserPanelHome from './pages/UserDashboard/UserPanelHome.jsx';
import OrdersAdmin from './pages/Admin/OrdersAdmin.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/Search' element={<Search />} />
      <Route path='/product-detail/:slug' element={<ProductDetail />} />
      <Route path='forgotpassword' element={<ForgotPassword />} />
      <Route path='/cart' element={<Cart />}></Route>

      {/* Private route implementation  */}
      <Route path="contact" element={<ProtectedRoute> <Contact /> </ProtectedRoute>} />
      <Route path="dashboard/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}>
        <Route index element={<UserPanelHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="dashboard/admin" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} >
        <Route index element={<CreateCategory />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:slug" element={<UpdateProduct />} />
        <Route path="user" element={<User />} />
        <Route path="adminorder" element={<OrdersAdmin />} />
      </Route>

      <Route path='privacy' element={<Privacy />} />
      <Route path='about' element={<About />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)