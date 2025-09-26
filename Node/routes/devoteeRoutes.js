const express = require("express");
const router = express.Router();
const devoteeController = require("../controllers/devoteeController");

// Standard CRUD routes
router.get("/", devoteeController.getAll);
router.get("/:id", devoteeController.getById);
router.post("/", devoteeController.create);
router.put("/:id", devoteeController.update);
router.delete("/:id", devoteeController.remove);


module.exports = router;
