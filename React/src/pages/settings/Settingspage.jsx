import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/ui/IconButton"; // assuming it supports icon + label

function SettingsPage() {
  const navigate = useNavigate();

  const settingsOptions = [
    { label: "Manage Deity", path: "/deity-table" },
    { label: "Manage Seva", path: "/seva-table" },
    { label: "Manage Donation", path: "/donation-type" },
    { label: "Manage User Roles", path: "/user-roles" },
  ];

  return (
    <div className=" p-6">
   <h2>Settings</h2>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
           
        {settingsOptions.map((option, index) => (
          <IconButton
            key={index}
            label={option.label}
            className=""
            onClick={() => navigate(option.path)}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsPage;
