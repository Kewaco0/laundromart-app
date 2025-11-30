import React, { useState } from 'react';

const NewOrder = ({ onCreateOrder }) => {
  const [form, setForm] = useState({ service_type: 'Wash', weight: 1, price: 25 });

  const handleSubmit = () => {
    onCreateOrder(form);
  };

  return (
    <div className="new-order">
      <div className="section-header">
        <h2>Create New Order</h2>
        <p>Fill in the details for your laundry service</p>
      </div>

      <div className="order-form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>Service Type</label>
            <select 
              value={form.service_type} 
              onChange={e => setForm({...form, service_type: e.target.value})}
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
              value={form.weight} 
              onChange={e => setForm({...form, weight: parseFloat(e.target.value)})}
              className="form-input"
              placeholder="Enter weight in kg"
            />
          </div>
          
          <div className="form-group">
            <label>Price ($)</label>
            <input 
              type="number" 
              min="0"
              step="0.01"
              value={form.price} 
              onChange={e => setForm({...form, price: parseFloat(e.target.value)})}
              className="form-input"
              placeholder="Enter price"
            />
          </div>
        </div>

        <div className="price-preview">
          <h4>Order Summary</h4>
          <div className="price-details">
            <span>Service: {form.service_type}</span>
            <span>Weight: {form.weight} kg</span>
            <span className="total-price">Total: ${form.price}</span>
          </div>
        </div>

        <button onClick={handleSubmit} className="submit-order-btn">
          🧺 Place Order
        </button>
      </div>
    </div>
  );
};

export default NewOrder;