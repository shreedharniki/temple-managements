// routes/sevaBookingRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/sevaBookingController");

router.get("/", controller.getAllBookings);
router.get("/:id", controller.getBookingById);
router.post("/", controller.createBooking);
router.put("/:id", controller.updateBooking);
router.delete("/:id", controller.deleteBooking);


// Mark seva completed
// router.put("/:id/complete", controller.completeBooking);


module.exports = router;
