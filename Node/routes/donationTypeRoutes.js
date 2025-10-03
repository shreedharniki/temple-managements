const express = require("express");
const router = express.Router();
const DonationTypeController = require("../controllers/donationTypeController");

// CRUD routes
router.get("/", DonationTypeController.getAll);
router.get("/:id", DonationTypeController.getById);
router.post("/", DonationTypeController.create);
router.put("/:id", DonationTypeController.update);
router.delete("/:id", DonationTypeController.delete);

module.exports = router;
