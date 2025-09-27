import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { apiGet, apiDelete } from "../utils/helpers"; 
// import axios from "axios";
import "./Dashboard.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Dashboard() {
  const [stats, setStats] = useState([
    { title: "devotees", value: 0, icon: "👤" },
    { title: "Revenue/donations", value: 0, icon: "💰" },
    { title: "temples", value: 0, icon: "📦" },
    { title: "Bookings", value: 0, icon: "💬" },
  ]);

  const [loading, setLoading] = useState(true);

   
 useEffect(() => {
  const fetchStats = async () => {
    try {
      const [templesRes, donationsRes, devoteesRes, bookingsRes] = await Promise.all([
        apiGet("/temples"),
        apiGet("/donations"),
        apiGet("/devotees"),
        apiGet("/bookings"),
      ]);

      setStats([
        { title: "devotees", value: devoteesRes.length, icon: "👤" },
        { 
          title: "Revenue/donations", 
          value: donationsRes.reduce((sum, d) => sum + Number(d.amount || 0), 0), 
          icon: "💰" 
        },
        { title: "temples", value: templesRes.length, icon: "📦" },
        { title: "Bookings", value: bookingsRes.length, icon: "💬" },
      ]);
    } catch (err) {
      console.error("❌ Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  // Example pie chart (static for now, but you can replace with real data later)
  const pieData = [
    { name: "Admin", value: 400 },
    { name: "Editor", value: 300 },
    { name: "Viewer", value: 500 },
  ];

  return (
    <div>
      <h2 className="dashboard-title">📊 Dashboard</h2>

      {/* Stat Cards */}
      <div className="cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          stats.map((stat, idx) => (
            <div className="card" key={idx}>
              <div className="card-icon">{stat.icon}</div>
              <div className="card-content">
                <div className="card-value">
                  {stat.title.includes("Revenue")
                    ? `₹${stat.value.toLocaleString()}`
                    : stat.value}
                </div>
                <div className="card-title">{stat.title}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pie Chart Card */}
      <div className="pie-card">
        <h3>User Roles Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
