import React from 'react';
import StaffDashboard from './pages/StaffDashboard';
import StaffLogin from './pages/StaffLogin';
import { StaffAuthProvider, useStaffAuth } from './hooks/useStaffAuth';
import { StaffOrdersProvider } from './hooks/useStaffOrders';
import { MachinesProvider, useMachines } from './hooks/useMachines';
import { InventoryProvider, useInventory } from './hooks/useInventory';

export { 
  StaffDashboard, 
  StaffLogin, 
  StaffAuthProvider, 
  useStaffAuth,
  StaffOrdersProvider,
  MachinesProvider,
  useMachines,
  InventoryProvider,
  useInventory
};

export default StaffDashboard;