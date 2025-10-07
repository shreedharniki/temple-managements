import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiPost } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";
import { validateTempleForm } from "../../utils/validation";
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
    // if (!form.name || !form.location) {
    //   setAlert({ type: "error", message: "❌ Please fill required fields" });
    //   return;
    // }

    // ✅ Use centralized validation
    const { valid, message } = validateTempleForm(form);
    if (!valid) {
      setAlert({ type: "error", message });
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
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>🏛️ Add Temple</h2>
        <IconButton icon={FaList} label="Temple List" onClick={() => navigate("/temple-table")} />
      </div>

      {alert && <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert>}

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
