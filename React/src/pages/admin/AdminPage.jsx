import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPost } from "../../utils/helpers";
// import Button from "../../components/ui/Button";
// import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";
function AdminPage() {
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    temple_id: "",
    role: "admin",
  });
  const [alert, setAlert] = useState(null);
  const [temples, setTemples] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const token = localStorage.getItem("token");

  // Fetch temple list for dropdown
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const res = await apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } });
        const options = (res.data || res).map((t) => ({ value: t.id, label: t.name }));
        setTemples(options);
       
      } catch (err) {
        console.error("Failed to fetch temples:", err);
      }
    };
    fetchTemples();
  }, [token]);

  const fields = [
    { name: "name", label: "Admin Name", type: "text", placeholder: "Enter admin name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    { name: "phone", label: "Phone", type: "number", placeholder: "Enter phone number" },
    { name: "password", label: "Password", type: "text", placeholder: "Enter password" },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select temple" }, ...temples],
    },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    // Validate required fields
    if (!form.name || !form.email || !form.phone || !form.password || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }

    try {
      await apiPost("/admin", form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Admin added successfully!" });
      setForm({ name: "", email: "", phone: "", password: "", temple_id: "" });
    } catch (err) {
      console.error("Admin add error:", err);
      setAlert({ type: "error", message: "❌ Failed to add admin" });
    }
  };

  if (role !== "super_admin") {
    return <div className="p-6">🚫 You don’t have permission to add admins.</div>;
  }

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">➕ Add Temple Admin</h2> */}
      {/* <div className="header">
        <h2>🏛️  Add Temple Admin </h2>
        <Button className="add-btn">
          <Link to="/admin-table">📋 Admin List</Link>
        </Button>
      </div> */}
      <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2>🏛️ Add Admin</h2>
              <IconButton icon={FaList} label="Admin List" onClick={() => navigate("/admin-table")} />
            </div>

      {alert && (
                <Alert type={alert.type} className="text-black" onClose={() => setAlert(null)}>
                    {alert.message}
                </Alert>
                )}


      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Admin"
      />
    </div>
  );
}

export default AdminPage;
