// src/utils/apiResponse.js
export const apiResponse = (res, statusCode, data, message = "Success") => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
