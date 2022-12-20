"use strict";

const passport = require("passport");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const Gift = require("../models/gift");

// ######################################################
// ######################################################

// ################# Home Page ##################

// Display Landing Page on GET
exports.index_get = (req, res, next) => {
  if (req.user) {
    return res.redirect("/home");
  }
  return res.render("index", { title: "GiftID" });
};

// Display user home page on GET
exports.home_get = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const friends_gifts = await Gift.find({ gifter: userId });

    return res.render("home", {
      title: "GiftID",
      friends_gifts
    });
  } catch (err) {
    return next(err);
  }
};

// ################# Registration ##################

// Display sign up on GET
exports.signup_get = (req, res, next) => {
  return res.render("form-sign-up", {
    title: "Register"
  });
};

// Handle sign up on POST
exports.sign_up_post = [
  // Validate and sanitize fields
  body("username", "Must be a valid email address")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .escape(),
  body("firstName", "First name is required").trim().isLength({ min: 1 }),
  body("lastName", "Last name is required").trim().isLength({ min: 1 }),

  body("password", "Password cannot be empty").trim().isLength({ min: 1 }),
  body("passConfirm", "Password confirmation must match password")
    .trim()
    .isLength({ min: 1 })
    .custom((value, { req }) => value === req.body.password),

  // Process request after validation/sanitization
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors, rerender
      return res.render("form-sign-up", {
        title: "Register",
        errors: errors.array()
      });
    }

    try {
      // Check if user exists
      const found_user = await User.find({ username: req.body.username });
      if (found_user.length > 0) {
        return res.render("form-sign-up", {
          title: "Register",
          error: "Email is already in use"
        });
      }

      // Continue registration
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        birth_month: req.body.birthMonth,
        birth_day: req.body.birthDay
      });

      await user.save();

      res.redirect("/login");
    } catch (err) {
      return next(err);
    }
  }
];

// ################# Logging In ##################

// Handle login on GET
exports.login_get = (req, res, next) => {
  res.render("form-log-in", {
    title: "Login",
    errors: req.flash("error")
  });
};

// Handle login on POST
exports.login_post = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true
});

// Handle logout on POST
exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
};
