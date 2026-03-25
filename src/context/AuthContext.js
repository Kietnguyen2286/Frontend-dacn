import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await ApiService.login(username, password);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        setError(null);
        return { success: true, user: response.user };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (err) {
      const errorMsg = 'Failed to login. Please try again.';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setError(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
