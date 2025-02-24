import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import myContext from "@/context/data/myContext";

const salesData = [
  { name: "Jan", sales: 4000, orders: 2400 },
  { name: "Feb", sales: 3000, orders: 2210 },
  { name: "Mar", sales: 5000, orders: 2290 },
  { name: "Apr", sales: 6000, orders: 2000 },
  { name: "May", sales: 7000, orders: 2780 },
];

const categorySales = [
  { name: "Electronics", value: 5000 },
  { name: "Clothing", value: 3000 },
  { name: "Home & Kitchen", value: 2000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const DashboardOverview = () => {
  const { mode } = useContext(myContext);
  const isDarkMode = mode === "dark";

  return (
    <div
      className={`p-6  flex-1 md:flex flex-col  shadow-md rounded-md transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">Sales & Orders Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`p-4 shadow-lg rounded-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3 className="text-lg font-medium mb-2">Sales & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#4A5568" : "#ccc"}
              />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#E2E8F0" : "#4A5568"}
              />
              <YAxis stroke={isDarkMode ? "#E2E8F0" : "#4A5568"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#2D3748" : "#fff",
                  borderColor: isDarkMode ? "#4A5568" : "#ccc",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`p-4 shadow-lg rounded-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3 className="text-lg font-medium mb-2">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {categorySales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#2D3748" : "#fff",
                  borderColor: isDarkMode ? "#4A5568" : "#ccc",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
