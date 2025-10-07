import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import { FaList } from "react-icons/fa";
import { validateTempleForm } from "../../utils/validation";

function EditTemplePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch temple by ID
  useEffect(() => {
    const fetchTemple = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/temples/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res.data || res);
      } catch (err) {
        console.error("Failed to load temple:", err);
        setAlert({ type: "error", message: "❌ Failed to load temple" });
      } finally {
        setLoading(false);
      }
    };

    fetchTemple();
  }, [id, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async () => {
    // if (!form.name || !form.location) {
    //   setAlert({ type: "error", message: "❌ Please fill required fields" });
    //   return;
    // }
 const { valid, message } = validateTempleForm(form);
    if (!valid) {
      setAlert({ type: "error", message });
      return;
    }
    const { id: _id, created_at, ...updateData } = form;

    try {
      await apiPut(`/temples/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Temple updated successfully" });
      setTimeout(() => navigate("/temple-table"), 1000);
    } catch (err) {
      console.error("API Error:", err);
      setAlert({ type: "error", message: "❌ Failed to update temple" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No temple found</p>;

  // Generate form fields dynamically (skip read-only)
  const fields = Object.keys(form)
    .filter((key) => key !== "id" && key !== "created_at")
    .map((key) => ({
      name: key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }));

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}
      >
        <h2>🏛️ Edit Temple</h2>
        <IconButton
          icon={FaList}
          label="Temple List"
          onClick={() => navigate("/temple-table")}
        />
      </div>

      {alert && <Alert type={alert.type} onClose={() => setAlert(null)}>{alert.message}</Alert>}

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

export default EditTemplePage;
