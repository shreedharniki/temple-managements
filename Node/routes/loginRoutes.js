// const express = require("express");
// const { login, forgotPassword, verifyOtp, resetPassword,changePassword, } = require("../controllers/loginController");
// const { authenticate } = require("../middleware/auth");
// const router = express.Router();

// router.post("/", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/reset-password", resetPassword);
// router.post("/change-password", authenticate, changePassword); // ✅ protected



// module.exports = router;

const express = require("express");
const { login, forgotPassword, verifyOtp, resetPassword, changePassword } = require("../controllers/loginController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/change-password", authenticate, changePassword); // ✅ protected

module.exports = router;
