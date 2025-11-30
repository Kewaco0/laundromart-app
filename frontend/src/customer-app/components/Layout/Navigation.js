import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'new-order', label: '🧺 New Order', icon: '🧺' },
    { id: 'orders', label: '📋 My Orders', icon: '📋' },
    { id: 'profile', label: '👤 Profile', icon: '👤' }
  ];

  return (
    <nav className="app-nav">
      <div className="nav-content">
        {navItems.map(item => (
          <button 
            key={item.id}
            className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;