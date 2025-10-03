import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut, apiGet as apiGetTemples } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

function EditDonationTypePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    amount: "",
    temple_id: "",
  });
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch donation type and temples
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donation type by ID
        const donationRes = await apiGet(`/donationtype/${id}`, {
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

        setTemples([{ value: "", label: "Select temple" }, ...options]);

        setForm({
          name: donationRes.name || "",
          amount: donationRes.amount || "",
          temple_id: donationRes.temple_id || "",
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "❌ Failed to load donation type or temples" });
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
    if (!form.name || !form.amount || !form.temple_id) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }

    try {
      await apiPut(`/donationtype/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Donation type updated successfully!" });
      setTimeout(() => navigate("/donation-type-table"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update donation type" });
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
    { name: "name", label: "Donation Type Name", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "temple_id", label: "Temple", type: "select", options: temples },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Edit Donation Type</h2>
      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}
      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditDonationTypePage;
