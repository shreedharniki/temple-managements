import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { apiGet } from "../utils/helpers"; 
import PujaCard from "./PujaCard";
import "./Dashboard.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Puja services data
  const pujaServices = [
    { title: "Astothara / Archana", price: 10 },
    { title: "Bilwarchane", price: 10 },
    { title: "Rudrabhisheka 7am", price: 350 },
    { title: "Rice Packet Min", price: 25 },
    { title: "2 Wheeler", price: 75 },
    { title: "3 Wheeler", price: 150 },
    { title: "4 Wheeler", price: 200 },
    { title: "Pooja items-Flowers Banana Coconut etc.", price: 50 },
  ];

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
          { title: "Devotees", value: devoteesRes.length, icon: "👤" },
          { 
            title: "Revenue / Donations", 
            value: donationsRes.reduce((sum, d) => sum + Number(d.amount || 0), 0), 
            icon: "💰" 
          },
          { title: "Temples", value: templesRes.length, icon: "📦" },
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

  const pieData = [
    { name: "Admin", value: 400 },
    { name: "Editor", value: 300 },
    { name: "Viewer", value: 500 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard</h2>

      {/* Stat Cards */}
      <div className="cards-container">
        {loading ? <p>Loading...</p> : stats.map((stat, idx) => (
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
        ))}
      </div>

      {/* Charts */}
      <div className="charts-container">
         
        <div className="pie-card">
           <h3>🙏 Puja Services Token</h3>
          <div className="puja-cards-container">
          {pujaServices.map((service, idx) => (
            <PujaCard key={idx} title={service.title} price={service.price} />
          ))}
          </div>
        </div>
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

      

      
    </div>
  );
}
