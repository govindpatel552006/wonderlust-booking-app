const passport = require("passport");
const User = require("../models/user");

// Signup form
module.exports.signupform = (req, res) => {
  res.render("users/signup");
};

// Handle signup
module.exports.postsignupform = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });

    const registeredUser = await User.register(newUser, password);

    //Auto-login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "You have registered successfully!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Login form
module.exports.loginform = (req, res) => {
  res.render("users/login");
};

// Handle login
module.exports.postlogin = [
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", `Welcome back, ${req.user.username}!`);

    // ✅ Use redirect URL stored in res.locals (middleware sets this)
    const redirectUrl = res.locals.redirectUrl || "/listings";

    // ✅ Clean up session after use
    delete req.session.redirectUrl;

    res.redirect(redirectUrl);
  },
];

//  Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
