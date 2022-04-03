const express = require("express");
const router = express.Router();
const { leaderboard } = require("../controllers/leaderboard");

router.route("/").get(leaderboard);

module.exports = router;
