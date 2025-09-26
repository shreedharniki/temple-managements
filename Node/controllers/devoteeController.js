const Devotee = require("../models/devoteeModel");

// GET /devotees
exports.getAll = (req, res) => {
  Devotee.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// GET /devotees/:id
exports.getById = (req, res) => {
  Devotee.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results.length) return res.status(404).json({ message: "Devotee not found" });
    res.json(results[0]);
  });
};

// POST /devotees
exports.create = (req, res) => {
  Devotee.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /devotees/:id
exports.update = (req, res) => {
  Devotee.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Devotee updated successfully" });
  });
};

// DELETE /devotees/:id
exports.remove = (req, res) => {
  Devotee.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Devotee deleted successfully" });
  });
};
