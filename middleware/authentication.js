const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("Auth check");
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log("Auth header:", authHeader);
  if (!authHeader) {
    console.error("No auth header is present!");
    res.status(401).json({ message: "No token has been provided!" });
    return;
  }
  const headerComponents = authHeader.split(" ");
  if (authHeader.length !== 2) {
    // auth header is formatted incorrectly
    res.status(401).json({ message: "Auth header is not formatted correctly!" });
    return;
  }
  if (!headerComponents[0].startsWith("Bearer")) {
    // wrong header prefix
    res.status(401).json({ message: "Incorrect auth header prefix!" });
    return;
  }
  const token = authHeader[1];
  console.log("Token:", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      res.status(403).json({ message: "Token is invalid or expired!" });
      return;
    }
    console.log("Decoded:", decoded);
    req.user = decoded;
    req.is_auth = true;
    next();
  });
};

module.exports = { authenticate };