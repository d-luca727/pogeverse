const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorRes");

//register
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

//login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Provide an email and password!!", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials!!", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials!!", 401));
    }

    res.status(200).json({ success: true, token: "prova" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//forgot password
exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

//reset password
exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};
