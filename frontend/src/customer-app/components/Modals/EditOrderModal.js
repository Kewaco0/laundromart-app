import React, { useState } from 'react';

const EditOrderModal = ({ order, onUpdateOrder, onClose }) => {
  const [editForm, setEditForm] = useState({
    service_type: order.service_type,
    weight: order.weight,
    price: order.price
  });

  const handleSubmit = () => {
    if (!editForm.weight || editForm.weight <= 0) {
      alert('Please enter a valid weight');
      return;
    }
    onUpdateOrder(editForm);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>✏️ Edit Order</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Service Type</label>
              <select 
                value={editForm.service_type} 
                onChange={e => setEditForm({...editForm, service_type: e.target.value})}
                className="form-input"
              >
                <option value="Wash">🧼 Wash Only</option>
                <option value="Dry">🔥 Dry Only</option>
                <option value="Iron">👔 Iron Only</option>
                <option value="WashDry">🧼🔥 Wash & Dry</option>
                <option value="FullService">✨ Full Service</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Weight (kg)</label>
              <input 
                type="number" 
                min="1"
                step="0.5"
                value={editForm.weight} 
                onChange={e => setEditForm({...editForm, weight: parseFloat(e.target.value)})}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Price ($)</label>
              <input 
                type="number" 
                min="0"
                step="0.01"
                value={editForm.price} 
                onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                className="form-input"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;