import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { validateAdminForm } from "../../utils/validation";
import { useParams, useNavigate } from "react-router-dom";

function EditAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", temple_id: "" });
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminRes = await apiGet(`/admin/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setForm({ name: adminRes.name || "", email: adminRes.email || "", phone: adminRes.phone || "", password: "", temple_id: adminRes.temple_id || "" });

        const templesRes = await apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } });
        const options = (templesRes.data || templesRes).map((t) => ({ value: t.id, label: t.name }));
        setTemples(options);
      } catch (err) {
        setAlert({ type: "error", message: "❌ Failed to load admin/temples" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && /^\d{0,10}$/.test(value)) {
      setForm((prev) => ({ ...prev, [name]: value }));
    } else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validation = validateAdminForm(form, true);
    if (!validation.valid) {
      setAlert({ type: "error", message: validation.message });
      return;
    }
    try {
      await apiPut(`/admin/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Admin updated successfully" });
      setTimeout(() => navigate("/admin-table"), 1200);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to update admin" });
    }
  };

  // Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) return <p>Loading...</p>;

  const fields = [
    { name: "name", label: "Admin Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "number" },
    { name: "password", label: "Password (leave blank to keep same)", type: "text", placeholder: "Optional" },
    { name: "temple_id", label: "Temple", type: "select", options: [{ value: "", label: "Select temple" }, ...temples] },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Edit Admin</h2>
      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}
      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditAdminPage;
