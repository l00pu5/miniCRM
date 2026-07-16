const fsPromises = require("fs").promises;
const path = require("path");

// TODO: implement
const logger = (req, res, next) => {
  // TODO: select data fields to be logged
  const logString = ``;
  next();
};

module.exports = logger;