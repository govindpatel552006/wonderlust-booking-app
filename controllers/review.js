
const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.postreview=async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError(404, "Listing not found");

    const review = new Review({ comment, rating });
    review.author=req.user._id
    await review.save();

    listing.reviews.push(review);
    await listing.save();

    res.redirect(`/listings/${id}`);
  }

  module.exports.deletereview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  }