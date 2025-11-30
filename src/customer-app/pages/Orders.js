import React, { useState } from 'react';
import OrderCard from '../components/Orders/OrderCard';

const Orders = ({ 
  orders, 
  filterStatus, 
  onFilterChange, 
  onRefreshOrders,
  onPay,
  onTrack,
  onEdit,
  onCancel,
  onDelete 
}) => {
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="orders-page">
      <div className="section-header">
        <h2>My Orders</h2>
        <div className="header-actions">
          <select 
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Paid">Paid</option>
          </select>
          <button onClick={onRefreshOrders} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="orders-list">
        {filteredOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onPay={onPay}
            onTrack={onTrack}
            onEdit={onEdit}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        ))}
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <p>No orders found</p>
            <p>Create your first order to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;