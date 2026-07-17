const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/authentication.js");

router.get("/login-form", (req, res) => {
  console.log("-> /login-form (test)");
  res.render("test/login_form");
});

router.get("/auth", auth_middleware.authenticate, (req, res) => {
  console.log("-> /auth (test)");
  res.render("test/authSuccess");
});

module.exports = router;