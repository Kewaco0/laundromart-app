import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStaffAuth } from './useStaffAuth';

const StaffOrdersContext = createContext();

export const StaffOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { staff, token } = useStaffAuth();

  useEffect(() => {
    if (staff) {
      fetchOrders();
      // Set up real-time updates (WebSocket or polling)
      const interval = setInterval(fetchOrders, 30000); // Poll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [staff]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/staff/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const ordersData = await res.json();
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/staff/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
        return { success: true };
      }
      return { success: false, error: 'Failed to update status' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const assignOrder = async (orderId, staffId) => {
    try {
      const res = await fetch(`/api/staff/orders/${orderId}/assign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ staffId })
      });

      if (res.ok) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, assignedStaff: staffId } : order
        ));
        return { success: true };
      }
      return { success: false, error: 'Failed to assign order' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const addOrderNote = async (orderId, note) => {
    try {
      const res = await fetch(`/api/staff/orders/${orderId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note })
      });

      if (res.ok) {
        return { success: true };
      }
      return { success: false, error: 'Failed to add note' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const value = {
    orders,
    loading,
    fetchOrders,
    updateOrderStatus,
    assignOrder,
    addOrderNote
  };

  return (
    <StaffOrdersContext.Provider value={value}>
      {children}
    </StaffOrdersContext.Provider>
  );
};

export const useStaffOrders = () => {
  const context = useContext(StaffOrdersContext);
  if (!context) {
    throw new Error('useStaffOrders must be used within StaffOrdersProvider');
  }
  return context;
};