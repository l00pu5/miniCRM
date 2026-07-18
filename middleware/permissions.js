const verifyPermissions = (permissions) => {
  // verify multiple permissions
  return (req, res, next) => {
    // TODO: implement
    console.log("-> verifyPermissions");
    next();
  };
};

const verifyPermission = (permission) => {
  // verify singular permission
  return (req, res, next) => {
    // TODO: implement
    console.log("-> verifyPermission:", permission);
    next();
  };
};

module.exports = {
  verifyPermissions,
  verifyPermission
};