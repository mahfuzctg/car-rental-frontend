import React, { useState } from "react";
import { FaFilter, FaPrint } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample data
const data = [
  { name: "January", carUsage: 12, revenue: 1500 },
  { name: "February", carUsage: 19, revenue: 2300 },
  { name: "March", carUsage: 3, revenue: 800 },
  { name: "April", carUsage: 5, revenue: 1200 },
  { name: "May", carUsage: 2, revenue: 900 },
  { name: "June", carUsage: 3, revenue: 1100 },
];

const Reports: React.FC = () => {
  const [interval, setInterval] = useState("monthly");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 w-[95%] h-[80%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reports</h1>

      {/* Filter Section */}
      <div className="mb-4 flex items-center bg-green-500 p-2 rounded">
        <label className="mr-2 text-white">Filter By:</label>
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <FaFilter className="ml-2 text-gray-600" />
      </div>

      {/* Report Charts */}
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Car Usage</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <BarChart width={window.innerWidth * 0.9} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carUsage" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <LineChart width={window.innerWidth * 0.9} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Car Usage Distribution</h2>
          <div style={{ width: "100%", height: "400px" }}>
            <PieChart width={window.innerWidth * 0.9} height={400}>
              <Tooltip />
              <Legend />
              <Pie
                data={data}
                dataKey="carUsage"
                nameKey="name"
                outerRadius={150}
                fill="#8884d8"
                label
              />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
      >
        <FaPrint className="mr-2" /> Print Report
      </button>
    </div>
  );
};

export default Reports;
