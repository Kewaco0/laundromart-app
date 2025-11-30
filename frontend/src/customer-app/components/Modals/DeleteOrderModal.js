import React from 'react';

const DeleteOrderModal = ({ order, onDeleteOrder, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>🗑️ Delete Order</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="delete-warning">
            <h4>Delete Order #{order?.id}?</h4>
            <p><strong>{order?.service_type}</strong> • {order?.weight}kg • ${order?.price}</p>
            <p>Status: <span className={`order-status status-${order?.status?.toLowerCase()}`}>{order?.status}</span></p>
            
            <p className="warning-text">
              This will permanently remove this order from your history.
            </p>
            <p className="warning-text"><strong>This action cannot be undone.</strong></p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Keep Order
          </button>
          <button onClick={onDeleteOrder} className="btn-danger">
            Yes, Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderModal;