const express = require("express");
const { login, forgotPassword, verifyOtp, resetPassword } = require("../controllers/loginController");

const router = express.Router();

router.post("/", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
