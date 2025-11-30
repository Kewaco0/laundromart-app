import React from 'react';

const PaymentModal = ({ order, paymentAmount, onPaymentAmountChange, onProcessPayment, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>💳 Process Payment</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">
          <div className="payment-details">
            <div className="payment-info">
              <h4>Order #{order?.id}</h4>
              <p>Service: {order?.service_type}</p>
              <p>Weight: {order?.weight} kg</p>
              <p className="payment-amount">Amount Due: ${order?.price}</p>
            </div>
            
            <div className="form-group">
              <label>Payment Amount ($)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => onPaymentAmountChange(e.target.value)}
                className="form-input"
                placeholder="Enter amount to pay"
              />
            </div>

            <div className="payment-methods">
              <h4>Payment Method</h4>
              <div className="method-options">
                <label className="method-option">
                  <input type="radio" name="paymentMethod" defaultChecked />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="method-option">
                  <input type="radio" name="paymentMethod" />
                  <span>📱 Mobile Payment</span>
                </label>
                <label className="method-option">
                  <input type="radio" name="paymentMethod" />
                  <span>💵 Cash</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onProcessPayment} className="btn-primary">
            Process Payment ${paymentAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;