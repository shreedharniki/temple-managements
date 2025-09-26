import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate,Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function EditDevoteesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch temple by ID
  useEffect(() => {
    const fetchTemple = async () => {
      try {
        const res = await apiGet(`/devotees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(res);
      } catch (err) {
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
    // Remove read-only fields before sending
    const { id: _id, created_at, ...updateData } = form;

    try {
      await apiPut(`/devotees/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ devotees updated successfully" });
      setTimeout(() => navigate("/devotees-table"), 1000);
    } catch (err) {
      console.log("API Error:", err);
      setAlert({ type: "error", message: "❌ Failed to update devotees" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No devotees found</p>;

  // Generate fields dynamically (skip id & created_at)
  const fields = Object.keys(form)
    .filter((key) => key !== "id" && key !== "created_at")
    .map((key) => ({ name: key, label: key }));

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">🏛️ Edit Temple</h2> */}

      <div className="header">
        <h2>🏛️ Edit Temple</h2>
            <Button  className="add-btn"><Link to="/devotees-table">devotees List</Link></Button>
        
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

export default EditDevoteesPage;
