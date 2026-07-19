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
  // TODO: generate refresh token
  testUser.access_token = token;
  // save user data in session
  req.session.user = testUser;
  res.status(200).json({ access_token: token });
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
  // TODO: generate refresh token
  testUser.access_token = token;
  // save user data in session
  req.session.user = testUser;
  res.status(200).json({ access_token: token });
});

router.get("/login", (req, res) => {
  // TODO: implement
  console.log("-> Route: /login (GET)");
  res.status(200).json({ message: "Logged in!" });
});

router.post("/login", (req, res) => {
  // TODO: implement
  console.log("-> Route: /login (POST)");
  console.log("Data:", req.body);
  // TODO: check request body for consistency
  // match user data from user DB
  const userDB = require("../../data/users.json");
  const user = userDB.find((entry) => {
    return req.body.email === user.email || req.body.username === user.username;
  });
  if (!user) {
    res.sendStatus(400);
  }
  // TODO: match credentials (username + pwd || email address + pwd)
  res.sendStatus(204);
});

router.get("/refresh-token", (req, res) => {
  // TODO: implement
});

router.get("/session-data", (req, res) => {
  // TODO: implement
  // Purpose: return session data for debugging purposes
  if (!req.session) {
    // TODO: implement
    // session data is undefined
    return;
  }
  if (!req.session.user) {
    // user data is not present in session
    // TODO: implement
    return;
  }
  // TODO: return session data if session is present
  console.log("-> Route: /session-data");
});

router.post("/register", (req, res) => {
  // registers a user with the data provided on the login form
  // TODO: implement
  console.log("-> Route: register");
  console.log("Request body:", req.body);
  // TODO: provide redirect URL to frontend instead of redirecting here?
  res.redirect("/test/login-form");
});

router.get("/logout", authentication_middleware.authenticate, (req, res) => {
  // TODO: implement
  // TODO: implement blacklist for invalidated access tokens
  // TODO: alternative: track login status in session cookie
  // TODO: delete token cookie to revoke refresh token
  console.log("-> Route: logout");
  // destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error("Unable to destroy session!");
      // TODO: transform response to JSON
      res.send("Error: unable to destroy session");
      return;
    }
    else {
      // TODO: transform response to JSON
      res.send("Session destroyed!");
      return;
    }
  });
});

router.get("/add-test-user", async (req, res) => {
  // adds a static test user to the user database
  // TODO: implement
  console.log("-> Route: add-test-user");
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
  console.log("-> Route: /auth-verification");
});

router.get("/auth-verification2", authentication_middleware.authenticate, permission_middleware.verifyPermission("AUTH_TEST"), (req, res) => {
  // TODO: implement
  // authentication test w permission "AUTH_TEST"
  console.log("-> Route: /auth-verification");
});

router.get("/users", (req, res) => {
  // return all users from the user DB
  console.log("-> Route: /users");
  const data = getUserData();
  res.status(200).json(data);
});

module.exports = router;
