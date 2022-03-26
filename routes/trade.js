const express = require("express");
const router = express.Router();
const { openTrade, closeTrade } = require("../controllers/trade");
const { protect } = require("../middleware/auth");

router.route("/open").put(openTrade);
router.route("/close").put(closeTrade);

module.exports = router;
