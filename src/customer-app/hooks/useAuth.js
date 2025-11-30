import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API || 'http://localhost:4000';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch(e) { 
        handleLogout();
      }
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(API + '/api/login', {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        return { success: true };
      } else {
        return { success: false, error: 'Login failed!' };
      }
    } catch (error) {
      return { success: false, error: 'Error: ' + error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, name, password) => {
    setLoading(true);
    try {
      const res = await fetch(API + '/api/register', {
        method: 'POST', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email, name, password })
      });
      
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        return { success: true };
      } else {
        return { success: false, error: 'Registration failed!' };
      }
    } catch (error) {
      return { success: false, error: 'Error: ' + error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return {
    token,
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated: !!token
  };
};