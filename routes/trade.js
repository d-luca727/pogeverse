const express = require("express");
const router = express.Router();
const { openTrade, closeTrade } = require("../controllers/trade");
const { protect } = require("../middleware/auth");

router.route("/open").put(protect, openTrade);
router.route("/close").put(protect, closeTrade);

module.exports = router;
