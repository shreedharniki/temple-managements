import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "../../components/ui/Form";
// import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";
import { apiGet, apiPut } from "../../utils/helpers";

function EditDonationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState(null);
  const [temples, setTemples] = useState([]);
  const [devotees, setDevotees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch donation & dropdowns
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [donationRes, templeRes, devoteeRes] = await Promise.all([
        apiGet(`/donations/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        apiGet("/temples", { headers: { Authorization: `Bearer ${token}` } }),
        apiGet("/devotees", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setForm(donationRes.data || donationRes);

      setTemples(
        (templeRes.data || templeRes).map((t) => ({ value: t.id, label: t.name }))
      );

      setDevotees(
        (devoteeRes.data || devoteeRes).map((d) => ({
          value: d.id,
          label: `${d.first_name} ${d.last_name}`,
        }))
      );
    } catch (err) {
      console.error("Failed to load donation or dropdowns", err);
      setAlert({ type: "error", message: "❌ Failed to load donation or dropdowns" });
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    if (token) fetchData();
  }, [token, fetchData]);

  if (loading) return <Loader />;
  if (!form) return <p>No donation found</p>;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const payload = {
        amount: parseFloat(form.amount) || 0,
        payment_method: form.payment_method || "cash",
        temple_id: parseInt(form.temple_id) || null,
        user_id: parseInt(form.user_id) || null,
        remarks: form.remarks || "",
      };

      await apiPut(`/donations/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlert({ type: "success", message: "✅ Donation updated successfully" });
      setTimeout(() => navigate("/donation-table"),  2000);
    } catch (err) {
      console.error("Donation update error:", err.response || err);
      const message =
        err.response?.data?.error || err.message || "❌ Failed to update donation";
      setAlert({ type: "error", message });
    }
  };

  const fields = [
    { name: "amount", label: "Amount", type: "number", required: true },
    {
      name: "payment_method",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "cash", label: "Cash" },
        { value: "card", label: "Card" },
        { value: "upi", label: "UPI" },
      ],
      required: true,
    },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select Temple" }, ...temples],
      required: true,
    },
    {
      name: "user_id",
      label: "Devotee",
      type: "select",
      options: [{ value: "", label: "Select Devotee" }, ...devotees],
      required: true,
    },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">✏️ Edit Donation</h2>
        <Button>
          <Link to="/donations-table">Donation List</Link>
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
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditDonationPage;
