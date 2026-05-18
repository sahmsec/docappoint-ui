'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from './axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await api.get('/api/auth/me');
        if (data.success) {
          setUser(data.data);
        }
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setUser(data.data);
    }
    return data;
  };

  const register = async (name, email, password, photoURL) => {
    const { data } = await api.post('/api/auth/register', { name, email, password, photoURL });
    return data;
  };

  const googleLogin = async (googleData) => {
    const { data } = await api.post('/api/auth/google', googleData);
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setUser(data.data);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const updateProfile = async (profileData) => {
    const { data } = await api.put('/api/auth/profile', profileData);
    if (data.success) {
      setUser(data.data);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
