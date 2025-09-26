import React, { useState, useEffect } from "react";
import Form from "../components/ui/Form";
import Alert from "../components/ui/Alert";
import { apiGet, apiPost } from "../utils/helpers";

function SevaBookingPage() {
  const [form, setForm] = useState({
    nameof: "",
    gothra_id: "",
    temple_id: "",
    deity_id: "",
    seva_id: "",
    nakshatra_id: "",
    rashi_id: "",
    devotee_id: "",
    calendar_id: "",
    amount: "",
    paymentmode_id: "",
    status: "confirmed",
  });

  const [alert, setAlert] = useState(null);
  const [temples, setTemples] = useState([]);
  const [deities, setDeities] = useState([]);
  const [sevas, setSevas] = useState([]);
  // const [paymentModes, setPaymentModes] = useState([]);
  const [devotees, setDevotees] = useState([]);
  const token = localStorage.getItem("token");

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
            value: d.id,
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
            value: d.id,
            label: d.name,
          }))
        );

        // Sevas
        const sevaRes = await apiGet("/seva", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSevas(
          (sevaRes.data || sevaRes).map((s) => ({
            value: s.id,
            label: s.name,
          }))
        );

      
        // setPaymentModes(
        //   (payRes.data || payRes).map((p) => ({
        //     value: p.id,
        //     label: p.name,
        //   }))
        // );
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
      name: "devotee_id",
      label: "Select Devotee",
      type: "select",
      options: [{ value: "", label: "Select Devotee" }, ...devotees],
    },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select Temple" }, ...temples],
    },
    {
      name: "deity_id",
      label: "Deity",
      type: "select",
      options: [{ value: "", label: "Select Deity" }, ...deities],
    },
    {
      name: "seva_id",
      label: "Seva",
      type: "select",
      options: [{ value: "", label: "Select Seva" }, ...sevas],
    },
    {
      name: "calendar_id",
      label: "Calendar ID",
      type: "text",
      placeholder: "Enter Calendar ID",
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter Amount",
    },
     {
      name: "paymentmode_id",
      label: "Payment Mode",
      type: "select",
      options: [
        { value: "", label: "SelectPayment Mode" },
        { value: 1, label: "online" },
        { value: 2, label: "cash" },
     
      ],
    },
    // {
    //   name: "paymentmode_id",
    //   label: "Payment Mode",
    //   type: "select",
    //   options: [{ value: "", label: "Select Payment Mode" }, ...paymentModes],
    // },

    // Gothra
    {
      name: "gothra_id",
      label: "Gothra",
      type: "select",
      options: [
        { value: "", label: "Select Gothra" },
        { value: 1, label: "Bharadwaj" },
        { value: 2, label: "Kashyap" },
        { value: 3, label: "Vashishtha" },
        { value: 4, label: "Vishwamitra" },
        { value: 5, label: "Gautam" },
        { value: 6, label: "Atri" },
        { value: 7, label: "Agastya" },
        { value: 8, label: "Jamadagni" },
        { value: 9, label: "Kaushik" },
      ],
    },

    // Nakshatra
    {
      name: "nakshatra_id",
      label: "Nakshatra",
      type: "select",
      options: [
        { value: "", label: "Select Nakshatra" },
        { value: 1, label: "Ashwini" },
        { value: 2, label: "Bharani" },
        { value: 3, label: "Krittika" },
        { value: 4, label: "Rohini" },
        { value: 5, label: "Mrigashira" },
        { value: 6, label: "Ardra" },
        { value: 7, label: "Punarvasu" },
        { value: 8, label: "Pushya" },
        { value: 9, label: "Ashlesha" },
        { value: 10, label: "Magha" },
        { value: 11, label: "Purva Phalguni" },
        { value: 12, label: "Uttara Phalguni" },
        { value: 13, label: "Hasta" },
        { value: 14, label: "Chitra" },
        { value: 15, label: "Swati" },
        { value: 16, label: "Vishakha" },
        { value: 17, label: "Anuradha" },
        { value: 18, label: "Jyeshtha" },
        { value: 19, label: "Mula" },
        { value: 20, label: "Purva Ashadha" },
        { value: 21, label: "Uttara Ashadha" },
        { value: 22, label: "Shravana" },
        { value: 23, label: "Dhanishta" },
        { value: 24, label: "Shatabhisha" },
        { value: 25, label: "Purva Bhadrapada" },
      ],
    },

    // Rashi
    {
      name: "rashi_id",
      label: "Rashi",
      type: "select",
      options: [
        { value: "", label: "Select Rashi" },
        { value: 1, label: "Mesha (Aries)" },
        { value: 2, label: "Vrishabha (Taurus)" },
        { value: 3, label: "Mithuna (Gemini)" },
        { value: 4, label: "Karka (Cancer)" },
        { value: 5, label: "Simha (Leo)" },
        { value: 6, label: "Kanya (Virgo)" },
        { value: 7, label: "Tula (Libra)" },
        { value: 8, label: "Vrischika (Scorpio)" },
        { value: 9, label: "Dhanu (Sagittarius)" },
        { value: 10, label: "Makara (Capricorn)" },
        { value: 11, label: "Kumbha (Aquarius)" },
        { value: 12, label: "Meena (Pisces)" },
      ],
    },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await apiPost("/bookings", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "✅ Booking created successfully!" });
      setForm({
        nameof: "",
        gothra_id: "",
        temple_id: "",
        deity_id: "",
        seva_id: "",
        nakshatra_id: "",
        rashi_id: "",
        devotee_id: "",
        calendar_id: "",
        amount: "",
        paymentmode_id: "",
        status: "confirmed",
      });
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message || "❌ Failed to create booking",
      });
    }
  };

  return (
    <>
    
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Seva Booking</h2>

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
    </>
    
  );
}

export default SevaBookingPage;
