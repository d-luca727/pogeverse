const ErrorResponse = require("../utils/errorRes");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //duplicate error key 11000
  if (err.code === 11000) {
    const message = "Duplicate Field";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error" });
};

module.exports = errorHandler;
