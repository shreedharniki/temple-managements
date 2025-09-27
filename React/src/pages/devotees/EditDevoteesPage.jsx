import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function EditDevoteesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch devotee by ID
  useEffect(() => {
    const fetchDevotee = async () => {
      try {
        const res = await apiGet(`/devotees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res);
      } catch (err) {
        setAlert({ type: "error", message: "❌ Failed to load devotee" });
      } finally {
        setLoading(false);
      }
    };
    fetchDevotee();
  }, [id, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async () => {
    const { id: _id, created_at, ...updateData } = form; // exclude read-only fields
    try {
      await apiPut(`/devotees/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Devotee updated successfully" });
      setTimeout(() => navigate("/devotees-table"), 1000);
    } catch (err) {
      console.error("API Error:", err);
      setAlert({ type: "error", message: "❌ Failed to update devotee" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No devotee found</p>;

  // Map DB fields → user-friendly labels
  const labelMap = {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    mobile: "Mobile Number",
    city: "City",
    state: "State",
    gothra:"Gothra",
    nakshatra:"nakshatra",
    rashi:"Rashi",
    date_of_birth:"Date Of Brith",
    date_of_marriage:"Date Of Marriage",
    country:"Country",
    pincode:"Pincode"

  };


  // Generate fields dynamically (skip id & created_at)
  const fields = Object.keys(form)
    .filter((key) => key !== "id" && key !== "created_at")
    .map((key) => ({
      name: key,
      label: labelMap[key] || key, // fallback to raw key if no mapping
    }));

  return (
    <div className="p-6">
      <div className="header">
        <h2>🙏 Edit Devotee</h2>
        <Button className="add-btn">
          <Link to="/devotees-table">📋 Devotees List</Link>
        </Button>
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="💾 Save Changes"
      />
    </div>
  );
}

export default EditDevoteesPage;
