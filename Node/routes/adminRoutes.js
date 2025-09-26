const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// Admin CRUD routes
router.get("/", authenticate, authorize(["super_admin"]), AdminController.getAllAdmins);
router.get("/:id", authenticate, authorize(["super_admin"]), AdminController.getAdminById);
router.post("/", authenticate, authorize(["super_admin"]), AdminController.createAdmin);
router.put("/:id", authenticate, authorize(["super_admin"]), AdminController.updateAdmin);
router.delete("/:id", authenticate, authorize(["super_admin"]), AdminController.deleteAdmin);

module.exports = router;
