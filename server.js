const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./middleware/logging.js");

// routes
const route_root = require("./routes/root.js");
const route_api_test = require("./routes/api/test.js");
const route_fe_est = require("./routes/fe_test.js");

dotenv.config();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

// logging
app.use(logger);

// serve static files
app.use(express.static("public"));

// middleware
app.use(express.json()); // handle json data in request body
app.use(express.urlencoded({ extended: true })); // handle form data -> stored in req.body
app.use(cookieParser());
app.use(cors());

// route handlers
app.use("/", route_root);
app.use("/api/test", route_api_test);
app.use("/test", route_fe_est);

app.get("*all", (req, res) => {
  res.status(404).render("error/FileNotFound");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
