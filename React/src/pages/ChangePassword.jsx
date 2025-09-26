// src/pages/ChangePassword.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/ui/Form";
import { changePassword } from "../store/authSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const { loading, alert } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fields = [
    {
      name: "oldPassword",
      label: "Old Password",
      type: "password",
      placeholder: "Enter old password",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm new password",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return dispatch({
        type: "auth/setAlert",
        payload: { type: "error", message: "❌ Please fill all fields" },
      });
    }

    if (newPassword !== confirmPassword) {
      return dispatch({
        type: "auth/setAlert",
        payload: {
          type: "error",
          message: "❌ New password and confirm password do not match",
        },
      });
    }

    dispatch(changePassword({ oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
       
      })
      .catch(() => {
        
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">🔑 Change Password</h2>

      {alert && (
        <div
          className={`p-3 mb-4 rounded ${
            alert.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alert.message}
        </div>
      )}

      <Form
        fields={fields}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={loading ? "Saving..." : "Save"}
      />
    </div>
  );
}
