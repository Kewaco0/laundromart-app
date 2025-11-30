import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders] = useState([
    { id: 1, customerName: 'John Doe', serviceType: 'Wash & Dry', status: 'Processing', weight: 5, totalPrice: 25 },
    { id: 2, customerName: 'Jane Smith', serviceType: 'Wash Only', status: 'Pending', weight: 3, totalPrice: 15 },
    { id: 3, customerName: 'Mike Johnson', serviceType: 'Full Service', status: 'Ready for Pickup', weight: 8, totalPrice: 40 }
  ]);

  return (
    <div className="order-management">
      <div className="section-header">
        <h2>Order Management</h2>
      </div>
      
      <div className="orders-grid">
        {orders.map(order => (
          <div key={order.id} className="order-card staff-order-card">
            <div className="order-header">
              <span className="order-id">#{order.id}</span>
              <span className={`order-status status-${order.status.toLowerCase().replace(' ', '-')}`}>
                {order.status}
              </span>
            </div>
            
            <div className="order-details">
              <div className="customer-info">
                <strong>{order.customerName}</strong>
              </div>
              
              <div className="service-info">
                <span className="service-type">{order.serviceType}</span>
                <span className="service-weight">{order.weight} kg</span>
                <span className="service-price">${order.totalPrice}</span>
              </div>
            </div>
            
            <div className="order-actions-staff">
              <button className="btn-primary">Update Status</button>
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;