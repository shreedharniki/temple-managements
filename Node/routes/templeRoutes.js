const express = require("express");
const router = express.Router();
const templeController = require("../controllers/templeController");
const { authenticate, authorize } = require("../middleware/auth");
router.get("/", templeController.getAll);
router.get("/:id", templeController.getById);
router.post("/", authenticate, authorize(["super_admin"]), templeController.create);
router.put("/:id",authenticate, authorize(["super_admin"]), templeController.update);
router.delete("/:id", authenticate, authorize(["super_admin"]), templeController.remove);

module.exports = router;






