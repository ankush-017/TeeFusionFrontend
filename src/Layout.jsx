import React from 'react'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import { ToastContainer } from 'react-toastify';

function Layout() {
  return (
    <>
      <Header />
      <div>
        <ToastContainer />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
export default Layout;