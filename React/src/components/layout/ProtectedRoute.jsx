// src/components/ProtectedRoute.js
// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const role = useSelector((state) => state.auth.role); // get role from Redux

  // Not logged in
  if (!role) return <Navigate to="/" />;

  // Role not allowed
  if (!allowedRoles.includes(role)) return <Navigate to="/dashboard" />;

  // Role allowed, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
