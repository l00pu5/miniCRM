const validateSession = (req, res, next) => {
  // TODO: implement
  // TODO: check for session presence on request object
  // TODO: check for user property on session property
  next();
}

const isLoggedIn = (req, res, next) => {
  // checks session state for user object and loggedIn flag
  // -> check presence of req.session
  // -> check presence of req.session.user
  // -> check presence of req.session.loginState (must be true)
  if (!req.session) {
    res.status(401).json({ message: "Not logged in!" });
    return;
  }
  if (!req.session.user) {
    res.status(400).json({ message: "User session uninitiated!" });
    return;
  }
  if (!req.session.user.loginState) {
    res.status(400).json({ message: "Not logged in!" });
    return
  }
  next();
};

const hasValidToken = (req, res, next) => {
  // TODO: implement
  // checks for token presence and verifies JWT
  next();
};

module.exports = {
  validateSession
};