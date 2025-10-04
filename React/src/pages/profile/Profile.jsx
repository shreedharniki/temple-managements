import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/helpers";
import "./Profile.css";

export default function TempleSettingsList() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiGet("/settings"); // GET all settings
        setSettings(res.data || res);
      } catch (err) {
        console.error("❌ Failed to fetch temple settings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) return <p>⏳ Loading temple settings...</p>;
  if (settings.length === 0) return <p>❌ No temple settings found</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">🏛️ All Temple Settings</h2>

      <div className="settings-list">
        {settings.map((temple) => (
          <div key={temple.temple_id} className="profile-grid">
            <h3>Temple ID: {temple.temple_id}</h3>
            {temple.logo && <img src={temple.logo} alt="Temple Logo" className="temple-logo" />}
            <div><strong>Founded Year:</strong> {temple.founded_year}</div>
            <div><strong>Phone:</strong> {temple.phone}</div>
            <div><strong>Email:</strong> {temple.email}</div>
            <div><strong>Address:</strong> {temple.address}</div>
            <div><strong>Color Theme:</strong> <span style={{ color: temple.color_theme }}>{temple.color_theme}</span></div>
            <div><strong>Sidebar:</strong> {temple.sidebar ? "Enabled" : "Disabled"}</div>
            <div><strong>Navbar:</strong> {temple.navbar ? "Enabled" : "Disabled"}</div>
            {temple.map && (
              <div>
                <strong>Map:</strong>{" "}
                <a href={temple.map} target="_blank" rel="noreferrer">
                  View Location
                </a>
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
