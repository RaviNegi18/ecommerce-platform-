const express = require("express");
const {
  generateOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/otpController");

const router = express.Router();

router.post("/generate", generateOtp);
router.post("/verify", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
