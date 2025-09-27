import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";
import Dialog from "../../components/ui/Dialog";
import Loader from "../../components/ui/Loader";

function EditSevaBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch booking + temples
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the booking data
        const bookingRes = await apiGet(`/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm(bookingRes.data || bookingRes);

        // Fetch temples for the select dropdown
        const templesRes = await apiGet("/temples", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTemples(
          (templesRes.data || templesRes).map((t) => ({
            value: t.id,
            label: t.name,
          }))
        );
      } catch (err) {
        setAlert({
          type: "error",
          message: "❌ Failed to load booking or temples",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated booking
  const handleSubmit = async () => {
    try {
      // Build payload matching DB columns
      const payload = {
        devotee_name: form.devotee_name || "",
        seva_date: form.seva_date || "",
        temple_id: form.temple_id ? parseInt(form.temple_id) : 0,
        deity_name: form.deity_name || "",
        seva_name: form.seva_name || "",
        gothra: form.gothra || "",
        nakshatra: form.nakshatra || "",
        rashi: form.rashi || "",
        amount: form.amount ? parseFloat(form.amount) : 0,
        staff_id: form.staff_id ? parseInt(form.staff_id) : null,
        status: form.status || "confirmed",
        name: form.name || "",
        occasion: form.occasion || "",
        remarks: form.remarks || "",
      };

      console.log("Submitting payload:", payload);

      await apiPut(`/bookings/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlert({ type: "success", message: "✅ Booking updated successfully" });
      setTimeout(() => navigate("/seva-bookings"), 1200);
    } catch (err) {
      setAlert({ type: "error", message: "❌ Failed to update booking" });
      console.error("Booking update error:", err.response || err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>No booking found</p>;

  // Form fields matching DB columns
  const fields = [
    { name: "devotee_name", label: "Devotee Name", type: "text" },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select Temple" }, ...temples],
    },
    { name: "seva_date", label: "Seva Date", type: "date" },
    { name: "deity_name", label: "Deity", type: "text" },
    { name: "seva_name", label: "Seva", type: "text" },
    { name: "gothra", label: "Gothra", type: "text" },
    { name: "nakshatra", label: "Nakshatra", type: "text" },
    { name: "rashi", label: "Rashi", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "staff_id", label: "Staff ID", type: "number" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "confirmed", label: "Confirmed" },
        { value: "pending", label: "Pending" },
        { value: "cancelled", label: "Cancelled" },
      ],
    },
    { name: "name", label: "Name", type: "text" },
    { name: "occasion", label: "Occasion", type: "text" },
    { name: "remarks", label: "Remarks", type: "text" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Seva Booking</h2>

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

export default EditSevaBookingPage;
