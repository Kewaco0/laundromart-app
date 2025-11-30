import React from 'react';

const InventoryManagement = () => {
  const inventory = [
    { item: 'Detergent', currentStock: 45, lowStock: 20, status: 'Good' },
    { item: 'Fabric Softener', currentStock: 15, lowStock: 10, status: 'Low' },
    { item: 'Bleach', currentStock: 30, lowStock: 15, status: 'Good' },
    { item: 'Stain Remover', currentStock: 8, lowStock: 10, status: 'Critical' }
  ];

  return (
    <div className="inventory-management">
      <div className="section-header">
        <h2>Inventory Management</h2>
        <button className="btn-primary">Order Supplies</button>
      </div>
      
      <div className="inventory-grid">
        {inventory.map((item, index) => (
          <div key={index} className={`inventory-card status-${item.status.toLowerCase()}`}>
            <div className="inventory-header">
              <h3>{item.item}</h3>
              <span className={`status-badge status-${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
            
            <div className="inventory-info">
              <p>Current Stock: {item.currentStock}</p>
              <p>Low Stock Alert: {item.lowStock}</p>
              <div className="stock-bar">
                <div 
                  className="stock-level" 
                  style={{ 
                    width: `${(item.currentStock / (item.lowStock * 2)) * 100}%`,
                    backgroundColor: item.status === 'Critical' ? '#ef4444' : 
                                   item.status === 'Low' ? '#f59e0b' : '#10b981'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="inventory-actions">
              <button className="btn-secondary">Update Stock</button>
              {item.status === 'Critical' && (
                <button className="btn-warning">Order Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;