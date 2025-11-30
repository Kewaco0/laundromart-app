import React, { useState } from 'react';
import { useStaffAuth } from '../hooks/useStaffAuth';
import { useStaffOrders } from '../hooks/useStaffOrders';
import { useMachines } from '../hooks/useMachines';
import { useInventory } from '../hooks/useInventory';

// Components
import StaffHeader from '../components/StaffHeader';
import StaffSidebar from '../components/StaffSidebar';
import DashboardHome from '../components/DashboardHome';
import OrderManagement from '../components/OrderManagement';
import MachineManagement from '../components/MachineManagement';
import CustomerManagement from '../components/CustomerManagement';
import InventoryManagement from '../components/InventoryManagement';
import NotificationsPanel from '../components/NotificationsPanel';

const StaffDashboard = () => {
  const { staff, logout } = useStaffAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'orders':
        return <OrderManagement />;
      case 'machines':
        return <MachineManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <DashboardHome />;
    }
  };

  if (!staff) {
    return null; // Should be handled by router
  }

  return (
    <div className="staff-dashboard">
      <StaffHeader 
        staff={staff} 
        onLogout={logout}
        onNotificationsToggle={() => setShowNotifications(!showNotifications)}
      />
      
      <div className="staff-dashboard-content">
        <StaffSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          staffRole={staff.role}
        />
        
        <main className="staff-main-content">
          {renderContent()}
        </main>

        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;