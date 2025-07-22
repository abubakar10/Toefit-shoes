import React from 'react';
import Layout from '../Layout/Layout.js';
import AdminMenu from "./AdminMenu.js";
import { useAuth } from '../../Context/Auth.js';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard - ToeFit">
      <div className="admin-dashboard">
        <div className="admin-container">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {auth?.user?.name}! Manage your ToeFit store from here.</p>
          </div>

          <div className="dashboard-content">
            <div className="admin-sidebar">
              <AdminMenu />
            </div>

            <div className="admin-main">
              <div className="welcome-section">
                <div className="welcome-card">
                  <div className="welcome-header">
                    <h2>👋 Welcome to Your Dashboard</h2>
                    <p>Here's an overview of your admin profile</p>
                  </div>

                  <div className="admin-info">
                    <div className="info-item">
                      <div className="info-icon">👤</div>
                      <div className="info-details">
                        <h3>Admin Name</h3>
                        <p>{auth?.user?.name}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">📧</div>
                      <div className="info-details">
                        <h3>Email Address</h3>
                        <p>{auth?.user?.email}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">📞</div>
                      <div className="info-details">
                        <h3>Contact Number</h3>
                        <p>{auth?.user?.phone || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon">🛡️</div>
                      <div className="info-details">
                        <h3>Role</h3>
                        <p>Administrator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quick-stats">
                <h3>Quick Overview</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                      <h4>Products</h4>
                      <p>Manage inventory</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                      <h4>Categories</h4>
                      <p>Organize products</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <h4>Users</h4>
                      <p>Manage customers</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <h4>Analytics</h4>
                      <p>View insights</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    className="action-btn primary"
                    onClick={() => window.location.href = '/dashboard/admin/create-product'}
                  >
                    ➕ Add New Product
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => window.location.href = '/dashboard/admin/create-category'}
                  >
                    🏷️ Create Category
                  </button>
                  <button 
                    className="action-btn outline"
                    onClick={() => window.location.href = '/dashboard/admin/products'}
                  >
                    📋 View All Products
                  </button>
                  <button 
                    className="action-btn outline"
                    onClick={() => window.location.href = '/dashboard/admin/users'}
                  >
                    👥 Manage Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
