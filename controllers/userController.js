"use strict";

const passport = require("passport");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

// ######################################################
// ######################################################

exports.gift_preferences_get = (req, res, next) => {
  return res.render("form-edit-pref");
};

exports.gift_preferences_post = async (req, res, next) => {
  const new_pref = req.body.preference;
  const prefs = req.user.gift_preferences;
  prefs.push(new_pref);

  try {
    const user = await User.findById(req.user._id);
    user.gift_preferences = prefs;
    await user.save();

    res.redirect("/home/gift-preferences");
  } catch (err) {
    return next(err);
  }
};

exports.gift_preferences_delete = async (req, res, next) => {
  const i = req.body.index;
  const prefs = req.user.gift_preferences;
  prefs.splice(i, 1);

  try {
    const user = await User.findById(req.user._id);
    user.gift_preferences = prefs;
    await user.save();

    return res.redirect("/home/gift-preferences");
  } catch (err) {
    return next(err);
  }
};
