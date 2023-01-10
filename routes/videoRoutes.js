const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const { check } = require("express-validator");
const { isAdmin } = require("../middleware/role");
const auth = require("../middleware/auth");
const { validateFields } = require("../middleware/validate-fields");

router.get("/:id", auth, isAdmin, getVideo);
router.get("/", getAllVideos);
router.post(
  "/",
  [
    auth,
    isAdmin,
    check("title", "The title field is required").not().isEmpty(),
    check("url", "the url field is required").not().isEmpty(),
    validateFields,
  ],
  addVideo
);
router.put("/:id", auth, isAdmin, updateVideo);
router.delete("/:id", auth, isAdmin, deleteVideo);

module.exports = router;
