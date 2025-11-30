import React from 'react';
import DashboardStats from '../components/Dashboard/DashboardStats';

const Dashboard = ({ orders, onTabChange, onRefreshOrders }) => {
  return (
    <div className="dashboard">
      <div className="welcome-banner">
        <h2>Welcome back! 👋</h2>
        <p>Here's your laundry overview</p>
      </div>

      <DashboardStats orders={orders} />

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn primary"
            onClick={() => onTabChange('new-order')}
          >
            🧺 Create New Order
          </button>
          <button 
            className="action-btn secondary"
            onClick={onRefreshOrders}
          >
            📋 Refresh Orders
          </button>
        </div>
      </div>

      <div className="recent-orders">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button onClick={() => onTabChange('orders')} className="view-all-btn">
            View All →
          </button>
        </div>
        {orders.slice(0, 3).map(order => (
          <div key={order.id} className="order-item">
            <div className="order-main">
              <span className="order-service">{order.service_type}</span>
              <span className="order-weight">{order.weight}kg</span>
              <span className="order-price">${order.price}</span>
            </div>
            <div className="order-meta">
              <span className={`order-status status-${order.status?.toLowerCase()}`}>
                {order.status}
              </span>
              <span className="order-date">#{order.id}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="empty-state">
            <p>No orders yet</p>
            <p>Create your first laundry order to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;