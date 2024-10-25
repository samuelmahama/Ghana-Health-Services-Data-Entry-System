import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pill, 
  Users, 
  BarChart2, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import DashboardHome from './DashboardHome';
import DrugManagement from './DrugManagement';
import UserManagement from './UserManagement';
import Statistics from './Statistics';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Pill, label: 'Drug Management', path: '/admin/drugs' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: BarChart2, label: 'Statistics', path: '/admin/statistics' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex justify-between items-center">
          <span className={`font-bold text-xl ${!isSidebarOpen && 'hidden'}`}>GHS Admin</span>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-indigo-700 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors duration-200"
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-indigo-700 hover:text-white transition-colors duration-200"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/drugs" element={<DrugManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}