const Temple = require("../models/templeModel");

exports.getAll = (req, res) => {
  Temple.getAllTemples((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Temple.getTempleById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  Temple.createTemple(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Temple.updateTemple(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Temple updated" });
  });
};

exports.remove = (req, res) => {
  Temple.deleteTemple(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Temple deleted" });
  });
};



