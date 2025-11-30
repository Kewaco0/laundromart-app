import React from 'react';

const MachineManagement = () => {
  const machines = [
    { id: 1, type: 'Washer', status: 'Available', currentOrder: null },
    { id: 2, type: 'Washer', status: 'In Use', currentOrder: 'ORD-001' },
    { id: 3, type: 'Dryer', status: 'Available', currentOrder: null },
    { id: 4, type: 'Dryer', status: 'Maintenance', currentOrder: null }
  ];

  return (
    <div className="machine-management">
      <div className="section-header">
        <h2>Machine Management</h2>
      </div>
      
      <div className="machines-grid">
        {machines.map(machine => (
          <div key={machine.id} className={`machine-card status-${machine.status.toLowerCase().replace(' ', '-')}`}>
            <div className="machine-header">
              <h3>{machine.type} #{machine.id}</h3>
              <span className={`status-badge status-${machine.status.toLowerCase().replace(' ', '-')}`}>
                {machine.status}
              </span>
            </div>
            
            <div className="machine-info">
              {machine.currentOrder && (
                <p>Current Order: {machine.currentOrder}</p>
              )}
              <p>Last Maintenance: 2 days ago</p>
            </div>
            
            <div className="machine-actions">
              <button className="btn-secondary">Update Status</button>
              {machine.status === 'In Use' && (
                <button className="btn-warning">Stop Machine</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineManagement;