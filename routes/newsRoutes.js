const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getNews,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const { check } = require("express-validator");
const { isAdmin } = require("../middleware/role");
const auth = require("../middleware/auth");
const { validateFields } = require("../middleware/validate-fields");

router.get("/:id", auth, isAdmin, getNews);
router.get("/", getAllNews);
router.post(
  "/",
  [
    auth,
    isAdmin,
    check("title", "The title field is required").not().isEmpty(),
    check("description", "The description field is required").not().isEmpty(),
    check("date", "The date field is required").not().isEmpty(),
    validateFields,
  ],
  addNews
);
router.put("/:id", auth, isAdmin, updateNews);
router.delete("/:id", auth, isAdmin, deleteNews);

module.exports = router;
