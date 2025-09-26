import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

function EditTemplePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null); // ✅ keep editable form state
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch temple by ID
  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const res = await apiGet(`/temples/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res); // ✅ store temple in form state
      } catch (err) {
        setAlert({ type: "error", message: "❌ Failed to load temple" });
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
  }, [id, token]);

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ submit update
  const handleSubmit = async () => {
    try {
      await apiPut(`/temples/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Temple updated successfully" });

      setTimeout(() => navigate("/temples"), 1000);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to update temple" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No temple found</p>;

  // Dynamically generate fields (skip id & created_at)
  const fields = Object.keys(form)
    .filter((key) => key !== "id" && key !== "created_at")
    .map((key) => ({ name: key, label: key }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> 🏛️ Edit Temple</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form
        fields={fields}
        values={form}          // ✅ controlled state
        onChange={handleChange} // ✅ updates on typing
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditTemplePage;
