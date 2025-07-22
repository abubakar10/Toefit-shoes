import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminMenu.css';

const AdminMenu = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard/admin',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/dashboard/admin/create-category',
      label: 'Create Category',
      icon: '🏷️'
    },
    {
      path: '/dashboard/admin/create-product',
      label: 'Create Product',
      icon: '➕'
    },
    {
      path: '/dashboard/admin/products',
      label: 'All Products',
      icon: '📦'
    },
    {
      path: '/dashboard/admin/users',
      label: 'Manage Users',
      icon: '👥'
    }
  ];

  return (
    <div className="admin-menu">
      <div className="menu-header">
        <h3>🛡️ Admin Panel</h3>
        <p>Navigation</p>
      </div>
      
      <nav className="menu-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="menu-footer">
        <div className="admin-badge">
          <span className="badge-icon">⭐</span>
          <div className="badge-text">
            <p>Administrator</p>
            <small>Full Access</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
