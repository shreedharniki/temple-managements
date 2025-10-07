import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPost } from "../../utils/helpers";
import {isFutureDate} from "../../utils/date"
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";

function SevaBookingPage() {
  const [form, setForm] = useState({
    devotee_name: "",
    seva_date: "",
    temple_id: "",
    deity_name: "",
    seva_name: "",
    gothra: "",
    nakshatra: "",
    rashi: "",
    amount: "",
    status: "confirmed",
  });

  const [alert, setAlert] = useState(null);
  const [temples, setTemples] = useState([]);
  const [deities, setDeities] = useState([]);
  const [sevas, setSevas] = useState([]);
  const [devotees, setDevotees] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch dropdown options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Devotees
        const devoteeRes = await apiGet("/devotees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDevotees(
          (devoteeRes.data || devoteeRes).map((d) => ({
            value: `${d.first_name} ${d.last_name}`,
            label: `${d.first_name} ${d.last_name}`,
          }))
        );

        // Temples
        const templeRes = await apiGet("/temples", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTemples(
          (templeRes.data || templeRes).map((t) => ({
            value: t.id,
            label: t.name,
          }))
        );

        // Deities
        const deityRes = await apiGet("/deity", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeities(
          (deityRes.data || deityRes).map((d) => ({
            value: d.name,
            label: d.name,
          }))
        );

        // Sevas
        const sevaRes = await apiGet("/seva", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSevas(
          (sevaRes.data || sevaRes).map((s) => ({
            value: s.name,
            label: s.name,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch options", err);
        setAlert({ type: "error", message: "Failed to load form options" });
      }
    };

    fetchOptions();
  }, [token]);

  // Form fields
  const fields = [
    {
      name: "devotee_name",
      label: "Devotee",
      type: "select",
      options: [{ value: "", label: "Select Devotee" }, ...devotees],
    },
    { name: "seva_date", label: "Seva Date", type: "date" },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select Temple" }, ...temples],
    },
    {
      name: "deity_name",
      label: "Deity",
      type: "select",
      options: [{ value: "", label: "Select Deity" }, ...deities],
    },
    {
      name: "seva_name",
      label: "Seva",
      type: "select",
      options: [{ value: "", label: "Select Seva" }, ...sevas],
    },
    { name: "amount", label: "Amount", type: "number", placeholder: "Enter Amount" },
    {
      name: "gothra",
      label: "Gothra",
      type: "select",
      options: [
        { value: "", label: "Select Gothra" },
        { value: "Bharadwaj", label: "Bharadwaj" },
        { value: "Kashyap", label: "Kashyap" },
        { value: "Vashishtha", label: "Vashishtha" },
        { value: "Vishwamitra", label: "Vishwamitra" },
        { value: "Gautam", label: "Gautam" },
        { value: "Atri", label: "Atri" },
        { value: "Agastya", label: "Agastya" },
        { value: "Jamadagni", label: "Jamadagni" },
        { value: "Kaushik", label: "Kaushik" },
      ],
    },
    {
      name: "nakshatra",
      label: "Nakshatra",
      type: "select",
      options: [
        { value: "", label: "Select Nakshatra" },
        { value: "Ashwini", label: "Ashwini" },
        { value: "Bharani", label: "Bharani" },
        { value: "Krittika", label: "Krittika" },
        { value: "Rohini", label: "Rohini" },
        { value: "Mrigashira", label: "Mrigashira" },
      ],
    },
    {
      name: "rashi",
      label: "Rashi",
      type: "select",
      options: [
        { value: "", label: "Select Rashi" },
        { value: "Mesha (Aries)", label: "Mesha (Aries)" },
        { value: "Vrishabha (Taurus)", label: "Vrishabha (Taurus)" },
      ],
    },
  ];

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!isFutureDate(form.seva_date)) {
      setAlert({
        type: "warning",
        message: "⚠️ Please select a future date for Seva.",
      });
      return;
    }
      const payload = {
        ...form,
        temple_id: form.temple_id ? parseInt(form.temple_id) : null,
        amount: form.amount ? parseFloat(form.amount) : 0,
      };

      await apiPost("/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAlert({ type: "success", message: "✅ Booking created successfully!" });

      // Reset form
      setForm({
        devotee_name: "",
        seva_date: "",
        temple_id: "",
        deity_name: "",
        seva_name: "",
        gothra: "",
        nakshatra: "",
        rashi: "",
        amount: "",
        status: "confirmed",
      });
    } catch (err) {
      console.error("Booking API Error:", err.response || err);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "❌ Failed to create booking",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">➕ Seva Booking</h2>
        <Button className="add-btn">
          <Link to="/seva-bookings-table">Seva Booking List</Link>
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
        submitLabel="Create Booking"
      />
    </div>
  );
}

export default SevaBookingPage;
