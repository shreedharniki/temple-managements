import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";

function EditUserTypePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    temple_id: 28, // default temple
  });
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch user role and temples
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roleRes = await apiGet(`/usertype/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const templeRes = await apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } });
        const options = (templeRes.data || templeRes).map((t) => ({ value: t.id, label: t.name }));

        setTemples([{ value: "", label: "Select temple" }, ...options]);
        setForm({
          name: roleRes.name || "",
          description: roleRes.description || "",
          temple_id: roleRes.temple_id || 28,
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "❌ Failed to load role or temples" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }
    try {
      await apiPut(`/usertype/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Role updated successfully!" });
      setTimeout(() => navigate("/user-type-table"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update role" });
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
    { name: "name", label: "Role Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "temple_id", label: "Temple", type: "select", options: temples },
  ];

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h2>👤 Edit User Role</h2>
        <IconButton icon={FaList} label="Role List" onClick={() => navigate("/user-type-table")} />
      </div>

      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditUserTypePage;
