const express = require("express");
const router = express.Router();

router.get("/login-form", (req, res) => {
  console.log("-> /login-form");
  res.render("test/login_form");
});

module.exports = router;