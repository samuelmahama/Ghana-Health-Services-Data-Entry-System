import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSignup from './components/auth/AdminSignup';
import AdminLogin from './components/auth/AdminLogin';
import Login from './components/auth/Login';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Ghana Health Services
                </h1>
                <p className="text-gray-600 mb-6">
                  Drug Management System - Admin Portal
                </p>
                <div className="space-y-4">
                  <a
                    href="/admin/signup"
                    className="block w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Admin Registration
                  </a>
                  <a
                    href="/admin/login"
                    className="block w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                  >
                    Admin Login
                  </a>
                </div>
              </div>
            </div>
          } 
        />
        <Route path="/user/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route
          path="/admin/*"
          element={
            isAuthenticated && user?.role === 'ADMIN' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/user/*"
          element={
            isAuthenticated && user?.role === 'USER' ? (
              <UserDashboard />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;