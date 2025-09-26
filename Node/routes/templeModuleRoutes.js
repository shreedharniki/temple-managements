const express = require("express");
const router = express.Router();
const controller = require("../controllers/templeModuleController");

router.get("/:templeId", controller.getModulesByTemple);
router.post("/", controller.assignModulesToTemple);

module.exports = router;
