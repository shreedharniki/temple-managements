const DonationTypeModel = require("../models/donationTypeModel");

const DonationTypeController = {
  // GET /donationtype
  getAll: async (req, res) => {
    try {
      const data = await DonationTypeModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /donationtype/:id
  getById: async (req, res) => {
    try {
      const data = await DonationTypeModel.getById(req.params.id);
      if (!data) return res.status(404).json({ error: "Donation type not found" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /donationtype
  create: async (req, res) => {
    try {
      const { name, amount, temple_id } = req.body;
      if (!name || !amount || !temple_id)
        return res.status(400).json({ error: "Required fields missing" });

      const result = await DonationTypeModel.create({ name, amount, temple_id });
      res.status(201).json({ message: "Donation type created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /donationtype/:id
  update: async (req, res) => {
    try {
      const { name, amount, temple_id } = req.body;
      if (!name || !amount || !temple_id)
        return res.status(400).json({ error: "Required fields missing" });

      await DonationTypeModel.update(req.params.id, { name, amount, temple_id });
      res.json({ message: "Donation type updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /donationtype/:id
  delete: async (req, res) => {
    try {
      await DonationTypeModel.delete(req.params.id);
      res.json({ message: "Donation type deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = DonationTypeController;
