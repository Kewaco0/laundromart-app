import React, { useState } from 'react';
import { useStaffAuth } from '../hooks/useStaffAuth';

const StaffLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useStaffAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="staff-login-container">
      <div className="staff-login-card">
        <div className="staff-login-header">
          <div className="staff-logo">
            <span className="logo-icon">👕</span>
            <h1>LaundryPro Staff</h1>
          </div>
          <p>Staff Portal - Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="staff-login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Staff Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="Enter your staff email"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="staff-login-btn"
          >
            {loading ? 'Signing in...' : 'Sign In to Staff Portal'}
          </button>
        </form>

        <div className="staff-login-footer">
          <p>Having trouble? Contact your administrator</p>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;