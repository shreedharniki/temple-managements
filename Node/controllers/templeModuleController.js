const TempleModule = require("../models/templeModuleModel");
const db = require("../config/db");
exports.getModulesByTemple = (req, res) => {
  const { templeId } = req.params;

  TempleModule.getByTempleId(templeId, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch modules" });
    res.json(results);
  });
};



exports.assignModulesToTemple = (req, res) => {
  const { templeId, modules } = req.body;

  // Prepare values: [temple_id, module_id, is_enabled]
  const values = modules.map(mod => [templeId, mod.moduleId, mod.is_enabled]);

  const sql = `
    INSERT INTO temple_modules (temple_id, module_id, is_enabled)
    VALUES ?
    ON DUPLICATE KEY UPDATE is_enabled = VALUES(is_enabled)
  `;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error updating temple_modules:", err);
      return res.status(500).json({ error: "Failed to update modules" });
    }
    res.json({ message: "Modules updated successfully", result });
  });
};
