import React, { useState } from 'react';
import '../App.css';

function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for all CRUD operations
  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', service: 'Wash & Dry', status: 'Processing', weight: 5, price: 25, assignedTo: 'Jane', phone: '555-0101', address: '123 Main St' },
    { id: 2, customer: 'Mike Johnson', service: 'Wash Only', status: 'Pending', weight: 3, price: 15, assignedTo: '', phone: '555-0102', address: '456 Oak Ave' },
    { id: 3, customer: 'Sarah Wilson', service: 'Full Service', status: 'Ready for Pickup', weight: 8, price: 45, assignedTo: 'Jane', phone: '555-0103', address: '789 Pine Rd' }
  ]);

  const [machines, setMachines] = useState([
    { id: 1, type: 'Washer', status: 'In Use', currentOrder: 'ORD-001', lastMaintenance: '2024-01-14', location: 'Front Area' },
    { id: 2, type: 'Washer', status: 'Available', currentOrder: null, lastMaintenance: '2024-01-15', location: 'Back Area' },
    { id: 3, type: 'Dryer', status: 'Maintenance', currentOrder: null, lastMaintenance: '2024-01-10', location: 'Front Area' },
    { id: 4, type: 'Dryer', status: 'Available', currentOrder: null, lastMaintenance: '2024-01-13', location: 'Back Area' }
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, item: 'Detergent', currentStock: 45, lowStock: 20, status: 'Good', category: 'Cleaning', supplier: 'CleanCo' },
    { id: 2, item: 'Fabric Softener', currentStock: 15, lowStock: 10, status: 'Low', category: 'Cleaning', supplier: 'SoftFab' },
    { id: 3, item: 'Bleach', currentStock: 30, lowStock: 15, status: 'Good', category: 'Cleaning', supplier: 'BrightClean' },
    { id: 4, item: 'Laundry Bags', currentStock: 8, lowStock: 10, status: 'Critical', category: 'Supplies', supplier: 'BagPro' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '555-0101', totalOrders: 5, totalSpent: 125, lastOrder: '2024-01-15' },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@email.com', phone: '555-0103', totalOrders: 3, totalSpent: 85, lastOrder: '2024-01-16' },
    { id: 3, name: 'Mike Johnson', email: 'mike@email.com', phone: '555-0102', totalOrders: 2, totalSpent: 45, lastOrder: '2024-01-14' }
  ]);

  // Order Management States
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  // Machine Management States
  const [editingMachine, setEditingMachine] = useState(null);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const [newMachine, setNewMachine] = useState({
    type: 'Washer',
    status: 'Available',
    location: ''
  });

  // Inventory Management States
  const [editingInventory, setEditingInventory] = useState(null);
  const [inventoryToDelete, setInventoryToDelete] = useState(null);
  const [newInventory, setNewInventory] = useState({
    item: '',
    currentStock: 0,
    lowStock: 10,
    category: 'Cleaning',
    supplier: ''
  });

  // Customer Management States
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  // ORDER CRUD OPERATIONS

  // UPDATE - Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // UPDATE - Assign order to staff
  const assignOrder = (orderId, staffName) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, assignedTo: staffName } : order
    ));
  };

  // UPDATE - Start editing order
  const startEditOrder = (order) => {
    setEditingOrder(order);
  };

  // UPDATE - Save edited order
  const saveEditOrder = () => {
    // In real app, this would update the order
    setEditingOrder(null);
    alert('Order updated successfully!');
  };

  // DELETE - Delete order
  const confirmDeleteOrder = () => {
    setOrders(orders.filter(order => order.id !== orderToDelete.id));
    setOrderToDelete(null);
    alert('Order deleted successfully!');
  };

  // MACHINE CRUD OPERATIONS

  // CREATE - Add new machine
  const handleAddMachine = () => {
    if (!newMachine.location) {
      alert('Please enter machine location');
      return;
    }

    const machine = {
      id: Date.now(),
      ...newMachine,
      lastMaintenance: new Date().toISOString().split('T')[0],
      currentOrder: null
    };

    setMachines([...machines, machine]);
    setNewMachine({ type: 'Washer', status: 'Available', location: '' });
    alert('Machine added successfully!');
  };

  // UPDATE - Update machine status
  const updateMachineStatus = (machineId, newStatus) => {
    setMachines(machines.map(machine => 
      machine.id === machineId ? { ...machine, status: newStatus } : machine
    ));
  };

  // UPDATE - Start editing machine
  const startEditMachine = (machine) => {
    setEditingMachine(machine);
    setNewMachine({
      type: machine.type,
      status: machine.status,
      location: machine.location
    });
  };

  // UPDATE - Save edited machine
  const saveEditMachine = () => {
    setMachines(machines.map(machine => 
      machine.id === editingMachine.id 
        ? { ...machine, ...newMachine }
        : machine
    ));
    setEditingMachine(null);
    setNewMachine({ type: 'Washer', status: 'Available', location: '' });
    alert('Machine updated successfully!');
  };

  // DELETE - Delete machine
  const confirmDeleteMachine = () => {
    setMachines(machines.filter(machine => machine.id !== machineToDelete.id));
    setMachineToDelete(null);
    alert('Machine removed successfully!');
  };

  // INVENTORY CRUD OPERATIONS

  // CREATE - Add new inventory item
  const handleAddInventory = () => {
    if (!newInventory.item || !newInventory.supplier) {
      alert('Please fill in all required fields');
      return;
    }

    const inventoryItem = {
      id: Date.now(),
      ...newInventory,
      status: newInventory.currentStock <= newInventory.lowStock ? 'Critical' : 
             newInventory.currentStock <= newInventory.lowStock * 1.5 ? 'Low' : 'Good'
    };

    setInventory([...inventory, inventoryItem]);
    setNewInventory({ item: '', currentStock: 0, lowStock: 10, category: 'Cleaning', supplier: '' });
    alert('Inventory item added successfully!');
  };

  // UPDATE - Update inventory stock
  const updateInventoryStock = (inventoryId, newStock) => {
    const item = inventory.find(item => item.id === inventoryId);
    const updatedItem = {
      ...item,
      currentStock: newStock,
      status: newStock <= item.lowStock ? 'Critical' : 
             newStock <= item.lowStock * 1.5 ? 'Low' : 'Good'
    };

    setInventory(inventory.map(item => 
      item.id === inventoryId ? updatedItem : item
    ));
  };

  // UPDATE - Start editing inventory
  const startEditInventory = (item) => {
    setEditingInventory(item);
    setNewInventory({
      item: item.item,
      currentStock: item.currentStock,
      lowStock: item.lowStock,
      category: item.category,
      supplier: item.supplier
    });
  };

  // UPDATE - Save edited inventory
  const saveEditInventory = () => {
    const updatedItem = {
      ...editingInventory,
      ...newInventory,
      status: newInventory.currentStock <= newInventory.lowStock ? 'Critical' : 
             newInventory.currentStock <= newInventory.lowStock * 1.5 ? 'Low' : 'Good'
    };

    setInventory(inventory.map(item => 
      item.id === editingInventory.id ? updatedItem : item
    ));
    setEditingInventory(null);
    setNewInventory({ item: '', currentStock: 0, lowStock: 10, category: 'Cleaning', supplier: '' });
    alert('Inventory item updated successfully!');
  };

  // DELETE - Delete inventory item
  const confirmDeleteInventory = () => {
    setInventory(inventory.filter(item => item.id !== inventoryToDelete.id));
    setInventoryToDelete(null);
    alert('Inventory item deleted successfully!');
  };

  // CUSTOMER CRUD OPERATIONS

  // UPDATE - Start editing customer
  const startEditCustomer = (customer) => {
    setEditingCustomer(customer);
  };

  // UPDATE - Save edited customer
  const saveEditCustomer = () => {
    // In real app, this would update customer data
    setEditingCustomer(null);
    alert('Customer updated successfully!');
  };

  // DELETE - Delete customer
  const confirmDeleteCustomer = () => {
    setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
    setCustomerToDelete(null);
    alert('Customer deleted successfully!');
  };

  return (
    <div className="staff-dashboard">
      {/* Header */}
      <header className="staff-header">
        <div className="staff-header-content">
          <div className="staff-brand">
            <span className="staff-brand-icon">👕</span>
            <div>
              <h1>LaundryPro - Staff Portal</h1>
              <p>Staff Management System</p>
            </div>
          </div>

          <div className="staff-header-actions">
            <div className="staff-profile">
              <div className="staff-avatar">
                S
              </div>
              <div className="staff-info">
                <span className="staff-name">Staff User</span>
                <span className="staff-role">Staff</span>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="staff-dashboard-content">
        <aside className="staff-sidebar">
          <nav className="staff-sidebar-nav">
            <button className={`staff-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}>
              📊 Dashboard
            </button>
            <button className={`staff-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}>
              📋 Order Management
            </button>
            <button className={`staff-nav-item ${activeTab === 'machines' ? 'active' : ''}`}
              onClick={() => setActiveTab('machines')}>
              ⚡ Machine Management
            </button>
            <button className={`staff-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}>
              👥 Customers
            </button>
            <button className={`staff-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}>
              📦 Inventory
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="staff-main-content">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-home">
              <div className="welcome-banner">
                <h2>Staff Dashboard 👋</h2>
                <p>Welcome back! Here's today's overview.</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon total">📋</div>
                  <div className="stat-info">
                    <h3>{orders.length}</h3>
                    <p>Active Orders</p>
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
                    <h3>{orders.filter(o => o.status === 'Ready for Pickup').length}</h3>
                    <p>Ready for Pickup</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon revenue">💰</div>
                  <div className="stat-info">
                    <h3>${orders.reduce((sum, order) => sum + order.price, 0)}</h3>
                    <p>Today's Revenue</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary" onClick={() => setActiveTab('orders')}>
                    📋 Manage Orders
                  </button>
                  <button className="action-btn secondary" onClick={() => setActiveTab('machines')}>
                    ⚡ Check Machines
                  </button>
                  <button className="action-btn secondary" onClick={() => setActiveTab('inventory')}>
                    📦 View Inventory
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Management */}
          {activeTab === 'orders' && (
            <div className="order-management">
              <div className="section-header">
                <h2>Order Management</h2>
                <p>Manage customer laundry orders</p>
              </div>
              
              <div className="orders-grid">
                {orders.map(order => (
                  <div key={order.id} className="order-card staff-order-card">
                    <div className="order-header">
                      <span className="order-id">#{order.id}</span>
                      <span className={`order-status status-${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="order-details">
                      <div className="customer-info">
                        <strong>{order.customer}</strong>
                        <span>{order.service} • {order.weight}kg</span>
                        <span className="order-contact">{order.phone}</span>
                      </div>
                      <div className="order-price">${order.price}</div>
                    </div>

                    <div className="order-actions-staff">
                      <select 
                        className="status-select" 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Completed">Completed</option>
                      </select>
                      
                      <select 
                        className="assign-select"
                        value={order.assignedTo || ''}
                        onChange={(e) => assignOrder(order.id, e.target.value)}
                      >
                        <option value="">Assign to...</option>
                        <option value="Jane">Jane</option>
                        <option value="Mike">Mike</option>
                        <option value="Sarah">Sarah</option>
                      </select>

                      <button 
                        className="btn-secondary"
                        onClick={() => setOrderDetails(order)}
                      >
                        View Details
                      </button>
                      
                      <button 
                        className="btn-edit"
                        onClick={() => startEditOrder(order)}
                      >
                        ✏️ Edit
                      </button>
                      
                      <button 
                        className="btn-delete"
                        onClick={() => setOrderToDelete(order)}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    {order.assignedTo && (
                      <div className="assigned-info">
                        <span className="assigned-badge">Assigned to {order.assignedTo}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Machine Management */}
          {activeTab === 'machines' && (
            <div className="machine-management">
              <div className="section-header">
                <h2>Machine Management</h2>
                <div className="header-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => document.getElementById('addMachineModal').showModal()}
                  >
                    + Add Machine
                  </button>
                </div>
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
                      <p><strong>Location:</strong> {machine.location}</p>
                      {machine.currentOrder && (
                        <p><strong>Current Order:</strong> {machine.currentOrder}</p>
                      )}
                      <p><strong>Last Maintenance:</strong> {machine.lastMaintenance}</p>
                    </div>
                    
                    <div className="machine-actions">
                      <select 
                        className="status-select"
                        value={machine.status}
                        onChange={(e) => updateMachineStatus(machine.id, e.target.value)}
                      >
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Out of Service">Out of Service</option>
                      </select>
                      
                      <button 
                        className="btn-edit"
                        onClick={() => startEditMachine(machine)}
                      >
                        Edit
                      </button>
                      
                      <button 
                        className="btn-delete"
                        onClick={() => setMachineToDelete(machine)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Management */}
          {activeTab === 'inventory' && (
            <div className="inventory-management">
              <div className="section-header">
                <h2>Inventory Management</h2>
                <div className="header-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => document.getElementById('addInventoryModal').showModal()}
                  >
                    + Add Item
                  </button>
                </div>
              </div>
              
              <div className="inventory-grid">
                {inventory.map(item => (
                  <div key={item.id} className={`inventory-card status-${item.status.toLowerCase()}`}>
                    <div className="inventory-header">
                      <h3>{item.item}</h3>
                      <span className={`status-badge status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="inventory-info">
                      <p><strong>Current Stock:</strong> {item.currentStock}</p>
                      <p><strong>Low Stock Alert:</strong> {item.lowStock}</p>
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Supplier:</strong> {item.supplier}</p>
                      
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
                      <div className="stock-update">
                        <input 
                          type="number" 
                          value={item.currentStock}
                          onChange={(e) => updateInventoryStock(item.id, parseInt(e.target.value))}
                          className="stock-input"
                          min="0"
                        />
                        <button className="btn-secondary">Update</button>
                      </div>
                      
                      <button 
                        className="btn-edit"
                        onClick={() => startEditInventory(item)}
                      >
                        Edit
                      </button>
                      
                      <button 
                        className="btn-delete"
                        onClick={() => setInventoryToDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Management */}
          {activeTab === 'customers' && (
            <div className="customer-management">
              <div className="section-header">
                <h2>Customer Management</h2>
                <p>View and manage customer information</p>
              </div>
              
              <div className="customers-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Orders</th>
                      <th>Total Spent</th>
                      <th>Last Order</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(customer => (
                      <tr key={customer.id}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">{customer.name.charAt(0)}</div>
                            {customer.name}
                          </div>
                        </td>
                        <td>
                          <div className="contact-info">
                            <div>{customer.email}</div>
                            <div className="phone">{customer.phone}</div>
                          </div>
                        </td>
                        <td>{customer.totalOrders}</td>
                        <td>${customer.totalSpent}</td>
                        <td>{customer.lastOrder}</td>
                        <td>
                          <div className="action-buttons-small">
                            <button 
                              className="btn-secondary"
                              onClick={() => setCustomerDetails(customer)}
                            >
                              View
                            </button>
                            <button 
                              className="btn-edit"
                              onClick={() => startEditCustomer(customer)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => setCustomerToDelete(customer)}
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
        </main>
      </div>

      {/* Order Details Modal */}
      {orderDetails && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Order #{orderDetails.id} Details</h3>
              <button onClick={() => setOrderDetails(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="order-details-full">
                <div className="detail-group">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {orderDetails.customer}</p>
                  <p><strong>Phone:</strong> {orderDetails.phone}</p>
                  <p><strong>Address:</strong> {orderDetails.address}</p>
                </div>
                <div className="detail-group">
                  <h4>Order Information</h4>
                  <p><strong>Service:</strong> {orderDetails.service}</p>
                  <p><strong>Weight:</strong> {orderDetails.weight} kg</p>
                  <p><strong>Price:</strong> ${orderDetails.price}</p>
                  <p><strong>Status:</strong> {orderDetails.status}</p>
                  <p><strong>Assigned To:</strong> {orderDetails.assignedTo || 'Not assigned'}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setOrderDetails(null)} className="btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Machine Modal */}
      <dialog id="addMachineModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add New Machine</h3>
            <button onClick={() => document.getElementById('addMachineModal').close()} className="modal-close">✕</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>Machine Type</label>
                <select
                  value={newMachine.type}
                  onChange={(e) => setNewMachine({...newMachine, type: e.target.value})}
                  className="form-input"
                >
                  <option value="Washer">Washer</option>
                  <option value="Dryer">Dryer</option>
                  <option value="Ironer">Ironer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newMachine.status}
                  onChange={(e) => setNewMachine({...newMachine, status: e.target.value})}
                  className="form-input"
                >
                  <option value="Available">Available</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Out of Service">Out of Service</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newMachine.location}
                  onChange={(e) => setNewMachine({...newMachine, location: e.target.value})}
                  className="form-input"
                  placeholder="Enter machine location"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => document.getElementById('addMachineModal').close()} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleAddMachine} className="btn-primary">
              Add Machine
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Inventory Modal */}
      <dialog id="addInventoryModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Add Inventory Item</h3>
            <button onClick={() => document.getElementById('addInventoryModal').close()} className="modal-close">✕</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  value={newInventory.item}
                  onChange={(e) => setNewInventory({...newInventory, item: e.target.value})}
                  className="form-input"
                  placeholder="Enter item name"
                />
              </div>
              <div className="form-group">
                <label>Current Stock</label>
                <input
                  type="number"
                  value={newInventory.currentStock}
                  onChange={(e) => setNewInventory({...newInventory, currentStock: parseInt(e.target.value)})}
                  className="form-input"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Low Stock Alert</label>
                <input
                  type="number"
                  value={newInventory.lowStock}
                  onChange={(e) => setNewInventory({...newInventory, lowStock: parseInt(e.target.value)})}
                  className="form-input"
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newInventory.category}
                  onChange={(e) => setNewInventory({...newInventory, category: e.target.value})}
                  className="form-input"
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Supplies">Supplies</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  value={newInventory.supplier}
                  onChange={(e) => setNewInventory({...newInventory, supplier: e.target.value})}
                  className="form-input"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => document.getElementById('addInventoryModal').close()} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleAddInventory} className="btn-primary">
              Add Item
            </button>
          </div>
        </div>
      </dialog>

      {/* Delete Confirmation Modals */}
      {orderToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Order</h3>
              <button onClick={() => setOrderToDelete(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <h4>Delete Order #{orderToDelete.id}?</h4>
                <p>Customer: {orderToDelete.customer}</p>
                <p>Service: {orderToDelete.service}</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setOrderToDelete(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteOrder} className="btn-danger">
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}

      {machineToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Remove Machine</h3>
              <button onClick={() => setMachineToDelete(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <h4>Remove {machineToDelete.type} #{machineToDelete.id}?</h4>
                <p>Location: {machineToDelete.location}</p>
                <p className="warning-text">This will permanently remove this machine from the system.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setMachineToDelete(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteMachine} className="btn-danger">
                Remove Machine
              </button>
            </div>
          </div>
        </div>
      )}

      {inventoryToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Inventory Item</h3>
              <button onClick={() => setInventoryToDelete(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <h4>Delete {inventoryToDelete.item}?</h4>
                <p>Current Stock: {inventoryToDelete.currentStock}</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setInventoryToDelete(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteInventory} className="btn-danger">
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {customerToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Customer</h3>
              <button onClick={() => setCustomerToDelete(null)} className="modal-close">✕</button>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <h4>Delete {customerToDelete.name}?</h4>
                <p>Email: {customerToDelete.email}</p>
                <p>Total Orders: {customerToDelete.totalOrders}</p>
                <p className="warning-text">This will permanently remove this customer and their history.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setCustomerToDelete(null)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteCustomer} className="btn-danger">
                Delete Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDashboard;