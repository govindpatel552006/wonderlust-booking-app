
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const ExpressError = require("./utils/expresserrors");
const session = require("express-session");
const MongoStore=require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// App Config
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const listingRoutes = require("./routes/listings");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");


// Database Connection
const DATABASE_URL = process.env.ATLASDB_URL

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  Session must come BEFORE passport and flash

const store=MongoStore.create({


  mongoUrl:DATABASE_URL
  ,
  crypto:{
    secret:process.env.MYSESSIONSECRET
  },touchAfter:24*3600
})

store.on("error",(err)=>{
  console.log("eroor in mongodb session",err)
})

const sessionOptions = {
  store,
  secret: process.env.MYSESSIONSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};


app.use(session(sessionOptions));
app.use(flash());

// ✅ Initialize Passport (correct order)
app.use(passport.initialize());
app.use(passport.session());

// ✅ Passport Local Strategy Setup
passport.use(new LocalStrategy(User.authenticate()));

// ✅ Serialization (for sessions)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages & currentUser setup (global middleware)
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // Access logged-in user in all templates
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curUser=req.user
  next();
});

// Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes); // ✅ Fix: should be "/" not "/signup"

// Home Route
app.get("/", (req, res) => {
  res.redirect("/listings")
});

// 404 Handler
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// Error Handler
// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = "Something went wrong!";
//   res.status(statusCode).render("error", { err });
// });

// Start Server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

