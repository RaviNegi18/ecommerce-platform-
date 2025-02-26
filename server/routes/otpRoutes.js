import express from "express";
import {
  generateOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/otpController.js";

const router = express.Router();

router.post("/generate", generateOtp);
router.post("/verify", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
