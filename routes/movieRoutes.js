const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { check } = require("express-validator");
const { isAdmin } = require("../middleware/role");
const auth = require("../middleware/auth");
const { validateFields } = require("../middleware/validate-fields");

router.get("/:id", auth, isAdmin, getMovie);
router.get("/", getAllMovies);
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
  addMovie
);
router.put("/:id", auth, isAdmin, updateMovie);
router.delete("/:id", auth, isAdmin, deleteMovie);

module.exports = router;
