import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    
      <div>
      <header>
        <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
          <div className="container">
            <ul>
            <Link to="/" className="navbar-brand">Home</Link>
            <Link to="/allproducts" className="navbar-brand">All Products</Link>
            <Link to="/stock" className='navbar-brand'>Stocks</Link>
            </ul>
          </div>
          



        </nav> 
      </header>
      <main>
         <div className='container mt-3'>
          {children}
         </div>
      <ToastContainer/>
      </main>
    </div>
    
  )
}

export default MainLayout

