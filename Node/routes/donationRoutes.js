const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Standard CRUD 
router.get("/", donationController.getAll);
router.get("/:id", donationController.getById);
router.post("/", donationController.create);
router.put("/:id", donationController.update);
router.delete("/:id", donationController.remove);


// // Donation reports
// router.get("/report/:temple_id", donationController.getReportByTemple);
// router.get("/report/:temple_id/:user_id", donationController.getReportByTempleAndUser);

// // Report by user
// router.get("/report/:user_id", donationController.getReportByUser);

// Report by temple
router.get("/report/temple/:temple_id", donationController.getReportByTemple);

// Report by temple + user
router.get("/report/temple/:temple_id/user/:user_id", donationController.getReportByTempleAndUser);

// Report by user
router.get("/report/user/:user_id", donationController.getReportByUser);



module.exports = router;
