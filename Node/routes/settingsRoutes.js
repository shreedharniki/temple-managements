const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.post("/", settingsController.createOrUpdateSettings);
router.get("/", settingsController.getAllSettings);
router.get("/temple/:templeId", settingsController.getSettingsByTemple);
router.delete("/temple/:templeId", settingsController.deleteSettings);

module.exports = router;

