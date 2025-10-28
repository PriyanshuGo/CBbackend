import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/user.validator.js";
import {
  registerUser,
  verifyUserOtp,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";

const router = express.Router();

// ---------- PUBLIC ROUTES ----------

// Step 1️⃣: Register new user (sends OTP)
router.post("/register", validate(registerSchema), registerUser);

// Step 2️⃣: Verify OTP (creates user in DB)
router.post("/verify-otp", verifyUserOtp);

// Step 3️⃣: Login (email or phone)
router.post("/login", validate(loginSchema), loginUser);

// Step 4️⃣: Refresh Access Token
router.post("/refresh", refreshAccessToken);

// ---------- PROTECTED ROUTES ----------
router.post("/logout", verifyToken, logoutUser);

export default router;
