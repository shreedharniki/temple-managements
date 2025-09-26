const SettingsModel = require("../models/settingsModel");

exports.createOrUpdateSettings = (req, res) => {
  SettingsModel.createOrUpdate(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getAllSettings = (req, res) => {
  SettingsModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getSettingsByTemple = (req, res) => {
  SettingsModel.getByTempleId(req.params.templeId, (err, settings) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!settings) return res.status(404).json({ error: "Settings not found" });
    res.json(settings);
  });
};

exports.deleteSettings = (req, res) => {
  SettingsModel.delete(req.params.templeId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
