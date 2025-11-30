import React from 'react';

const StaffSidebar = ({ activeTab, onTabChange, staffRole }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      roles: ['Frontdesk', 'Machine Operator', 'Delivery Staff', 'Manager', 'Admin']
    },
    {
      id: 'orders',
      label: 'Order Management',
      icon: '📋',
      roles: ['Frontdesk', 'Machine Operator', 'Delivery Staff', 'Manager', 'Admin']
    },
    {
      id: 'machines',
      label: 'Machines',
      icon: '⚡',
      roles: ['Machine Operator', 'Manager', 'Admin']
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: '👥',
      roles: ['Frontdesk', 'Manager', 'Admin']
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: '📦',
      roles: ['Frontdesk', 'Machine Operator', 'Manager', 'Admin']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      roles: ['Manager', 'Admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(staffRole)
  );

  return (
    <aside className="staff-sidebar">
      <nav className="staff-sidebar-nav">
        {filteredMenuItems.map(item => (
          <button
            key={item.id}
            className={`staff-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="staff-sidebar-footer">
        <div className="shift-info">
          <h4>Current Shift</h4>
          <p>8:00 AM - 5:00 PM</p>
          <span className="shift-status active">Active</span>
        </div>
      </div>
    </aside>
  );
};

export default StaffSidebar;