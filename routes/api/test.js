const express = require("express");
const router = express.Router();
const { getUserData, setUserData } = require("../../util/userData.js");
const bcrypt = require("bcrypt");

router.get("/get-token", (req, res) => {
  // TODO: implement
  console.log("-> Route: /get-token");
});

router.post("/register", (req, res) => {
  // TODO: implement
});

router.get("/add-test-user", async (req, res) => {
  // TODO: implement
  console.log("-> add-test-user");
  // console.log(req);
  // TODO: check req.body for consistency
  try {
    // TODO: hash PW of req.password instead of static dummy PW
    const pwHash = await bcrypt.hash("abc123", parseInt(process.env.SALT_ROUNDS) || 10);
    console.log("Hashed PW:", pwHash);
    const userData = getUserData();
    const testUser = {
      name: "Test",
      email: "ab@c.de",
      role: "user",
      permissions: [],
      id: 0,
      password_raw: "abc123",
      password_hash: pwHash
    };
    console.log("generated user data:", testUser);
    const match1 = await bcrypt.compare("abc123", pwHash);
    const match2 = await bcrypt.compare("testbla123", pwHash);
    console.log("PW matching result (expected: true false):", match1, match2);
    res.status(200).json(testUser);
  } catch (error) {
    console.error(error);
  }
});

router.get("/users", (req, res) => {
  const data = getUserData();
  res.status(200).json(data);
});

module.exports = router;