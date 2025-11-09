

const Listing = require("./models/listing");
const Review=require("./models/listing")

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // ✅ Corrected spelling: originalUrl (not orignalUrl)
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Please login to make changes.");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl; // ✅ Optional cleanup
  }
  next();
};



module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not authorized to perform this action!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

 
 


module.exports.reviewowner = async (req, res, next) => {
  const { reviewId, id } = req.params;

  // 1️⃣ Fetch the review
  const review = await Review.findById(reviewId);

  // 2️⃣ If review not found
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // 3️⃣ If user not logged in
  if (!req.user) {
    req.flash("error", "You must be logged in to perform this action!");
    return res.redirect("/login");
  }

  // 4️⃣ Check ownership
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to delete this review!");
    return res.redirect(`/listings/${id}`);
  }

  // 5️⃣ Authorized → go to next (actual delete logic in route)
  next();
};
