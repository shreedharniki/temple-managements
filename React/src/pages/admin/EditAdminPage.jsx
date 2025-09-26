import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

function EditAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // ✅ track form state separately
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch admin + temples
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminRes = await apiGet(`/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(adminRes); // prefill form with admin data

        const templesRes = await apiGet("/temples", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const options = (templesRes.data || templesRes).map((t) => ({
          value: t.id,
          label: t.name,
        }));
        setTemples(options);
      } catch (err) {
        setAlert({ type: "error", message: "❌ Failed to load admin/temples" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async () => {
    try {
      await apiPut(`/admin/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Admin updated successfully" });
      setTimeout(() => navigate("/admin"), 1200);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to update admin" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No admin found</p>;

  const fields = [
    { name: "name", label: "Admin Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "number" },
    {
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Leave blank to keep same",
    },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select temple" }, ...temples],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Edit Admin</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}  // ✅ now handles typing
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditAdminPage;
