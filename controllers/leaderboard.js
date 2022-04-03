const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorRes");

//open trade
exports.leaderboard = async (req, res, next) => {
  try {
    let users = await User.find();

    const data = users.map((user) => ({
      username: user.username,
      money: user.money,
      trades: user.trades.length,
    }));
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return next(
      new ErrorResponse("Server did not succeed at retrieving users data!", 500)
    );
  }
};
