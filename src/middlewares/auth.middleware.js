// src/middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next(apiError(401, "No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    next(apiError(401, "Invalid or expired token"));
  }
};
