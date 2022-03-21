const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

router.put("/resetpassword/:reset_token", resetpassword);

module.exports = router;
