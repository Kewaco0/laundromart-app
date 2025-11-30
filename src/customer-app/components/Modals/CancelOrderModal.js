import React from 'react';

const CancelOrderModal = ({ order, onCancelOrder, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>❌ Cancel Order</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="cancel-warning">
            <h4>Are you sure you want to cancel this order?</h4>
            <p><strong>Order #{order?.id}</strong> - {order?.service_type} • {order?.weight}kg • ${order?.price}</p>
            <p className="warning-text">This action cannot be undone.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Keep Order
          </button>
          <button onClick={onCancelOrder} className="btn-danger">
            Yes, Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;