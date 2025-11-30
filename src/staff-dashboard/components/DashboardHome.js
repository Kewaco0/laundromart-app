import React from 'react';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="welcome-banner">
        <h2>Staff Dashboard 👋</h2>
        <p>Welcome to the staff management portal</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📋</div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Active Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <h3>5</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">✅</div>
          <div className="stat-info">
            <h3>7</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>$245</h3>
            <p>Today's Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;