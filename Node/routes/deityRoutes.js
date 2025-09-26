const express = require("express");
const router = express.Router();
const DeityController = require("../controllers/deityController");

// CRUD
router.get("/", DeityController.getAllDeities);
router.get("/:id", DeityController.getDeityById);
router.post("/", DeityController.createDeity);
router.put("/:id", DeityController.updateDeity);
router.delete("/:id", DeityController.deleteDeity);

module.exports = router;
