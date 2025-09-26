import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiPost } from "../../utils/helpers";

function TemplePage() {
  const [form, setForm] = useState({ name: "", location: "", description: "" });
  const [alert, setAlert] = useState(null);

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
      <h2 className="text-2xl font-bold mb-4">🏛️ Add Temple</h2>

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
