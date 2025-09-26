const express = require("express");
const router = express.Router();
const SevaController = require("../controllers/sevaController");

// CRUD
router.get("/", SevaController.getAllSevas);
router.post("/", SevaController.createSeva);
router.put("/:id", SevaController.updateSeva);
router.delete("/:id", SevaController.deleteSeva);

module.exports = router;
