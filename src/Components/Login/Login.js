import React, { useState } from 'react';
import "./login.css";
import Layout from '../Layout/Layout.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../Context/Auth.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(`${process.env.REACT_APP_API || 'http://localhost:8080'}/api/v1/auth/login`, {
        email,
        password
      });

      if (res && res.data.success) {
        toast.success(res.data.message || 'Login successful!', {
          style: {
            background: '#4ade80',
            color: '#fff',
          },
          icon: '✅',
        });

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });

        localStorage.setItem('auth', JSON.stringify(res.data));
        
        // Redirect based on user role
        const redirectPath = location.state || (res.data.user?.role === 1 ? '/dashboard/admin' : '/');
        navigate(redirectPath);

      } else {
        toast.error(res.data.message || 'Login failed');
      }

    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  return (
    <Layout title="Login - ToeFit">
      <div className="login-page">
        <div className="form-container">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your ToeFit account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={errors.email ? 'error' : ''}
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className={`form-button ${loading ? 'loading-button' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Sign In'}
            </button>

            <div className="form-actions">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => navigate('/forgot-password')}
                disabled={loading}
              >
                Forgot your password?
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="signup-link"
              onClick={() => navigate('/signup')}
              disabled={loading}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
