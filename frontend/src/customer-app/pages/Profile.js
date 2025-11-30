import React from 'react';

const Profile = ({ user, orders }) => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);

  return (
    <div className="profile-page">
      <div className="section-header">
        <h2>My Profile</h2>
        <p>Manage your account information</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            <h3>{user?.name || 'User'}</h3>
            <p>{user?.email}</p>
            <span className="user-badge">{user?.role || 'Customer'}</span>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-value">{totalOrders}</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">${totalSpent}</span>
            <span className="stat-label">Total Spent</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">{completedOrders}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-btn">Edit Profile</button>
          <button className="profile-btn">Change Password</button>
          <button className="profile-btn">Notification Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;