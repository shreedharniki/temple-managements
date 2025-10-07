import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function EditSevaPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const sevaId = location.state?.id; // get ID from state passed from table

  useEffect(() => {
    if (!sevaId) {
      setAlert({ type: "error", message: "❌ No Seva ID provided" });
      setLoading(false);
      return;
    }
    const fetchSeva = async () => {
      try {
        const sevaRes = await apiGet(`/seva/${sevaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          name: sevaRes.name || "",
          description: sevaRes.description || "",
          amount: sevaRes.amount || "",
          seats: sevaRes.seats || "",
          maxlimit: sevaRes.maxlimit || "",
          temple_id: temple_id || "",
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "❌ Failed to load seva" });
      } finally {
        setLoading(false);
      }
    };
    fetchSeva();
  }, [sevaId, token, temple_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.amount || !form.seats || !form.maxlimit) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }
    try {
      await apiPut(`/seva/${sevaId}`, form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Seva updated successfully!" });
      setTimeout(() => navigate("/seva"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update seva" });
    }
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) return <p>Loading...</p>;

  const fields = [
    { name: "name", label: "Seva Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "seats", label: "Seats", type: "number" },
    { name: "maxlimit", label: "Max Limit", type: "number" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🙏 Edit Seva</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditSevaPage;
