import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/Login';
import Register from './components/Register';
import Counter from './components/Counter';
import { isAuthenticated } from './utils/auth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirects to counter if already logged in)
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/counter" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="App"
      >
        <Routes>
          {/* Default route - redirect to login or counter */}
          <Route 
            path="/" 
            element={
              isAuthenticated() ? 
                <Navigate to="/counter" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          
          {/* Login Route */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Register Route */}
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Counter Route - Protected */}
          <Route 
            path="/counter" 
            element={
              <ProtectedRoute>
                <Counter />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to login */}
          <Route 
            path="*" 
            element={<Navigate to="/login" replace />} 
          />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App; 