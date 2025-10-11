import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPost } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";

function SevaPage() {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
   
    temple_id: "",
  });

  const [temples, setTemples] = useState([]);
  const [alert, setAlert] = useState(null);

 
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } });
        const options = (res.data || res).map((t) => ({ value: t.id, label: t.name }));
        setTemples([{ value: "", label: "Select temple" }, ...options]);
      } catch (err) {
        console.error("Failed to fetch temples:", err);
      }
    };
    fetchTemples();
  }, [token]);

  const fields = [
    { name: "name", label: "Deity Name", type: "text", placeholder: "Enter seva name" },
   
    { name: "temple_id", label: "Temple", type: "select", options: temples },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name  || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }
    try {
      await apiPost("/deity", form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Deity added successfully!" });
      setForm({ name: "", temple_id: "" });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to add Deity" });
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (role !== "super_admin" && role !== "admin") {
    return <div className="p-6">🚫 You don’t have permission to add seva.</div>;
  }

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>🙏 Add Deity</h2>
        <IconButton icon={FaList} label="Deity List" onClick={() => navigate("/deity-table")} />
      </div>

      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Deity Seva" />
    </div>
  );
}

export default SevaPage;
