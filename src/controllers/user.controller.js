import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateOtp, storeOtpWithUser, verifyOtpAndGetUserData } from "../utils/otp.util.js";
import { sendEmailOtp } from "../utils/email.util.js";
import { generateTokens } from "../utils/token.util.js";
import { redis } from "../config/redis.js";


// ---------------- Register ----------------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, gender, dob, otpMethod = "email" } = req.body;

    // 🔍 Check if user already exists (by email or phone)
    const existing = await User.findOne({
      $or: [{ email }],
    });
    if (existing) return next(apiError(400, "User already exists"));

    // 🔢 Generate OTP
    const otp = generateOtp();

    // Prepare userData — only include defined, non-empty fields
    const userData = {};
    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = password;
    if (phone) userData.phone = phone;
    if (gender) userData.gender = gender;
    if (dob) userData.dob = dob;

    // Store OTP + user data in Redis
    await storeOtpWithUser(email, otp, userData);

    // ✉️ Send OTP
    if (otpMethod === "email") {
      await sendEmailOtp(email, otp);
      console.log(`📧 OTP sent to ${email}: ${otp}`);
    } else if (otpMethod === "phone") {
      console.log(`📧 OTP sent to ${phone}: ${otp}`);
    } else {
      return next(apiError(400, "Invalid OTP method"));
    }

    return apiResponse(res, 200, {}, `OTP sent via ${otpMethod} successfully`);
  } catch (err) {
    next(err);
  }
};

// ---------------- Verify OTP ----------------
export const verifyUserOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) return next(apiError(400, "Missing OTP or key"));

    // ✅ Step 1: Verify OTP from Redis
    const { valid, reason, userDataString } = await verifyOtpAndGetUserData(email, otp);
    if (!valid) return next(apiError(400, reason));

    const user = await User.create(userDataString);

    return apiResponse(
      res,
      201,
      null,
      "✅ User verified & registered successfully. You can now log in."
    );
  } catch (err) {
    next(err);
  }
};

// ---------------- Login ----------------
export const loginUser = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    // 🧠 For now: frontend always sends "identifier" = email
    // In future: can send phone instead (same logic will handle both)

    if (!identifier || !password)
      return next(apiError(400, "Email and password are required"));

    // 🔍 Detect whether identifier is email or phone
    const query = identifier.includes("@")
      ? { email: identifier }
      : { phone: identifier };

    const user = await User.findOne(query);
    if (!user) return next(apiError(404, "User not found"));

    // 🔑 Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(apiError(401, "Invalid credentials"));

    // 🎟️ Generate access + refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    // Remove sensitive fields before sending response
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // any other safe fields you want
    };

    return apiResponse(
      res,
      200,
      { safeUser, accessToken, refreshToken },
      "Login successful"
    );
  } catch (err) {
    next(err);
  }
};

// ---------------- Logout ----------------
export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    return apiResponse(res, 200, null, "Logout successful");
  } catch (err) {
    next(err);
  }
};

// ---------------- Refresh Token ----------------
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(apiError(401, "No refresh token provided"));

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken)
      return next(apiError(403, "Invalid refresh token"));

    const { accessToken } = generateTokens(user); // only generate access token

    return apiResponse(res, 200, { accessToken }, "Token refreshed");
  } catch (err) {
    next(err);
  }
};
