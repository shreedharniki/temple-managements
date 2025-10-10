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
  const temple_id = localStorage.getItem("temple_id");

  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    seats: "",
    maxlimit: "",
    temple_id: temple_id || "",
  });

  const [alert, setAlert] = useState(null);
  const [moduleEnabled, setModuleEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Dynamically check if Seva module is enabled
  const fetchModuleStatus = async () => {
    try {
      // 1️⃣ Get all modules
      const modulesRes = await apiGet("/modules");
      const allModules = modulesRes.data || modulesRes;
      const sevaModule = allModules.find(
        (mod) => mod.name.toLowerCase() === "seva"
      );

      if (!sevaModule) {
        console.warn("⚠️ Seva module not found in system");
        setModuleEnabled(false);
        setLoading(false);
        return;
      }

      // 2️⃣ Get temple-specific modules
      const templeModulesRes = await apiGet(`/templeModules/${temple_id}`);
      const assignedModules = templeModulesRes.data || templeModulesRes;

      // 3️⃣ Check if Seva module is enabled
      const sevaModuleStatus = assignedModules.find(
        (m) => m.module_id === sevaModule.id
      );

      setModuleEnabled(sevaModuleStatus?.is_enabled === 1);
    } catch (err) {
      console.error("Failed to fetch module status", err);
      setModuleEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleStatus();
  }, [temple_id]);

  const fields = [
    { name: "name", label: "Seva Name", type: "text", placeholder: "Enter seva name" },
    { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
    { name: "amount", label: "Amount", type: "number", placeholder: "Enter amount" },
    { name: "seats", label: "Seats", type: "number", placeholder: "Enter seats" },
    { name: "maxlimit", label: "Max Limit", type: "number", placeholder: "Enter max limit" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.amount || !form.seats || !form.maxlimit || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }
    try {
      await apiPost("/seva", form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Seva added successfully!" });
      setForm({ name: "", description: "", amount: "", seats: "", maxlimit: "", temple_id });
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to add seva" });
    }
  };

  // const handleRequestEnable = async () => {
  //   try {
  //     await apiPost("/seva/request-enable", {
  //       temple_id,
  //       module_name: "seva",
  //       message: "Request to enable Seva module",
  //     });
  //     setAlert({ type: "success", message: "✅ Request sent to super admin!" });
  //   } catch {
  //     setAlert({ type: "error", message: "❌ Failed to send request" });
  //   }
  // };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (role !== "super_admin" && role !== "admin") {
    return <div className="p-6">🚫 You don’t have permission to add seva.</div>;
  }

  if (loading) {
    return <div className="p-6">⏳ Checking module status...</div>;
  }

  return (
    <div className="p-6">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>🙏 Add Seva</h2>
      
         
        <IconButton icon={FaList} label="Seva List" onClick={() => navigate("/seva-table")} />
       
      </div>

      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}

      {moduleEnabled ? (
        <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Seva" />
      ) : (
        <div>
          <p>❌ The Seva module is currently disabled for this temple.</p>
          {/* <button
            onClick={handleRequestEnable}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Request to Enable Seva Module
          </button> */}
        </div>
      )}
    </div>
  );
}

export default SevaPage;
