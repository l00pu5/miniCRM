const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/authentication.js");
const session_middleware = require("../middleware/session.js");

router.get("/login-form", (req, res) => {
  // render login form for testing purposes
  console.log("-> /login-form (test)");
  res.render("test/login_form");
});

router.get("/auth", auth_middleware.authenticate, (req, res) => {
  // test endpoint for authentication middleware testing
  // renders a test page is auth is successful
  console.log("-> /auth (test)");
  res.render("test/authSuccess");
});

router.get("/session-auth", session_middleware.validateSession, (req, res) => {
  // test endpoint for authentication middleware testing
  // renders a test page is auth is successful
  console.log("-> /session-auth (test)");
  res.render("test/authSuccess");
});

module.exports = router;