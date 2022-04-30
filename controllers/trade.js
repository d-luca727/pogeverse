const User = require("../models/User");
const ErrorResponse = require("../utils/errorRes");

const { v4: uuidv4 } = require("uuid");
//open trade
exports.openTrade = async (req, res, next) => {
  const { username, coin, money_invested, open_price } = req.body;

  try {
    let user = await User.findOne({ username });

    user.money = user.money - money_invested;
    if (user.money < 0)
      return next(
        new ErrorResponse("Not Enough money to open this trade", 400)
      );

    const unique_id = uuidv4();
    const trades = user.trades.concat({
      coin: coin,
      open: open_price,
      amount: money_invested,
      id: unique_id,
    });

    user.trades = trades;

    await user.save();
    res.status(200).json({ success: true, data: unique_id, user: user });
  } catch (error) {
    return next(
      new ErrorResponse("Server did not succeed at opening a position!", 500)
    );
  }
};

//close trade
exports.closeTrade = async (req, res, next) => {
  const { username, trade_id, coin_amount_now } = req.body;

  try {
    let user = await User.findOne({ username });

    const trade_to_close = user.trades.find((trade) => trade.id == trade_id);
    console.log(trade_to_close);
    const trades = user.trades.filter((trade) => {
      return trade.id !== trade_id;
    });
    user.trades = trades;
    const profit =
      (coin_amount_now / trade_to_close.open) * trade_to_close.amount;

    user.money = user.money + profit;

    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    return next(
      new ErrorResponse("Server did not succeed at closing the position!", 500)
    );
  }
};
