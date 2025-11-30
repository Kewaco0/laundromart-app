import React from 'react';

const CustomerManagement = () => {
  const customers = [
    { id: 1, name: 'John Doe', phone: '+1234567890', orders: 5, totalSpent: 125 },
    { id: 2, name: 'Jane Smith', phone: '+1234567891', orders: 3, totalSpent: 75 },
    { id: 3, name: 'Mike Johnson', phone: '+1234567892', orders: 8, totalSpent: 200 }
  ];

  return (
    <div className="customer-management">
      <div className="section-header">
        <h2>Customer Management</h2>
        <div className="search-box">
          <input type="text" placeholder="Search customers..." className="search-input" />
        </div>
      </div>
      
      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.orders}</td>
                <td>${customer.totalSpent}</td>
                <td>
                  <button className="btn-secondary">View History</button>
                  <button className="btn-primary">Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;