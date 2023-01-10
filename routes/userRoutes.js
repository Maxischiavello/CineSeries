const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { check } = require("express-validator");
const { isAdmin, isUser } = require("../middleware/role");
const auth = require("../middleware/auth");
const { validateFields } = require("../middleware/validate-fields");

router.get("/:id", auth, isAdmin, getUser);
router.get("/", auth, isAdmin, getAllUsers);
router.post(
  "/",
  [
    check("username", "The username field is required").not().isEmpty(),
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Password must contain between 8 and 12 characters, including numbers, upper/lowercase letters and do not use spaces."
    )
      .isLength({ min: 8 })
      .isLength({ max: 12 })
      .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,12}$/),
    validateFields,
  ],
  addUser
);
router.put("/:id", auth, isUser, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);

module.exports = router;
