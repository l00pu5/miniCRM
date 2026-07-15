const fsPromises = require("fs").promises;
const path = require("path");

const getUserData = () => {
  const userData = require("../data/users.json");
  return userData;
};

const addUserToUserData = (user) => {
  // TODO: implement
}

const setUserData = (users) => {
  // TODO: implement
}

module.exports = {
  getUserData,
  addUserToUserData,
  setUserData
}