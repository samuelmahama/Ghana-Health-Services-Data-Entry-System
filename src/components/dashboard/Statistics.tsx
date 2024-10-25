import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function Statistics() {
  // Sample data - replace with actual data from your drug management
  const drugPriceData = [
    { name: 'Paracetamol', quoted: 2.5, market: 3.0 },
    { name: 'Amoxicillin', quoted: 5.0, market: 6.5 },
    { name: 'Metformin', quoted: 3.0, market: 4.0 },
    { name: 'Ibuprofen', quoted: 2.0, market: 2.5 },
  ];

  const institutionDistribution = [
    { name: 'Central Hospital', value: 30 },
    { name: 'Regional Clinic', value: 25 },
    { name: 'District Hospital', value: 20 },
    { name: 'Community Center', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Statistics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Comparison Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Price Comparison</h2>
          <BarChart width={500} height={300} data={drugPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quoted" fill="#8884d8" name="Quoted Price" />
            <Bar dataKey="market" fill="#82ca9d" name="Market Price" />
          </BarChart>
        </div>

        {/* Institution Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Institution Distribution</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={institutionDistribution}
              cx={250}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {institutionDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}