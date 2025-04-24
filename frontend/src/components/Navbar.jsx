import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    toast("See you soon!", {
      position: "bottom-left",  
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
      icon: "👋",
      style: {
        textAlign: 'center',          
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: '#f4f1eb',
        color: '#4b3a33',
        borderRadius: '12px',
        padding: '12px 20px',
        maxWidth: '240px',
        margin: '0 auto',             
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'center',
      }
    });

    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const navButtonClass = "text-white text-lg font-semibold px-4 py-2 rounded-xl hover:bg-[#6a4e3b] transition-all duration-300 decoration-none";

  return (
    <>
      <nav className="bg-[#4b3a33] p-6 rounded-3xl shadow-xl w-full max-w-5xl mx-auto mt-8 transition-transform transform hover:scale-[1.02]">
        <div className="flex justify-center items-center space-x-6">
          <Link to="/" className={navButtonClass}>Home</Link>

          {isLoggedIn && (
            <>
              <Link to="/profile" className={navButtonClass}>Profile</Link>
              <Link to="/books/create" className={navButtonClass}>Add Book</Link>
            </>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className={navButtonClass}>
              Logout
            </button>
          ) : (
            <Link to="/login" className={navButtonClass}>Login</Link>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
