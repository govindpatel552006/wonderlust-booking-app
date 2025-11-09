const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/reviews");
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/expresserrors");
const{isLoggedin,reviewowner}=require("../middleware")
const reviewcontroller=require("../controllers/review")

// Add Review


router.post(
  "/", isLoggedin,
  wrapAsync(reviewcontroller.postreview)
);


// Delete Review

router.delete(
  "/:reviewId",
  reviewowner,
  wrapAsync(reviewcontroller.deletereview)
);


module.exports = router;
