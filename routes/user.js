const express = require("express");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

//  Signup
router.get("/signup", userController.signupform);
router.post("/signup", userController.postsignupform);

// Login
router.get("/login", userController.loginform);
router.post("/login", saveRedirectUrl, userController.postlogin);

// Logout
router.get("/logout", userController.logout);

module.exports = router;


