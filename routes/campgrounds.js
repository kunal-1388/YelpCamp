const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

router.get("/", catchAsync(campgrounds.index));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

// order does matter
router.get("/:id", catchAsync(campgrounds.showCampground));

router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.createCampground)
);

// router.post("/", upload.single("image"), (req, res) => {
//   console.log(req.body, req.file);
// });
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  validateCampground,
  catchAsync(campgrounds.upadateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
