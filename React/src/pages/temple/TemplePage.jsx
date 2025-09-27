import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiPost } from "../../utils/helpers";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function TemplePage() {
  const [form, setForm] = useState({ name: "", location: "", description: "" });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const fields = [
    { name: "name", label: "Temple Name", type: "text", placeholder: "Enter temple name" },
    { name: "location", label: "Location", type: "text", placeholder: "Enter location" },
    { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.location) {
      setAlert({ type: "error", message: "❌ Please fill required fields" });
      return;
    }

    try {
      await apiPost("/temples", form);
      setAlert({ type: "success", message: "✅ Temple added successfully!" });
      setForm({ name: "", location: "", description: "" });
      // Optional: redirect to temple list after adding
      // setTimeout(() => navigate("/temple-table"), 1000);
    } catch (err) {
      console.error("Temple add error:", err);
      setAlert({ type: "error", message: "❌ Failed to add temple" });
    }
  };

  if (role !== "super_admin") {
    return <div className="p-6">🚫 You don’t have permission to add temples.</div>;
  }

  return (
    <div className="p-6">
      <div className="header">
        <h2>🏛️ Add Temple</h2>
        <Button className="add-btn">
          <Link to="/temple-table">📋 Temple List</Link>
        </Button>
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Temple"
      />
    </div>
  );
}

export default TemplePage;
