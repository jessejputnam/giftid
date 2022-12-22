"use strict";

const getAstro = require("../utils/astroConvert");
const getMonth = require("../utils/monthConverter");

const User = require("../models/user");
const Gift = require("../models/gift");

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

exports.user_page_get = async (req, res, next) => {
  const id = req.params.id;

  // If own page, reroute to home
  if (String(req.user._id) === id) {
    return res.redirect("/home");
  }

  try {
    const user_promise = User.findById(id);
    const user_gifts_promise = Gift.find({ user: id });

    const [user, user_gifts] = await Promise.all([
      user_promise,
      user_gifts_promise
    ]);

    const title = user.getFullName + "'s Gift ID";

    return res.render("user-page", {
      title,
      user,
      user_gifts,
      user_month: getMonth(user.birth_month),
      user_astro: getAstro(user.birth_month, user.birth_day)
    });
  } catch (err) {
    return next(err);
  }
};
