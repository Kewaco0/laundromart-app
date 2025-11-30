import React from 'react';

const NotificationsPanel = ({ onClose }) => {
  const notifications = [
    { id: 1, type: 'order', message: 'New order received from John Doe', time: '2 min ago' },
    { id: 2, type: 'machine', message: 'Washer #2 has completed cycle', time: '5 min ago' },
    { id: 3, type: 'inventory', message: 'Fabric softener running low', time: '1 hour ago' }
  ];

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>
      
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-icon">
              {notification.type === 'order' && '📋'}
              {notification.type === 'machine' && '⚡'}
              {notification.type === 'inventory' && '📦'}
            </div>
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="notifications-footer">
        <button className="btn-secondary">Mark All as Read</button>
      </div>
    </div>
  );
};

export default NotificationsPanel;