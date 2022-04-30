const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");

exports.getPrivateData = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};
