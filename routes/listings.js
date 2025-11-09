const express = require("express");
const router = express.Router();
const { isLoggedin, isOwner } = require("../middleware");
const Listingcontroller = require("../controllers/listings");
const { storage } = require("../cloudinaryconfig");
const multer = require("multer");
const upload = multer({ storage });

// 🟢 All Listings
router.get("/", Listingcontroller.index);

// 🟢 New Listing Form
router.get("/new", isLoggedin, Listingcontroller.newlistingform);

// 🟢 Create New Listing
router.post(
  "/",
  isLoggedin,
  upload.single("image"), // must match your form input name
  Listingcontroller.newlistingpostform
);

// 🟢 Edit Listing Form
router.get("/:id/edit", isLoggedin, isOwner, Listingcontroller.editlistingform);

// 🟢 Update Listing
router.put("/:id", isLoggedin, isOwner,  upload.single("image"), Listingcontroller.editlistingpostform);

// 🟢 Delete Listing
router.delete("/:id", isLoggedin, isOwner, Listingcontroller.deltelisting);

// 🟢 Show Listing Details
router.get("/:id", Listingcontroller.showlistingdetails);

module.exports = router;

