// src/utils/apiError.js
export const apiError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};
