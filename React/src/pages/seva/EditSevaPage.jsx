// import React, { useState, useEffect } from "react";
// import Form from "../../components/ui/Form";
// import Alert from "../../components/ui/Alert";
// import { apiGet, apiPut } from "../../utils/helpers";
// import { useParams, useNavigate } from "react-router-dom";

// function EditSevaPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     amount: "",
//     seats: "",
//     maxlimit: "",
//     temple_id: "",
//   });

//   const [temples, setTemples] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState(null);

//   // Fetch seva and temples
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch seva by ID
//         const sevaRes = await apiGet(`/seva/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Fetch temples for dropdown
//         const templesRes = await apiGet("/temples", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const options = (templesRes.data || templesRes).map((t) => ({
//           value: t.id,
//           label: t.name,
//         }));

//         // Pre-select temple that matches seva's temple_id
//         const selectedTemple =
//           options.find((t) => t.value === sevaRes.temple_id) || {
//             value: "",
//             label: "Select temple",
//           };

//         setTemples([{ value: "", label: "Select temple" }, ...options]);
//         setForm({
//           name: sevaRes.name || "",
//           description: sevaRes.description || "",
//           amount: sevaRes.amount || "",
//           seats: sevaRes.seats || "",
//           maxlimit: sevaRes.maxlimit || "",
//           temple_id: selectedTemple.value,
//         });
//       } catch (err) {
//         console.error(err);
//         setAlert({ type: "error", message: "❌ Failed to load seva or temples" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.amount || !form.seats || !form.maxlimit || !form.temple_id) {
//       setAlert({ type: "error", message: "❌ Please fill all required fields" });
//       return;
//     }

//     try {
//       await apiPut(`/seva/${id}`, form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAlert({ type: "success", message: "✅ Seva updated successfully!" });
//       setTimeout(() => navigate("/seva-table"), 1200);
//     } catch (err) {
//       console.error(err);
//       setAlert({ type: "error", message: "❌ Failed to update seva" });
//     }
//   };

//   // Auto-dismiss alerts
//   useEffect(() => {
//     if (alert) {
//       const timer = setTimeout(() => setAlert(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   if (loading) return <p>Loading...</p>;

//   const fields = [
//     { name: "name", label: "Seva Name", type: "text" },
//     { name: "description", label: "Description", type: "text" },
//     { name: "amount", label: "Amount", type: "number" },
//     { name: "seats", label: "Seats", type: "number" },
//     { name: "maxlimit", label: "Max Limit", type: "number" },
//     { name: "temple_id", label: "Temple", type: "select", options: temples },
//   ];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🙏 Edit Seva</h2>
//       {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}
//       <Form
//         fields={fields}
//         values={form}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         submitLabel="Save Changes"
//       />
//     </div>
//   );
// }

// export default EditSevaPage;

import React, { useState, useEffect } from "react";
import Form from "../../components/ui/Form";
import Alert from "../../components/ui/Alert";
import { apiGet, apiPut } from "../../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

function EditSevaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const temple_id = localStorage.getItem("temple_id"); // fixed typo

  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "",
    seats: "",
    maxlimit: "",
    temple_id: temple_id || "",
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  // Fetch seva data
  useEffect(() => {
    const fetchSeva = async () => {
      try {
        const sevaRes = await apiGet(`/seva/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: sevaRes.name || "",
          description: sevaRes.description || "",
          amount: sevaRes.amount || "",
          seats: sevaRes.seats || "",
          maxlimit: sevaRes.maxlimit || "",
          temple_id: temple_id || "",
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: "error", message: "❌ Failed to load seva" });
      } finally {
        setLoading(false);
      }
    };

    fetchSeva();
  }, [id, token, temple_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.amount || !form.seats || !form.maxlimit) {
      setAlert({ type: "error", message: "❌ Please fill all required fields" });
      return;
    }

    try {
      await apiPut(`/seva/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      setAlert({ type: "success", message: "✅ Seva updated successfully!" });
      setTimeout(() => navigate("/seva-table"), 1200);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "❌ Failed to update seva" });
    }
  };

  // Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (loading) return <p>Loading...</p>;

  const fields = [
    { name: "name", label: "Seva Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "seats", label: "Seats", type: "number" },
    { name: "maxlimit", label: "Max Limit", type: "number" },
    // temple_id is fixed from token, so no select field
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🙏 Edit Seva</h2>
      {alert && <Alert type={alert.type} message={alert.message} className="text-black" />}
      <Form fields={fields} values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}

export default EditSevaPage;
