const express = require("express");
const router = express.Router();
const { getUserData } = require("../../util/userData.js");

router.get("/get-token", (req, res) => {
  // TODO: implement
  console.log("-> Route: /get-token");
});

router.post("/register", (req, res) => {
  // TODO: implement
});

router.get("/add-test-user", (req, res) => {
  // TODO: implement
});

router.get("/users", (req, res) => {
  const data = getUserData();
  res.status(200).json(data);
});

module.exports = router;