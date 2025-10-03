const SevaModel = require("../models/sevaModel");

const SevaController = {
  getAllSevas: async (req, res) => {
    try {
      const sevas = await SevaModel.getAll();
      res.json(sevas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSevaById: async (req, res) => {
    try {
      const seva = await SevaModel.getById(req.params.id);
      if (!seva) return res.status(404).json({ error: "Seva not found" });
      res.json(seva);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createSeva: async (req, res) => {
    try {
      const { name, amount, seats, maxlimit, temple_id, description } = req.body;
      if (!name || !amount || !seats || !maxlimit || !temple_id)
        return res.status(400).json({ error: "Required fields missing" });

      const result = await SevaModel.create({ name, description, amount, seats, maxlimit, temple_id });
      res.status(201).json({ message: "Seva created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateSeva: async (req, res) => {
    try {
      const { name, amount, seats, maxlimit, temple_id, description } = req.body;
      if (!name || !amount || !seats || !maxlimit || !temple_id)
        return res.status(400).json({ error: "Required fields missing" });

      await SevaModel.update(req.params.id, { name, description, amount, seats, maxlimit, temple_id });
      res.json({ message: "Seva updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteSeva: async (req, res) => {
    try {
      await SevaModel.delete(req.params.id);
      res.json({ message: "Seva deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = SevaController;
