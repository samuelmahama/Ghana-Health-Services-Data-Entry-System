import React from 'react';
import { Package, Users, FileSpreadsheet, Bell } from 'lucide-react';
import DashboardStats from './DashboardStats';

export default function DashboardHome() {
  const stats = [
    { title: 'Total Drugs', value: '2,345', icon: Package, change: '+12%' },
    { title: 'Active Users', value: '48', icon: Users, change: '+3%' },
    { title: 'Reports Generated', value: '156', icon: FileSpreadsheet, change: '+8%' },
    { title: 'Pending Actions', value: '5', icon: Bell, change: '-2%' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <DashboardStats stats={stats} />
    </div>
  );
}