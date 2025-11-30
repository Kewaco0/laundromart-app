import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API || 'http://localhost:4000';

export const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(API + '/api/orders', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Mock data for demo
      setOrders([
        { id: 1, service_type: 'Wash', weight: 5, price: 25, status: 'Completed' },
        { id: 2, service_type: 'Wash & Dry', weight: 3, price: 18, status: 'Processing' },
        { id: 3, service_type: 'Full Service', weight: 8, price: 45, status: 'Pending' }
      ]);
    }
  };

  const createOrder = async (orderData) => {
    if (!orderData.weight || orderData.weight <= 0) {
      return { success: false, error: 'Please enter a valid weight' };
    }
    
    try {
      // Mock implementation
      const newOrder = {
        id: Date.now(),
        ...orderData,
        status: 'Pending'
      };
      setOrders(prev => [...prev, newOrder]);
      return { success: true, data: newOrder };
    } catch (error) {
      return { success: false, error: 'Failed to create order: ' + error.message };
    }
  };

  const updateOrder = async (orderId, updates) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      ));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update order' };
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to cancel order' };
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      setOrders(prev => prev.filter(order => order.id !== orderId));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to delete order' };
    }
  };

  return {
    orders,
    loading,
    fetchOrders,
    createOrder,
    updateOrder,
    cancelOrder,
    deleteOrder
  };
};