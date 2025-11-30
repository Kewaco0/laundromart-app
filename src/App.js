import React, { useState } from 'react';
import CustomerApp from './customer-app';
import StaffDashboard from './staff-dashboard/App';
import AdminDashboard from './admin-dashboard/App';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Show login form with role selection
  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <span className="logo-icon">🧺</span>
              <h1>LaundryPro</h1>
            </div>
            <p>Sign in to your account</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');
            const role = formData.get('role');
            
            // Simple authentication
            if (email && password) {
              setUser({
                email,
                role,
                name: email.split('@')[0]
              });
            }
          }} className="auth-form">
            <div className="form-group">
              <label>User Type</label>
              <select name="role" className="form-input" required>
                <option value="customer">👤 Customer</option>
                <option value="staff">👕 Staff Member</option>
                <option value="admin">⚙️ Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                name="email"
                type="email" 
                className="form-input" 
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                name="password"
                type="password" 
                className="form-input" 
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            <p><strong>Demo:</strong> Use any email/password</p>
          </div>
        </div>
      </div>
    );
  }

  // Route based on authenticated user role
  if (user.role === 'customer') {
    return <CustomerApp />;
  }

  if (user.role === 'staff') {
    return <StaffDashboard />;
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return null;
}

export default App;