import React, { useState } from 'react';
import '../App.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for all CRUD operations
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane@laundrypro.com', role: 'Manager', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Mike Johnson', email: 'mike@laundrypro.com', role: 'Staff', status: 'Active', joinDate: '2023-03-20' },
    { id: 3, name: 'Sarah Wilson', email: 'sarah@laundrypro.com', role: 'Staff', status: 'Inactive', joinDate: '2023-06-10' }
  ]);

  const [financialData, setFinancialData] = useState({
    revenue: 25480,
    expenses: 12850,
    profit: 12630,
    orders: 156,
    averageOrder: 45.50
  });

  const [reports, setReports] = useState([
    { id: 1, name: 'Monthly Revenue Report', type: 'Financial', date: '2024-01-31', status: 'Generated' },
    { id: 2, name: 'Staff Performance', type: 'Performance', date: '2024-01-31', status: 'Pending' },
    { id: 3, name: 'Inventory Analysis', type: 'Inventory', date: '2024-01-30', status: 'Generated' }
  ]);

  const [pricing, setPricing] = useState({
    wash: 5,
    dry: 4,
    washDry: 8,
    fullService: 12
  });

  const [businessSettings, setBusinessSettings] = useState({
    name: 'LaundryPro',
    email: 'info@laundrypro.com',
    phone: '+1-555-0123'
  });

  // Staff Management CRUD States
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: 'Staff',
    status: 'Active'
  });

  // Report Management States
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'Financial'
  });

  // CREATE - Add new staff member
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) {
      alert('Please fill in all required fields');
      return;
    }

    const staff = {
      id: Date.now(),
      ...newStaff,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setStaffMembers([...staffMembers, staff]);
    setNewStaff({ name: '', email: '', role: 'Staff', status: 'Active' });
    setShowAddStaff(false);
    alert('Staff member added successfully!');
  };

  // UPDATE - Start editing staff member
  const startEditStaff = (staff) => {
    setEditingStaff(staff);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      status: staff.status
    });
  };

  // UPDATE - Save edited staff member
  const saveEditStaff = () => {
    if (!newStaff.name || !newStaff.email) {
      alert('Please fill in all required fields');
      return;
    }

    setStaffMembers(staffMembers.map(staff => 
      staff.id === editingStaff.id 
        ? { ...staff, ...newStaff }
        : staff
    ));

    setEditingStaff(null);
    setNewStaff({ name: '', email: '', role: 'Staff', status: 'Active' });
    alert('Staff member updated successfully!');
  };

  // DELETE - Confirm staff deletion
  const confirmDeleteStaff = () => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== staffToDelete.id));
    setStaffToDelete(null);
    alert('Staff member deleted successfully!');
  };

  // CREATE - Generate new report
  const generateReport = () => {
    if (!newReport.name) {
      alert('Please enter a report name');
      return;
    }

    const report = {
      id: Date.now(),
      ...newReport,
      date: new Date().toISOString().split('T')[0],
      status: 'Generated'
    };

    setReports([report, ...reports]);
    setNewReport({ name: '', type: 'Financial' });
    alert('Report generated successfully!');
  };

  // DELETE - Delete report
  const deleteReport = (reportId) => {
    setReports(reports.filter(report => report.id !== reportId));
    alert('Report deleted successfully!');
  };

  // UPDATE - Save pricing
  const savePricing = () => {
    // In real app, this would call your API
    alert('Pricing updated successfully!');
  };

  // UPDATE - Save business settings
  const saveBusinessSettings = () => {
    // In real app, this would call your API
    alert('Business settings updated successfully!');
  };

  // UPDATE - Update financial data (demo - would come from backend)
  const updateFinancialData = () => {
    setFinancialData(prev => ({
      ...prev,
      revenue: prev.revenue + 1000,
      profit: prev.profit + 500,
      orders: prev.orders + 5
    }));
    alert('Financial data refreshed!');
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-brand">
            <span className="admin-brand-icon">⚙️</span>
            <div>
              <h1>LaundryPro - Admin Portal</h1>
              <p>Business Management System</p>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-profile">
              <div className="admin-avatar">
                A
              </div>
              <div className="admin-info">
                <span className="admin-name">Administrator</span>
                <span className="admin-role">Admin</span>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="admin-dashboard-content">
        <aside className="admin-sidebar">
          <nav className="admin-sidebar-nav">
            <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}>
              📊 Dashboard
            </button>
            <button className={`admin-nav-item ${activeTab === 'staff' ? 'active' : ''}`}
              onClick={() => setActiveTab('staff')}>
              👥 Staff Management
            </button>
            <button className={`admin-nav-item ${activeTab === 'finance' ? 'active' : ''}`}
              onClick={() => setActiveTab('finance')}>
              💰 Financial Reports
            </button>
            <button className={`admin-nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}>
              📈 Analytics
            </button>
            <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}>
              ⚙️ System Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          {/* Admin Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="admin-dashboard-home">
              <div className="welcome-banner">
                <h2>Admin Dashboard 🎯</h2>
                <p>Business overview and key metrics</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon revenue">💰</div>
                  <div className="stat-info">
                    <h3>${financialData.revenue.toLocaleString()}</h3>
                    <p>Total Revenue</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon profit">📈</div>
                  <div className="stat-info">
                    <h3>${financialData.profit.toLocaleString()}</h3>
                    <p>Net Profit</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orders">📋</div>
                  <div className="stat-info">
                    <h3>{financialData.orders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon staff">👥</div>
                  <div className="stat-info">
                    <h3>{staffMembers.length}</h3>
                    <p>Staff Members</p>
                  </div>
                </div>
              </div>

              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary" onClick={() => setActiveTab('staff')}>
                    👥 Manage Staff
                  </button>
                  <button className="action-btn secondary" onClick={updateFinancialData}>
                    🔄 Refresh Data
                  </button>
                  <button className="action-btn secondary" onClick={() => setActiveTab('settings')}>
                    ⚙️ System Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Staff Management */}
          {activeTab === 'staff' && (
            <div className="staff-management">
              <div className="section-header">
                <h2>Staff Management</h2>
                <div className="header-actions">
                  <button className="btn-primary" onClick={() => setShowAddStaff(true)}>
                    + Add Staff Member
                  </button>
                </div>
              </div>
              
              <div className="staff-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map(staff => (
                      <tr key={staff.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">{staff.name.charAt(0)}</div>
                            {staff.name}
                          </div>
                        </td>
                        <td>{staff.email}</td>
                        <td>
                          <span className={`role-badge role-${staff.role.toLowerCase()}`}>
                            {staff.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge status-${staff.status.toLowerCase()}`}>
                            {staff.status}
                          </span>
                        </td>
                        <td>{staff.joinDate}</td>
                        <td>
                          <div className="action-buttons-small">
                            <button className="btn-edit" onClick={() => startEditStaff(staff)}>
                              Edit
                            </button>
                            <button 
                              className="btn-delete" 
                              onClick={() => setStaffToDelete(staff)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Financial Reports */}
          {activeTab === 'finance' && (
            <div className="finance-management">
              <div className="section-header">
                <h2>Financial Reports</h2>
                <div className="header-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      const name = prompt('Enter report name:');
                      if (name) {
                        setNewReport({ name, type: 'Financial' });
                        setTimeout(generateReport, 100);
                      }
                    }}
                  >
                    📊 Generate Report
                  </button>
                </div>
              </div>

              <div className="finance-cards">
                <div className="finance-card">
                  <h3>Revenue Overview</h3>
                  <div className="finance-stats">
                    <div className="finance-stat">
                      <span className="finance-label">Total Revenue</span>
                      <span className="finance-value">${financialData.revenue.toLocaleString()}</span>
                    </div>
                    <div className="finance-stat">
                      <span className="finance-label">Total Expenses</span>
                      <span className="finance-value">${financialData.expenses.toLocaleString()}</span>
                    </div>
                    <div className="finance-stat">
                      <span className="finance-label">Net Profit</span>
                      <span className="finance-value profit">${financialData.profit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="finance-card">
                  <h3>Order Analytics</h3>
                  <div className="finance-stats">
                    <div className="finance-stat">
                      <span className="finance-label">Total Orders</span>
                      <span className="finance-value">{financialData.orders}</span>
                    </div>
                    <div className="finance-stat">
                      <span className="finance-label">Average Order Value</span>
                      <span className="finance-value">${financialData.averageOrder}</span>
                    </div>
                    <div className="finance-stat">
                      <span className="finance-label">Success Rate</span>
                      <span className="finance-value">98.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reports-section">
                <h3>Recent Reports</h3>
                <div className="reports-list">
                  {reports.map(report => (
                    <div key={report.id} className="report-card">
                      <div className="report-info">
                        <h4>{report.name}</h4>
                        <p>Type: {report.type} • Date: {report.date}</p>
                      </div>
                      <div className="report-actions">
                        <span className={`report-status status-${report.status.toLowerCase()}`}>
                          {report.status}
                        </span>
                        <button className="btn-secondary">Download</button>
                        <button 
                          className="btn-delete"
                          onClick={() => deleteReport(report.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === 'reports' && (
            <div className="analytics-management">
              <div className="section-header">
                <h2>Business Analytics</h2>
                <p>Performance metrics and insights</p>
              </div>

              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>📈 Revenue Trend</h3>
                  <div className="chart-placeholder">
                    <p>Revenue Chart Visualization</p>
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '65%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>👥 Staff Performance</h3>
                  <div className="performance-list">
                    {staffMembers.map(staff => (
                      <div key={staff.id} className="performance-item">
                        <span>{staff.name}</span>
                        <div className="performance-bar">
                          <div 
                            className="performance-fill" 
                            style={{
                              width: staff.status === 'Active' ? '75%' : '25%',
                              background: staff.status === 'Active' 
                                ? 'linear-gradient(135deg, #10b981, #059669)' 
                                : 'linear-gradient(135deg, #6b7280, #4b5563)'
                            }}
                          ></div>
                        </div>
                        <span>{staff.status === 'Active' ? '75%' : '25%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>📊 Order Distribution</h3>
                  <div className="order-stats">
                    <div className="order-stat">
                      <span>Wash Only</span>
                      <span>35%</span>
                    </div>
                    <div className="order-stat">
                      <span>Wash & Dry</span>
                      <span>45%</span>
                    </div>
                    <div className="order-stat">
                      <span>Full Service</span>
                      <span>20%</span>
                    </div>
                  </div>
                  <button 
                    className="btn-secondary"
                    style={{marginTop: '1rem'}}
                    onClick={() => alert('Analytics data refreshed!')}
                  >
                    Refresh Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'settings' && (
            <div className="settings-management">
              <div className="section-header">
                <h2>System Settings</h2>
                <p>Configure your laundry business</p>
              </div>

              <div className="settings-grid">
                <div className="settings-card">
                  <h3>💰 Pricing</h3>
                  <div className="setting-item">
                    <label>Wash Only (per kg)</label>
                    <input 
                      type="number" 
                      value={pricing.wash}
                      onChange={(e) => setPricing({...pricing, wash: parseFloat(e.target.value)})}
                      className="setting-input" 
                    />
                  </div>
                  <div className="setting-item">
                    <label>Dry Only (per kg)</label>
                    <input 
                      type="number" 
                      value={pricing.dry}
                      onChange={(e) => setPricing({...pricing, dry: parseFloat(e.target.value)})}
                      className="setting-input" 
                    />
                  </div>
                  <div className="setting-item">
                    <label>Wash & Dry (per kg)</label>
                    <input 
                      type="number" 
                      value={pricing.washDry}
                      onChange={(e) => setPricing({...pricing, washDry: parseFloat(e.target.value)})}
                      className="setting-input" 
                    />
                  </div>
                  <button className="btn-primary" onClick={savePricing}>
                    Save Pricing
                  </button>
                </div>

                <div className="settings-card">
                  <h3>⚙️ Business Settings</h3>
                  <div className="setting-item">
                    <label>Business Name</label>
                    <input 
                      type="text" 
                      value={businessSettings.name}
                      onChange={(e) => setBusinessSettings({...businessSettings, name: e.target.value})}
                      className="setting-input" 
                    />
                  </div>
                  <div className="setting-item">
                    <label>Contact Email</label>
                    <input 
                      type="email" 
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings({...businessSettings, email: e.target.value})}
                      className="setting-input" 
                    />
                  </div>
                  <div className="setting-item">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings({...businessSettings, phone: e.target.value})}
                      className="setting-input" 
                    />
                  </div>
                  <button className="btn-primary" onClick={saveBusinessSettings}>
                    Save Settings
                  </button>
                </div>

                <div className="settings-card">
                  <h3>🔐 Security</h3>
                  <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <input type="number" defaultValue="30" className="setting-input" />
                  </div>
                  <div className="setting-item">
                    <label>Password Policy</label>
                    <select className="setting-input">
                      <option>Standard</option>
                      <option>Strong</option>
                      <option>Very Strong</option>
                    </select>
                  </div>
                  <button className="btn-primary">
                    Update Security
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>👥 Add Staff Member</h3>
              <button onClick={() => setShowAddStaff(false)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    className="form-input"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    className="form-input"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="form-input"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newStaff.status}
                    onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowAddStaff(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleAddStaff} className="btn-primary">
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {editingStaff && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>✏️ Edit Staff Member</h3>
              <button onClick={() => setEditingStaff(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="form-input"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newStaff.status}
                    onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setEditingStaff(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={saveEditStaff} className="btn-primary">
                Update Staff Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Staff Confirmation Modal */}
      {staffToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>🗑️ Delete Staff Member</h3>
              <button onClick={() => setStaffToDelete(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <h4>Delete {staffToDelete.name}?</h4>
                <p>This will permanently remove this staff member from the system.</p>
                <p><strong>Email:</strong> {staffToDelete.email}</p>
                <p><strong>Role:</strong> {staffToDelete.role}</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setStaffToDelete(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteStaff} className="btn-danger">
                Yes, Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;