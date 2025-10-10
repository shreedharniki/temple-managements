import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { apiGet } from "../../utils/helpers";

const ModuleProtectedRoute = ({ moduleName }) => {
  const temple_id = localStorage.getItem("temple_id");
  const [allowed, setAllowed] = useState(null); // null = loading
  const [error, setError] = useState(null);

  const checkModule = async () => {
    try {
      const modulesRes = await apiGet("/modules");
      const allModules = modulesRes.data || modulesRes;
      const moduleObj = allModules.find(
        (m) => m.name.toLowerCase() === moduleName.toLowerCase()
      );

      if (!moduleObj) {
        console.warn(`⚠️ Module "${moduleName}" not found in system`);
        setAllowed(false);
        return;
      }

      const templeModulesRes = await apiGet(`/templeModules/${temple_id}`);
      const assignedModules = templeModulesRes.data || templeModulesRes;
      const modStatus = assignedModules.find(
        (m) => m.module_id === moduleObj.id
      );

      setAllowed(modStatus?.is_enabled === 1);
    } catch (err) {
      console.error("Module access check failed:", err);
      setError("Failed to verify module access");
      setAllowed(false);
    }
  };

  useEffect(() => {
    checkModule();
  }, [moduleName]);

  if (allowed === null) {
    return <div className="p-6">⏳ Checking access permission...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">⚠️ {error}</div>;
  }

  if (!allowed) {
    return (
      <div className="p-6 text-red-600">
        ❌ Access denied — The <b>{moduleName}</b> module is not enabled for this temple.
      </div>
    );
  }

  return <Outlet />;
};

export default ModuleProtectedRoute;
