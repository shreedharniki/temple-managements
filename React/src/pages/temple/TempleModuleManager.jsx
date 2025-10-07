import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/helpers";
import { useParams } from "react-router-dom";

const TempleModuleManager = () => {
  const { id: templeId } = useParams();
  const [allModules, setAllModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);

  // Fetch all modules
  const fetchAllModules = async () => {
    try {
      const res = await apiGet("/modules");
      setAllModules(res.data || res);
    } catch (err) {
      console.error("Failed to fetch modules:", err);
    }
  };

  // Fetch enabled modules for this temple
  const fetchAssignedModules = async () => {
    try {
      const res = await apiGet(`/templeModules/${templeId}`);
      const assigned = (res.data || res)
        .filter((mod) => mod.is_enabled === 1)
        .map((m) => m.module_id);
      setSelectedModules(assigned);
    } catch (err) {
      console.error("Failed to fetch assigned modules:", err);
    }
  };

  useEffect(() => {
    fetchAllModules();
    fetchAssignedModules();
  }, [templeId]);

  // Toggle module selection
  const handleChange = (e) => {
    const moduleId = parseInt(e.target.value);
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  // Save module assignments
  const handleSave = async () => {
    const payload = allModules.map((mod) => ({
      moduleId: mod.id,
      is_enabled: selectedModules.includes(mod.id) ? 1 : 0,
    }));

    try {
      await apiPost("/templeModules", { templeId: parseInt(templeId), modules: payload });
      alert("Modules updated successfully!");
      fetchAssignedModules();
    } catch (err) {
      console.error("Failed to save modules:", err);
      alert("Failed to update modules");
    }
  };

  // Group modules by category
  const groupedModules = allModules.reduce((acc, mod) => {
    if (!acc[mod.category]) acc[mod.category] = [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  return (
    <div style={{ padding: "1rem", maxWidth: 600 }}>
      <h2>Manage Modules for Temple</h2>

      {Object.entries(groupedModules).map(([category, mods]) => (
        <div key={category} style={{ marginBottom: "1.5rem" }}>
          <h4>{category} Modules</h4>
          {mods.map((mod) => (
            <div key={mod.id}>
              <label>
                <input
                  type="checkbox"
                  value={mod.id}
                  checked={selectedModules.includes(mod.id)}
                  onChange={handleChange}
                />{" "}
                {mod.name}{" "}
                <span style={{ color: selectedModules.includes(mod.id) ? "green" : "red" }}>
                  ({selectedModules.includes(mod.id) ? "Enabled" : "Disabled"})
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSave}
        style={{ padding: "8px 16px", marginTop: "1rem", cursor: "pointer" }}
      >
        Save Modules
      </button>
    </div>
  );
};

export default TempleModuleManager;
