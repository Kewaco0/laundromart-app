import React, { createContext, useContext, useState, useEffect } from 'react';

const StaffAuthContext = createContext();

export const StaffAuthProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('staffToken'));

  useEffect(() => {
    if (token) {
      verifyStaffToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyStaffToken = async () => {
    try {
      const res = await fetch('/api/staff/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const staffData = await res.json();
        setStaff(staffData);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setStaff(data.staff);
        localStorage.setItem('staffToken', data.token);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setStaff(null);
    setToken(null);
    localStorage.removeItem('staffToken');
  };

  const value = {
    staff,
    login,
    logout,
    loading,
    isAuthenticated: !!staff,
    hasRole: (role) => staff?.role === role,
    hasPermission: (permission) => staff?.permissions?.includes(permission)
  };

  return (
    <StaffAuthContext.Provider value={value}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export const useStaffAuth = () => {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error('useStaffAuth must be used within StaffAuthProvider');
  }
  return context;
};