import React, { useState, useEffect } from "react";
import Form from "../components/ui/Form";
import Alert from "../components/ui/Alert";
import { apiGet, apiPost } from "../utils/helpers";

function DevoteesPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gothra: "",
    nakshatra: "",
    rashi: "",
    date_of_birth: "",
    date_of_marriage: "",
    email: "",
    mobile: "",
    mobile_alternate: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [alert, setAlert] = useState(null);
  const [devotees, setDevotees] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch existing devotees
  useEffect(() => {
    const fetchDevotees = async () => {
      try {
        const res = await apiGet("/devotees", { headers: { Authorization: `Bearer ${token}` } });
        setDevotees(res.data || res);
      } catch (err) {
        console.error("Failed to fetch devotees:", err);
      }
    };
    fetchDevotees();
  }, [token]);

  const fields = [
    { name: "first_name", label: "First Name", placeholder: "Enter first name" },
    { name: "last_name", label: "Last Name", placeholder: "Enter last name" },
    { name: "gothra", label: "Gothra", placeholder: "Enter gothra" },
    { name: "nakshatra", label: "Nakshatra", placeholder: "Enter nakshatra" },
    { name: "rashi", label: "Rashi", placeholder: "Enter rashi" },
    { name: "date_of_birth", label: "Date of Birth", type: "date" },
    { name: "date_of_marriage", label: "Date of Marriage", type: "date" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile", label: "Mobile", placeholder: "Enter mobile" },
    { name: "mobile_alternate", label: "Alternate Mobile", placeholder: "Enter alternate mobile" },
    { name: "address1", label: "Address 1", placeholder: "Enter address line 1" },
    { name: "address2", label: "Address 2", placeholder: "Enter address line 2" },
    { name: "city", label: "City", placeholder: "Enter city" },
    { name: "state", label: "State", placeholder: "Enter state" },
    { name: "country", label: "Country", placeholder: "Enter country" },
    { name: "pincode", label: "Pincode", placeholder: "Enter pincode" },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.first_name || !form.last_name || !form.email || !form.mobile) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }

    try {
      await apiPost("/devotees", form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Devotee added successfully!" });
      setForm({
        first_name: "", last_name: "", gothra: "", nakshatra: "", rashi: "",
        date_of_birth: "", date_of_marriage: "", email: "", mobile: "",
        mobile_alternate: "", address1: "", address2: "", city: "", state: "",
        country: "", pincode: ""
      });

      const res = await apiGet("/devotees", { headers: { Authorization: `Bearer ${token}` } });
      setDevotees(res.data || res);
    } catch (err) {
      console.error("Failed to add devotee:", err);
      setAlert({ type: "error", message: "❌ Failed to add devotee" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">➕ Add Devotee</h2>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Devotee" />

      
    </div>
  );
}

export default DevoteesPage;
