import React from 'react';

const OrderCard = ({ 
  order, 
  onPay, 
  onTrack, 
  onEdit, 
  onCancel, 
  onDelete 
}) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-id">Order #{order.id}</span>
        <span className={`order-status status-${order.status?.toLowerCase()}`}>
          {order.status}
        </span>
      </div>
      <div className="order-body">
        <div className="service-info">
          <span className="service-type">{order.service_type}</span>
          <span className="service-weight">{order.weight} kg</span>
        </div>
        <div className="order-price">${order.price}</div>
      </div>
      <div className="order-actions">
        <button 
          onClick={() => onPay(order)} 
          className="pay-btn"
          disabled={order.status === 'Paid' || order.status === 'Completed' || order.status === 'Cancelled'}
        >
          {order.status === 'Paid' ? 'Paid' : '💳 Pay'}
        </button>
        <button 
          className="track-btn"
          onClick={() => onTrack(order)}
        >
          📍 Track
        </button>
        <button 
          className="edit-btn"
          onClick={() => onEdit(order)}
          disabled={order.status === 'Completed' || order.status === 'Cancelled' || order.status === 'Paid'}
        >
          ✏️ Edit
        </button>
        <button 
          className="cancel-btn"
          onClick={() => onCancel(order)}
          disabled={order.status === 'Completed' || order.status === 'Cancelled'}
        >
          ❌ Cancel
        </button>
        <button 
          className="delete-btn"
          onClick={() => onDelete(order)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default OrderCard;