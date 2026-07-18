const validateSession = (req, res, next) => {
  // TODO: implement
  // TODO: check for session presence on request object
  // TODO: check for user property on session property
  next();
}

module.exports = {
  validateSession
};