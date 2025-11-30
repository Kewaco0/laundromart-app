import React from 'react';

const DashboardStats = ({ orders }) => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">🧺</div>
        <div className="stat-info">
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon pending">⏳</div>
        <div className="stat-info">
          <h3>{pendingOrders}</h3>
          <p>Pending</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon completed">✅</div>
        <div className="stat-info">
          <h3>{completedOrders}</h3>
          <p>Completed</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon revenue">💰</div>
        <div className="stat-info">
          <h3>${totalSpent}</h3>
          <p>Total Spent</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;