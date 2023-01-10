const express = require("express");
const router = express.Router();

const {
  getAdminById,
  getAllAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
} = require("../controllers/adminController");

const { check } = require("express-validator");

const { adminExists } = require("../helpers/db-validators");
const { validateFields } = require("../middleware/validate-fields");
const { isAdmin } = require("../middleware/role");
const auth = require("../middleware/auth");

//  ROUTES ------------------------

router.post(
  "/",
  [
    auth,
    isAdmin,
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
  addAdmin
);

router.get(
  "/:id",
  [
    auth,
    isAdmin,
    check("id", "Please enter a valid id").isMongoId(),
    check("id").custom(adminExists),
    validateFields,
  ],
  getAdminById
);

router.get("/", [auth, isAdmin, validateFields], getAllAdmin);

router.put(
  "/:id",
  [
    auth,
    isAdmin,
    check("id", "Please enter a valid id").isMongoId(),
    check("id").custom(adminExists),
    check("email", "Please enter a valid email address").isEmail(),
    validateFields,
  ],
  updateAdmin
);

router.delete(
  "/:id",
  [
    auth,
    isAdmin,
    check("id", "Please enter a valid id").isMongoId(),
    check("id").custom(adminExists),
    validateFields,
  ],
  deleteAdmin
);

module.exports = router;
