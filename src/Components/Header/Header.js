import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./../../Assets/logos/logo.png";
import cartlogo from "./../../Assets/icons/shopping-cart.png";
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/Auth.js";
import toast from "react-hot-toast";
import { useCart } from "../../Context/CartProvider.js";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ''
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle Escape key press and body scroll
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="ToeFit Logo" />
        </Link>
      </div>
      
      <div className="nav">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarNavDropdown"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div 
              className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
              id="navbarNavDropdown"
              onClick={(e) => {
                // Close menu when clicking on the backdrop overlay
                if (e.target === e.currentTarget) {
                  closeMenu();
                }
              }}
            >
              <button
                className="mobile-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ×
              </button>
              
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ladies" onClick={closeMenu}>
                    Ladies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/men" onClick={closeMenu}>
                    Men
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/kids" onClick={closeMenu}>
                    Kids
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeMenu}>
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="others">
        <div className="navlogos">
          <div className="user-reg">
            {!auth.user ? (
              <Link to="/login">
                <button>Login</button>
              </Link>
            ) : (
              <li style={{ listStyleType: 'none' }} className="nav-item dropdown">
                <Link 
                  className="nav-link dropdown-toggle" 
                  to="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </Link>
                <ul style={{ listStyleType: 'none' }} className="dropdown-menu">
                  <li>
                    <Link 
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} 
                      className="dropdown-item"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      onClick={handleLogout} 
                      className="dropdown-item" 
                      to="/login"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </div>
          
          <div className="cart">
            <Link to="/cart">
              <img src={cartlogo} alt="Shopping Cart" />
            </Link>
            {cart?.length > 0 && (
              <div className="cart-count">{cart.length}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
