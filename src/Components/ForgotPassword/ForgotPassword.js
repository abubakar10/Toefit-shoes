import React, { useState } from 'react';
import Layout from '../Layout/Layout.js';
import './ForgotPassword.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8080';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!answer) {
      newErrors.answer = 'Security answer is required';
    } else if (answer.length < 2) {
      newErrors.answer = 'Security answer must be at least 2 characters';
    }
    
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes and clear errors
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    if (errors.answer) {
      setErrors(prev => ({ ...prev, answer: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: '' }));
    }
  };

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer
      });
      
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Password reset failed');
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
    <Layout title={'Reset Password - ToeFit'}>
      <div className="forgot-password-page">
        <div className="form-container">
          <div className="form-header">
            <h2>Reset Password</h2>
            <p>Enter your details to reset your password</p>
          </div>

          <div className="security-notice">
            <div className="icon">🔒</div>
            <div className="text">
              For your security, we need to verify your identity. Please provide your email and security answer.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="forgot-password-form">
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

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className={errors.newPassword ? 'error' : ''}
                  placeholder="Enter your new password"
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
              {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
            </div>

            <button
              type="submit"
              className={`form-button ${loading ? 'loading-button' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Reset Password'}
            </button>
          </form>

          <div className="form-footer">
            <p>Remember your password?</p>
            <button
              type="button"
              className="back-to-login-link"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
