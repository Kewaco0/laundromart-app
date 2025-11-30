import React, { useState } from 'react';
import '../App.css';

function CustomerApp() {
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    role: 'customer'
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([
    { id: 1, service_type: 'Wash & Dry', weight: 5, price: 25, status: 'Completed', date: '2024-01-15' },
    { id: 2, service_type: 'Wash Only', weight: 3, price: 15, status: 'Processing', date: '2024-01-16' },
    { id: 3, service_type: 'Full Service', weight: 8, price: 45, status: 'Pending', date: '2024-01-16' }
  ]);
  const [newOrder, setNewOrder] = useState({ service_type: 'Wash', weight: '', price: '' });
  
  // CRUD States
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({ service_type: '', weight: '', price: '' });
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      email: loginForm.email,
      role: loginForm.role,
      name: loginForm.email.split('@')[0]
    });
  };

  // CREATE - Create new order
  const handleCreateOrder = () => {
    if (!newOrder.weight || newOrder.weight <= 0) {
      alert('Please enter a valid weight');
      return;
    }
    
    const order = {
      id: Date.now(), // Use timestamp for unique ID
      service_type: newOrder.service_type,
      weight: parseFloat(newOrder.weight),
      price: newOrder.price || calculatePrice(newOrder.service_type, newOrder.weight),
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };
    
    setOrders([order, ...orders]);
    setNewOrder({ service_type: 'Wash', weight: '', price: '' });
    setActiveTab('orders');
    alert('Order created successfully!');
  };

  // READ - Calculate price (already exists)
  const calculatePrice = (service, weight) => {
    const basePrices = {
      'Wash': 5,
      'Dry': 4, 
      'Iron': 3,
      'WashDry': 8,
      'FullService': 12
    };
    return (basePrices[service] * weight).toFixed(2);
  };

  // UPDATE - Start editing an order
  const startEditOrder = (order) => {
    if (order.status === 'Completed' || order.status === 'Cancelled') {
      alert('Cannot edit completed or cancelled orders');
      return;
    }
    
    setEditingOrder(order);
    setEditForm({
      service_type: order.service_type,
      weight: order.weight,
      price: order.price
    });
  };

  // UPDATE - Save edited order
  const saveEditOrder = () => {
    if (!editForm.weight || editForm.weight <= 0) {
      alert('Please enter a valid weight');
      return;
    }

    setOrders(orders.map(order => 
      order.id === editingOrder.id 
        ? { 
            ...order, 
            service_type: editForm.service_type,
            weight: parseFloat(editForm.weight),
            price: editForm.price || calculatePrice(editForm.service_type, editForm.weight)
          }
        : order
    ));
    
    setEditingOrder(null);
    setEditForm({ service_type: '', weight: '', price: '' });
    alert('Order updated successfully!');
  };

  // DELETE - Start delete confirmation
  const startDeleteOrder = (order) => {
    setOrderToDelete(order);
  };

  // DELETE - Confirm and delete order
  const confirmDeleteOrder = () => {
    setOrders(orders.filter(order => order.id !== orderToDelete.id));
    setOrderToDelete(null);
    alert('Order deleted successfully!');
  };

  // UPDATE - Cancel an order (change status to Cancelled)
  const startCancelOrder = (order) => {
    if (order.status === 'Completed') {
      alert('Cannot cancel completed orders');
      return;
    }
    setOrderToCancel(order);
  };

  // UPDATE - Confirm order cancellation
  const confirmCancelOrder = () => {
    setOrders(orders.map(order => 
      order.id === orderToCancel.id 
        ? { ...order, status: 'Cancelled' }
        : order
    ));
    setOrderToCancel(null);
    alert('Order cancelled successfully!');
  };

  // Show login form if not authenticated
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
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>User Type</label>
              <select 
                value={loginForm.role}
                onChange={(e) => setLoginForm({...loginForm, role: e.target.value})}
                className="form-input"
              >
                <option value="customer">👤 Customer</option>
                <option value="staff">👕 Staff Member</option>
                <option value="admin">⚙️ Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="form-input" 
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="form-input" 
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In as {loginForm.role === 'customer' ? 'Customer' : 
                         loginForm.role === 'staff' ? 'Staff' : 'Admin'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show customer dashboard
  if (user.role === 'customer') {
    return (
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <div className="brand">
              <span className="brand-icon">🧺</span>
              <h1>LaundryPro</h1>
            </div>
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              <button onClick={() => setUser(null)} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="app-nav">
          <div className="nav-content">
            <button 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-btn ${activeTab === 'new-order' ? 'active' : ''}`}
              onClick={() => setActiveTab('new-order')}
            >
              🧺 New Order
            </button>
            <button 
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📋 My Orders
            </button>
            <button 
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard">
              <div className="welcome-banner">
                <h2>Welcome back, {user.name}! 👋</h2>
                <p>Here's your laundry overview</p>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon total">🧺</div>
                  <div className="stat-info">
                    <h3>{orders.length}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon pending">⏳</div>
                  <div className="stat-info">
                    <h3>{orders.filter(o => o.status === 'Pending').length}</h3>
                    <p>Pending</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon completed">✅</div>
                  <div className="stat-info">
                    <h3>{orders.filter(o => o.status === 'Completed').length}</h3>
                    <p>Completed</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon revenue">💰</div>
                  <div className="stat-info">
                    <h3>${orders.reduce((sum, order) => sum + parseFloat(order.price), 0)}</h3>
                    <p>Total Spent</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    className="action-btn primary"
                    onClick={() => setActiveTab('new-order')}
                  >
                    🧺 Create New Order
                  </button>
                  <button 
                    className="action-btn secondary"
                    onClick={() => setActiveTab('orders')}
                  >
                    📋 View All Orders
                  </button>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="recent-orders">
                <div className="section-header">
                  <h3>Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="view-all-btn">
                    View All →
                  </button>
                </div>
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-main">
                      <span className="order-service">{order.service_type}</span>
                      <span className="order-weight">{order.weight}kg</span>
                      <span className="order-price">${order.price}</span>
                    </div>
                    <div className="order-meta">
                      <span className={`order-status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      <span className="order-date">#{order.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Order Tab - CREATE */}
          {activeTab === 'new-order' && (
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
                      value={newOrder.service_type} 
                      onChange={e => setNewOrder({...newOrder, service_type: e.target.value})}
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
                      value={newOrder.weight} 
                      onChange={e => setNewOrder({...newOrder, weight: e.target.value})}
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
                      value={newOrder.price || calculatePrice(newOrder.service_type, newOrder.weight || 1)} 
                      onChange={e => setNewOrder({...newOrder, price: e.target.value})}
                      className="form-input"
                      placeholder="Auto-calculated"
                      readOnly
                    />
                  </div>
                </div>

                <div className="price-preview">
                  <h4>Order Summary</h4>
                  <div className="price-details">
                    <span>Service: {newOrder.service_type}</span>
                    <span>Weight: {newOrder.weight || 0} kg</span>
                    <span className="total-price">
                      Total: ${newOrder.price || calculatePrice(newOrder.service_type, newOrder.weight || 1)}
                    </span>
                  </div>
                </div>

                <button onClick={handleCreateOrder} className="submit-order-btn">
                  🧺 Place Order
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab - READ with UPDATE/DELETE actions */}
          {activeTab === 'orders' && (
            <div className="orders-page">
              <div className="section-header">
                <h2>My Orders</h2>
                <p>View and manage your laundry orders</p>
              </div>

              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className={`order-status status-${order.status.toLowerCase()}`}>
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
                    <div className="order-meta">
                      <span className="order-date">Placed: {order.date}</span>
                    </div>
                    <div className="order-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => startEditOrder(order)}
                        disabled={order.status === 'Completed' || order.status === 'Cancelled'}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="cancel-btn"
                        onClick={() => startCancelOrder(order)}
                        disabled={order.status === 'Completed' || order.status === 'Cancelled'}
                      >
                        ❌ Cancel
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => startDeleteOrder(order)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-page">
              <div className="section-header">
                <h2>My Profile</h2>
                <p>Manage your account information</p>
              </div>

              <div className="profile-card">
                <div className="profile-header">
                  <div className="avatar">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="profile-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className="user-badge">Customer</span>
                  </div>
                </div>

                <div className="profile-stats">
                  <div className="profile-stat">
                    <span className="stat-value">{orders.length}</span>
                    <span className="stat-label">Total Orders</span>
                  </div>
                  <div className="profile-stat">
                    <span className="stat-value">
                      ${orders.reduce((sum, order) => sum + parseFloat(order.price), 0)}
                    </span>
                    <span className="stat-label">Total Spent</span>
                  </div>
                  <div className="profile-stat">
                    <span className="stat-value">
                      {orders.filter(o => o.status === 'Completed').length}
                    </span>
                    <span className="stat-label">Completed</span>
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="profile-btn">Edit Profile</button>
                  <button className="profile-btn">Change Password</button>
                  <button className="profile-btn">Notification Settings</button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* EDIT ORDER MODAL - UPDATE */}
        {editingOrder && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>✏️ Edit Order</h3>
                <button onClick={() => setEditingOrder(null)} className="modal-close">✕</button>
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
                      onChange={e => setEditForm({...editForm, weight: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input 
                      type="number" 
                      min="0"
                      step="0.01"
                      value={editForm.price || calculatePrice(editForm.service_type, editForm.weight || 1)} 
                      onChange={e => setEditForm({...editForm, price: e.target.value})}
                      className="form-input"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setEditingOrder(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={saveEditOrder} className="btn-primary">
                  Update Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL - DELETE */}
        {orderToDelete && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>🗑️ Delete Order</h3>
                <button onClick={() => setOrderToDelete(null)} className="modal-close">✕</button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <h4>Delete Order #{orderToDelete.id}?</h4>
                  <p><strong>{orderToDelete.service_type}</strong> • {orderToDelete.weight}kg • ${orderToDelete.price}</p>
                  <p className="warning-text">
                    This will permanently remove this order from your history.
                  </p>
                  <p className="warning-text"><strong>This action cannot be undone.</strong></p>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setOrderToDelete(null)} className="btn-secondary">
                  Keep Order
                </button>
                <button onClick={confirmDeleteOrder} className="btn-danger">
                  Yes, Delete Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CANCEL CONFIRMATION MODAL - UPDATE */}
        {orderToCancel && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>❌ Cancel Order</h3>
                <button onClick={() => setOrderToCancel(null)} className="modal-close">✕</button>
              </div>
              <div className="modal-body">
                <div className="cancel-warning">
                  <h4>Are you sure you want to cancel this order?</h4>
                  <p><strong>Order #{orderToCancel.id}</strong> - {orderToCancel.service_type} • {orderToCancel.weight}kg • ${orderToCancel.price}</p>
                  <p className="warning-text">This action cannot be undone.</p>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setOrderToCancel(null)} className="btn-secondary">
                  Keep Order
                </button>
                <button onClick={confirmCancelOrder} className="btn-danger">
                  Yes, Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For staff/admin, show simple placeholder
  return (
    <div style={{ padding: '50px', textAlign: 'center', background: user.role === 'staff' ? '#10b981' : '#f59e0b', color: 'white', minHeight: '100vh' }}>
      <h1>{user.role === 'staff' ? '👕 Staff Dashboard' : '⚙️ Admin Dashboard'}</h1>
      <p>Welcome {user.name}!</p>
      <p>This dashboard is under construction</p>
      <button onClick={() => setUser(null)} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
}

export default CustomerApp;