import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
// import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import Form from "../../components/ui/Form";
import { apiGet, apiPost, apiPut } from "../../utils/helpers";

function DonationPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    amount: "",
    payment_method: "cash",
    remarks: "",
    temple_id: "",
    user_id: "",
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dropdown options
  const [temples, setTemples] = useState([]);
  const [devotees, setDevotees] = useState([]);

  // Fetch options + donation (if editing)
  useEffect(() => {
    const fetchData = async () => {
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

        // Donation (if edit mode)
        if (id) {
          setLoading(true);
          const donationRes = await apiGet(`/donations/${id}`);
          setForm(donationRes.data || donationRes);
        }
      } catch (err) {
        console.error("Failed to load data", err);
        setAlert({ type: "error", message: "❌ Failed to load donation form" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  // Form fields
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
    },
    { name: "remarks", label: "Remarks", type: "textarea" },
    {
      name: "temple_id",
      label: "Temple",
      type: "select",
      options: [{ value: "", label: "Select Temple" }, ...temples],
    },
    {
      name: "user_id",
      label: "Devotee",
      type: "select",
      options: [{ value: "", label: "Select Devotee" }, ...devotees],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        await apiPut(`/donations/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlert({ type: "success", message: "✅ Donation updated successfully!" });
      } else {
        await apiPost("/donations", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlert({ type: "success", message: "✅ Donation added successfully!" });
        setForm({
          amount: "",
          payment_method: "cash",
          remarks: "",
          temple_id: "",
          user_id: "",
        });
      }

      setTimeout(() => navigate("/donations"), 1000);
    } catch (err) {
      console.error("Donation API Error:", err.response || err);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "❌ Failed to save donation",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {id ? "✏️ Edit Donation" : "➕ Add Donation"}
        </h2>
        <Button>
          <Link to="/donation-table">Donation List</Link>
        </Button>
      </div>

      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {loading ? (
        <Loader />
      ) : (
        <Form
          fields={fields}
          values={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel={id ? "Update Donation" : "Create Donation"}
        />
      )}
    </div>
  );
}

export default DonationPage;
