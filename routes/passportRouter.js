const express        = require("express");
const passportRouter = express.Router();
const passport = require('../config/passport')


// Require User model
const User = require('../models/User')
const {
signupView,
signup,
loginView,
isMatching,
logout} = require('../controllers/index')


// Signup Route
passportRouter.get('/signup', signupView)
passportRouter.post("/signup", signup);

// Login Route

passportRouter.get('/login', loginView)
passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
  })
);

passportRouter.get('/profile', isMatching)

// Logout Route

passportRouter.get("/profile", ensureLogin, async (req, res) => {
  res.render("passport/profile", { user: req.user });
});

function ensureLogin(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect("/login")
}

passportRouter.get("/logout", logout)

module.exports = passportRouter;

/*
  const userLogged = await req.user.wantToPractice
  const userNativeLanguage = await User.findOne({ nativeLanguage: userLogged })
  console.log(req.user)
  console.log(userNativeLanguage)
  */