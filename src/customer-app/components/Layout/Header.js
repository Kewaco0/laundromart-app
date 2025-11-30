import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand">
          <span className="brand-icon">🧺</span>
          <h1>LaundryPro</h1>
        </div>
        <div className="user-menu">
          <div className="user-info">
            <span className="user-name">Hello, {user?.name || user?.email}</span>
            <span className="user-role">{user?.role || 'Customer'}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;