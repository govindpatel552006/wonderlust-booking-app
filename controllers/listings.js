
const Listing=require("../models/listing")


module.exports.index=async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    req.flash("error", "Something went wrong!");
    res.redirect("/");
  }
}

module.exports.newlistingform=(req, res) => {
  res.render("listings/new");
}


module.exports.newlistingpostform= async (req, res) => {

  let url=req.file.path;
  let filename=req.file.filename
  try {
    const { title, description, price, location, country, image } = req.body;
    if (!title || !description || !price || !location || !country) {
      throw new ExpressError(400, "All fields are required");
    }

    const listing = new Listing({
      title,
      description,
      price,
      location,
      country,
      image: { url,filename },
      owner: req.user._id,
    });

    await listing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/listings");
  }
  
}

module.exports.editlistingform=async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  } catch (err) {
    req.flash("error", "Error loading edit form!");
    res.redirect("/listings");
  }
}


module.exports.editlistingpostform = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;

    // Find the listing first
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Update the basic fields
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;

    // 🟢 Only update image if a new one is uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Error updating listing!");
    res.redirect("/listings");
  }
};


module.exports.deltelisting=async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
  } catch (err) {
    req.flash("error", "Error deleting listing!");
    res.redirect("/listings");
  }
}

module.exports.showlistingdetails= async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
  } catch (err) {
    req.flash("error", "Error loading listing!");
    res.redirect("/listings");
  }
}