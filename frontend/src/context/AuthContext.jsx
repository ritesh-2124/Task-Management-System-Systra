import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/users/login`, { email, password });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return true;
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (email, password , username) => {
    try {
      const res = await axios.post(`${API}/api/users/register`, { email, password , username });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return true;
    } catch (error) {
      alert(error?.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
