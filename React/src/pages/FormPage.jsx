import React, { useState } from "react";
import Form from "../components/ui/Form";
// import Alert from "../components/ui/Alert";

function FormPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [alert, setAlert] = useState(null);

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "", label: "Select role" },
        { value: "admin", label: "Admin" },
        { value: "editor", label: "Editor" },
        { value: "viewer", label: "Viewer" },
      ],
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) {
      setAlert({ type: "error", message: "❌ Please fill all fields" });
      return;
    }
    setAlert({ type: "success", message: "✅ Form submitted successfully!" });
    setForm({ name: "", email: "", role: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Dynamic Form Page</h2>

     

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save"
      />
    </div>
  );
}

export default FormPage;
