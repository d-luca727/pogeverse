const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorRes");

exports.getPrivateData = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};
