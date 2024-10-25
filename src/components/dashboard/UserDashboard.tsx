import React from 'react';
import { Package, Bell, Search, ClipboardList } from 'lucide-react';
import DashboardStats from './DashboardStats';
import AssignedDrugs from './AssignedDrugs';

export default function UserDashboard() {
  const stats = [
    { title: 'Assigned Drugs', value: '48', icon: Package, change: '+5%' },
    { title: 'Pending Updates', value: '3', icon: ClipboardList, change: '-2%' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">GHS Drug Management</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search drugs..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Assigned Drugs Section */}
        <div className="mt-8">
          <AssignedDrugs />
        </div>
      </main>
    </div>
  );
}