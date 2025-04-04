import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<PrivateRoute><Todo /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/todo" />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
