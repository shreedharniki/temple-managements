import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../../utils/helpers";
import Loader from "../../components/ui/Loader";
import Alert from "../../components/ui/Alert";
import IconButton from "../../components/ui/IconButton";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function ViewTempleSettings() {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiGet(`/settings/temple/${templeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings(res.data || res);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setAlert({ type: "error", message: "❌ Failed to load temple settings" });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [templeId, token]);

  if (loading) return <Loader />;
  if (!settings) return <p>No settings found for this temple.</p>;

  return (
    <div className="p-6">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h2>⚙️ Temple Settings</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            icon={FaArrowLeft}
            label="Back"
            onClick={() => navigate("/temple-table")}
            variant="secondary"
          />
          <IconButton
            icon={FaEdit}
            label="Edit"
            onClick={() => navigate(`/temples/edit/${templeId}`)}
          />
        </div>
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <div
        style={{
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          maxWidth: "500px",
        }}
      >
        {settings.logo && (
          <img
            src={settings.logo}
            alt="Temple Logo"
            style={{ height: "80px", marginBottom: "12px" }}
          />
        )}
        <p><strong>Temple ID:</strong> {settings.temple_id}</p>
        <p>
          <strong>Theme Color:</strong>{" "}
          <span style={{ color: settings.color_theme }}>
            {settings.color_theme}
          </span>
        </p>
        <p><strong>Sidebar:</strong> {settings.sidebar ? "✅ Enabled" : "❌ Disabled"}</p>
        <p><strong>Navbar:</strong> {settings.navbar ? "✅ Enabled" : "❌ Disabled"}</p>
        <p>
          <strong>Map:</strong>{" "}
          <a href={settings.map} target="_blank" rel="noreferrer">
            View Location
          </a>
        </p>
        <p><strong>Phone:</strong> {settings.phone}</p>
        <p><strong>Email:</strong> {settings.email}</p>
        <p><strong>Address:</strong> {settings.address}</p>
        <p><strong>Founded Year:</strong> {settings.founded_year}</p>
      </div>
    </div>
  );
}

export default ViewTempleSettings;
