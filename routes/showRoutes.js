const express = require("express");
const router = express.Router();
const {
  getAllShows,
  getShow,
  addShow,
  updateShow,
  deleteShow,
} = require("../controllers/showController");
const { check } = require("express-validator");
const { isAdmin } = require("../middleware/role");
const auth = require("../middleware/auth");
const { validateFields } = require("../middleware/validate-fields");

router.get("/:id", auth, isAdmin, getShow);
router.get("/", getAllShows);
router.post(
  "/",
  [
    auth,
    isAdmin,
    check("title", "The title field is required").not().isEmpty(),
    check("year", "The year field is required").not().isEmpty(),
    check("genre", "The genre field is required").not().isEmpty(),
    check("duration", "The duration field is required").not().isEmpty(),
    check("synopsis", "The synopsis field is required").not().isEmpty(),
    check("cast", "The cast field is required").not().isEmpty(),
    validateFields,
  ],
  addShow
);
router.put("/:id", auth, isAdmin, updateShow);
router.delete("/:id", auth, isAdmin, deleteShow);

module.exports = router;
