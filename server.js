const express = require("express");
const app = express();
const dotenv = require("dotenv");

// routes
const route_root = require("./routes/root.js");

dotenv.config();
const PORT = process.env.PORT || 3000;

// serve static files
app.use(express.static("public"));

// route handlers
app.use("/", route_root);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});