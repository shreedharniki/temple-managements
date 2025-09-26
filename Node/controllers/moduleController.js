// const Module = require("../models/moduleModel");

// exports.getAllModules = (req, res) => {
//   Module.getAll((err, modules) => {
//     if (err) return res.status(500).json({ error: "Failed to fetch modules" });
//     res.json(modules);
//   });
// };

const Module = require("../models/moduleModel");

// Get all modules
exports.getAllModules = (req, res) => {
  Module.getAll((err, modules) => {
    if (err) return res.status(500).json({ error: "Failed to fetch modules" });
    res.json(modules);
  });
};

// Create a module
exports.createModule = (req, res) => {
  const newModule = req.body;
  Module.create(newModule, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to create module" });
    res.status(201).json({ message: "Module created", id: result.insertId });
  });
};

// Update a module
exports.updateModule = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  Module.update(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update module" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Module not found" });

    res.json({ message: "Module updated" });
  });
};

// Delete a module
exports.deleteModule = (req, res) => {
  const { id } = req.params;

  Module.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete module" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Module not found" });

    res.json({ message: "Module deleted" });
  });
};




