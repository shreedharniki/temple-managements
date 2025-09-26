const AdminModel = require("../models/adminModel");

const AdminController = {
  getAllAdmins: async (req, res) => {
    try {
      const admins = await AdminModel.getAll();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAdminById: async (req, res) => {
    try {
      const admin = await AdminModel.getById(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createAdmin: async (req, res) => {
    try {
      await AdminModel.create(req.body);
      res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      await AdminModel.update(req.params.id, req.body);
      res.json({ message: "Admin updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      await AdminModel.delete(req.params.id);
      res.json({ message: "Admin deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AdminController;
