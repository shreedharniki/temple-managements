import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevotees, addDevotee, clearAlert } from "../../store/devoteesSlice";
import { useNavigate, Link } from "react-router-dom";

function DevoteesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error, success } = useSelector((state) => state.devotees);

  const [form, setForm] = useState({
    first_name: "", last_name: "", gothra: "", nakshatra: "", rashi: "",
    date_of_birth: "", date_of_marriage: "", email: "", mobile: "",
    mobile_alternate: "", address1: "", address2: "", city: "", state: "",
    country: "", pincode: ""
  });

  useEffect(() => {
    dispatch(fetchDevotees());
  }, [dispatch]);

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

  const handleSubmit = () => {
    if (!form.first_name || !form.last_name || !form.email || !form.mobile) {
      return alert("❌ Please fill all required fields");
    }
    dispatch(addDevotee(form));
    setForm({
      first_name: "", last_name: "", gothra: "", nakshatra: "", rashi: "",
      date_of_birth: "", date_of_marriage: "", email: "", mobile: "",
      mobile_alternate: "", address1: "", address2: "", city: "", state: "",
      country: "", pincode: ""
    });
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">➕ Add Devotee</h2>
        <Button className="add-btn"><Link to="/devotees-table">Devotee List</Link></Button>
      </div>

      {error && <Alert type="error" onClose={() => dispatch(clearAlert())}>{error}</Alert>}
      {success && <Alert type="success" onClose={() => dispatch(clearAlert())}>{success}</Alert>}

      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Devotee" />
    </div>
  );
}

export default DevoteesPage;
