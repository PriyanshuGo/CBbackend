import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );

  return { accessToken, refreshToken };
};
