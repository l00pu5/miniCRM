const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // TODO: implement
  console.log("Auth check");
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log("Auth header:", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token:", token);
  // TODO verify token
  next();
};