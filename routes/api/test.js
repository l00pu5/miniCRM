const express = require("express");
const router = express.Router();
const { getUserData, setUserData } = require("../../util/userData.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication_middleware = require("../../middleware/authentication.js");
const permission_middleware = require("../../middleware/permissions.js");

router.get("/get-token", async (req, res) => {
  // provide a valid token with test permissions for testing purposes
  console.log("-> Route: /get-token");
  const testUser = {
    firstname: "A",
    lastname: "B",
    email: "ab@c.de",
    role: "user",
    permissions: ["AUTH_TEST"],
    id: 0,
    password_raw: "abc123",
    password_hash: "abc123"
  };
  // TODO: try catch for error handling
  const token = await jwt.sign({
    id: testUser.id,
    role: testUser.role,
    permissions: testUser.permissions
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  res.status(200).json({access_token: token});
});

router.get("/get-token2", async (req, res) => {
  // provide a valid token without permissions for testing purposes
  console.log("-> Route: /get-token2");
  const testUser = {
    firstname: "A",
    lastname: "B",
    email: "ab@c.de",
    role: "user",
    permissions: [],
    id: 0,
    password_raw: "abc123",
    password_hash: "abc123"
  };
  // TODO: try catch for error handling
  const token = await jwt.sign({
    id: testUser.id,
    role: testUser.role,
    permissions: testUser.permissions
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
  res.status(200).json({access_token: token});
});

router.post("/register", (req, res) => {
  // registers a user with the data provides on the login form
  // TODO: implement
  console.log("-> register");
  console.log("Request body:", req.body);
  // TODO: provide redirect URL to frontend instead of redirecting here?
  res.redirect("/test/login-form");
});

router.get("/add-test-user", async (req, res) => {
  // adds a static test user to the user database
  // TODO: implement
  console.log("-> add-test-user");
  // console.log(req);
  try {
    const pwHash = await bcrypt.hash(
      "abc123",
      parseInt(process.env.SALT_ROUNDS) || 10,
    );
    console.log("Hashed PW:", pwHash);
    const userData = getUserData();
    const testUser = {
      firstname: "Test",
      lastname: "Test",
      email: "ab@c.de",
      role: "user",
      permissions: [],
      id: 0,
      password_raw: "abc123",
      password_hash: pwHash,
    };
    console.log("generated user data:", testUser);
    // generate access token (JWT)
    const accesstoken = await jwt.sign({
      id: testUser.id,
      role: testUser.role,
      permissions: testUser.permissions,
    },
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" },
    );
    // TODO: implement refresh token
    console.log("Access token:", accesstoken);
    testUser.accessToken = accesstoken;
    testUser.redirectURL = "/test/auth-verification";
    const match1 = await bcrypt.compare("abc123", pwHash);
    const match2 = await bcrypt.compare("testbla123", pwHash);
    console.log("PW matching result (expected: true false):", match1, match2);
    res.status(200).json(testUser);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});

router.get("/auth-verification", authentication_middleware.authenticate, (req, res) => {
  // TODO: implement
  // authentication test w/o permissions
  console.log("-> /auth-verification");
});

router.get("/auth-verification2", authentication_middleware.authenticate, permission_middleware.verifyPermission("AUTH_TEST"), (req, res) => {
  // TODO: implement
  // authentication test w permission "AUTH_TEST"
  console.log("-> /auth-verification");
});

router.get("/users", (req, res) => {
  // return all users from the user DB
  const data = getUserData();
  res.status(200).json(data);
});

module.exports = router;
