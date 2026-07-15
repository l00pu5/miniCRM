const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes
const route_root = require("./routes/root.js");

dotenv.config();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

// serve static files
app.use(express.static("public"));

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// route handlers
app.use("/", route_root);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});