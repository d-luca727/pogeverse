const { use } = require("express/lib/router");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorRes");

//open trade
exports.leaderboard = async (req, res, next) => {
  try {
    let users = await User.find();

    const data = users.map((user) => {
      let money = user.money.toFixed(2);

      let investedMoney = user.trades.map((value) => value.amount);
      investedMoney = investedMoney.reduce((prev, curr) => prev + curr, 0);

      return {
        username: user.username,
        money: Number(money) + Number(investedMoney),
        trades: user.trades.length,
      };
    });
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    return next(
      new ErrorResponse("Server did not succeed at retrieving users data!", 500)
    );
  }
};
