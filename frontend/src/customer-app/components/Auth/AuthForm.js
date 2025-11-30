import React, { useState } from 'react';

const AuthForm = ({ authMode, onAuth, loading, onModeChange }) => {
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      onAuth(formData.email, formData.password);
    } else {
      onAuth(formData.email, formData.name, formData.password);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <span className="logo-icon">🧺</span>
            <h1>LaundryPro</h1>
          </div>
          <p>{authMode === 'login' ? 'Welcome back! Sign in to your account' : 'Create your account to get started'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {authMode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
              placeholder="Enter your email"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                onClick={() => onModeChange('register')}
                className="auth-switch-btn"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                onClick={() => onModeChange('login')}
                className="auth-switch-btn"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;