import React, { useState } from 'react';
import "./Signup.css";
import Layout from '../Layout/Layout.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
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
    
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!address) {
      newErrors.address = "Address is required";
    } else if (address.length < 10) {
      newErrors.address = "Please enter a complete address";
    }
    
    if (!answer) {
      newErrors.answer = "Security answer is required";
    } else if (answer.length < 2) {
      newErrors.answer = "Security answer must be at least 2 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes and clear errors
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (errors.address) {
      setErrors(prev => ({ ...prev, address: '' }));
    }
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    if (errors.answer) {
      setErrors(prev => ({ ...prev, answer: '' }));
    }
  };

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/Register`, {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Sign Up - ToeFit"}>
      <div className="signup-page">
        <div className="form-container">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Join ToeFit and start your shopping journey</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your full name"
                disabled={loading}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email address"
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
                  className={errors.password ? 'error' : ''}
                  placeholder="Create a strong password"
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

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter your phone number"
                disabled={loading}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={handleAddressChange}
                className={errors.address ? 'error' : ''}
                placeholder="Enter your complete address"
                disabled={loading}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="answer">Security Question</label>
              <input
                type="text"
                id="answer"
                value={answer}
                onChange={handleAnswerChange}
                className={errors.answer ? 'error' : ''}
                placeholder="What is your favorite sport?"
                disabled={loading}
              />
              {errors.answer && <span className="error-message">{errors.answer}</span>}
            </div>

            <button
              type="submit"
              className={`form-button ${loading ? 'loading-button' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Create Account'}
            </button>
          </form>

          <div className="form-footer">
            <p>Already have an account?</p>
            <button
              type="button"
              className="login-link"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
