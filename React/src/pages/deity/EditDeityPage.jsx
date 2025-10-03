import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

function EditDeityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
   
    temple_id: "",
  });

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch Deity and temples
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Deity by ID
        const sevaRes = await apiGet(`/deity/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch temples for dropdown
        const templesRes = await apiGet("/temples", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const options = (templesRes.data || templesRes).map((t) => ({
          value: t.id,
          label: t.name,
        }));

        // Pre-select temple that matches deity's temple_id
        const selectedTemple =
          options.find((t) => t.value === sevaRes.temple_id) || {
            value: "",
            label: "Select temple",
          };

        setTemples([{ value: "", label: "Select temple" }, ...options]);
        setForm({
          name: sevaRes.name || "",
          
          temple_id: selectedTemple.value,
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "❌ Failed to load seva or temples" });
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
      await apiPut(`/deity/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Deity updated successfully!" });
      setTimeout(() => navigate("/deity-table"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update Deity" });
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
    { name: "name", label: "Seva Name", type: "text" },
   
    { name: "temple_id", label: "Temple", type: "select", options: temples },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🙏 Edit Deity</h2>
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

export default EditDeityPage;
