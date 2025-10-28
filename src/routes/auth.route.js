import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";

const router = express.Router();

router.post("/refresh", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return next(apiError(401, "No refresh token provided"));

  try {
    // 1️⃣ Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 2️⃣ Check if token matches what’s in DB
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return next(apiError(403, "Invalid refresh token"));
    }

    // 3️⃣ Issue a new access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRY }
    );

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch {
    next(apiError(403, "Invalid or expired refresh token"));
  }
});

export default router;
