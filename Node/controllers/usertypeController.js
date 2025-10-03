const UserTypeModel = require("../models/usertypeModel");

const UserTypeController = {
  // GET all
  getAllUserTypes: async (req, res) => {
    try {
      const roles = await UserTypeModel.getAll();
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET single by ID
  getUserTypeById: async (req, res) => {
    try {
      const role = await UserTypeModel.getById(req.params.id);
      if (!role) return res.status(404).json({ error: "User role not found" });
      res.json(role);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST create
  createUserType: async (req, res) => {
    try {
      const { name, description, temple_id } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });

      const result = await UserTypeModel.create({ name, description, temple_id });
      res.status(201).json({ message: "User role created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT update
  updateUserType: async (req, res) => {
    try {
      const { name, description, temple_id } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });

      await UserTypeModel.update(req.params.id, { name, description, temple_id });
      res.json({ message: "User role updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE
  deleteUserType: async (req, res) => {
    try {
      await UserTypeModel.delete(req.params.id);
      res.json({ message: "User role deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = UserTypeController;
