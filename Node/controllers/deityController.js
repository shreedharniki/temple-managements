const DeityModel = require("../models/deityModel");

const DeityController = {
  getAllDeities: async (req, res) => {
    try {
      const deities = await DeityModel.getAll();
      res.json(deities);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getDeityById: async (req, res) => {
    try {
      const result = await DeityModel.getById(req.params.id);
      if (!result.length) return res.status(404).json({ error: "Deity not found" });
      res.json(result[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createDeity: async (req, res) => {
    try {
      const { temple_id, name } = req.body;
      if (!temple_id || !name) return res.status(400).json({ error: "temple_id and name required" });

      const result = await DeityModel.create({ temple_id, name });
      res.status(201).json({ message: "Deity created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateDeity: async (req, res) => {
    try {
      const { temple_id, name } = req.body;
      if (!temple_id || !name) return res.status(400).json({ error: "temple_id and name required" });

      await DeityModel.update(req.params.id, { temple_id, name });
      res.json({ message: "Deity updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteDeity: async (req, res) => {
    try {
      await DeityModel.delete(req.params.id);
      res.json({ message: "Deity deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = DeityController;
