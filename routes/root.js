const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

router.get("/ejs-test", (req, res) => {
  res.render("test");
});

router.get("/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

module.exports = router;