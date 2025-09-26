import React, { useState } from "react";
import Form from "../components/ui/Form";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);

  const fields = [
    { name: "oldPassword", label: "Old Password", type: "password", placeholder: "Enter old password" },
    { name: "newPassword", label: "New Password", type: "password", placeholder: "Enter new password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm new password" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setAlert({ type: "error", message: "❌ Please fill all fields" });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setAlert({ type: "error", message: "❌ New password and confirm password do not match" });
      return;
    }

    // Here you can call API to change password
    setAlert({ type: "success", message: "✅ Password changed successfully!" });
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">🔑 Change Password</h2>
      {alert && <div className={`alert ${alert.type}`}>{alert.message}</div>}
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
