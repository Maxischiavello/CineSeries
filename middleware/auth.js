require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");

/**
 * Middleware to check token
 */
module.exports = function (req, res, next) {
  // Read token from header
  const token = req.header("x-auth-token");

  // Check if there is no token and role
  if (!token)
    return res.status(403).json({ msg: "No token, permission denied" });

  // Validate token
  try {
    const encrypted = jwt.verify(token, process.env.JWT_SECRET);
    req.user = encrypted.user;
    next();
  } catch (error) {
    res.status(422).json({ msg: "Invalid token" });
  }
};
