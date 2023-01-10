require("dotenv").config({ path: ".env" });

/**
 * Middleware to check role
 */
const isAdmin = (req, res, next) => {
  // Read role from header
  const role = req.header("role");
  if (!role || role !== "admin")
    return res
      .status(403)
      .json({ msg: "You do not have permissions to perform this operation" });
  next();
};

const isUser = (req, res, next) => {
  // Read role from header
  const role = req.header("role");
  if (!role || role !== "user")
    return res
      .status(403)
      .json({ msg: "You do not have permissions to perform this operation" });
  next();
};

module.exports = {
  isAdmin,
  isUser,
};
