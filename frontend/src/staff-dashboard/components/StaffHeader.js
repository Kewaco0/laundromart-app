import React from 'react';

const StaffHeader = ({ staff, onLogout, onNotificationsToggle }) => {
  const getRoleBadgeColor = (role) => {
    const colors = {
      'Frontdesk': 'bg-blue-100 text-blue-800',
      'Machine Operator': 'bg-green-100 text-green-800',
      'Delivery Staff': 'bg-purple-100 text-purple-800',
      'Manager': 'bg-orange-100 text-orange-800',
      'Admin': 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="staff-header">
      <div className="staff-header-content">
        <div className="staff-brand">
          <span className="staff-brand-icon">👕</span>
          <div>
            <h1>LaundryPro Staff</h1>
            <p>Staff Management Portal</p>
          </div>
        </div>

        <div className="staff-header-actions">
          <button 
            className="notification-btn"
            onClick={onNotificationsToggle}
          >
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>

          <div className="staff-profile">
            <div className="staff-avatar">
              {staff.name?.charAt(0) || staff.email?.charAt(0)}
            </div>
            <div className="staff-info">
              <span className="staff-name">{staff.name}</span>
              <span className={`staff-role ${getRoleBadgeColor(staff.role)}`}>
                {staff.role}
              </span>
            </div>
          </div>

          <button onClick={onLogout} className="staff-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;