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

  createSeva: async (req, res) => {
    try {
      const { name, description, amount, maxlimit, seats, calendar, is_active } = req.body;
      if (!name || !amount || !maxlimit || !seats) {
        return res.status(400).json({ error: "Required fields missing" });
      }
      const result = await SevaModel.create({ name, description, amount, maxlimit, seats, calendar, is_active });
      res.status(201).json({ message: "Seva created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateSeva: async (req, res) => {
    try {
      await SevaModel.update(req.params.id, req.body);
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
