"use strict";

const User = require("../models/user");

// ######################################################
// ######################################################

// Handle display search form on GET
exports.search_get = async (req, res, next) => {
  const first_name = req.query.firstName?.trim() ?? null;
  const last_name = req.query.lastName?.trim() ?? null;

  // If no search yet, just display search form
  if (!first_name && !last_name) {
    return res.render("search", {
      title: "Find Someone to Gift!",
      results: null
    });
  }

  // If search
  try {
    let first_name_results = null;
    let last_name_results = null;
    let both_name_results = null;

    // If both first and last entered
    if (first_name && last_name) {
      both_name_results = await User.find({
        firstname: first_name.toLowerCase(),
        lastname: last_name.toLowerCase()
      });
    }

    // if first name entered
    if (first_name)
      first_name_results = await User.find({
        firstname: first_name.toLowerCase()
      });

    // if last name entered
    if (last_name)
      last_name_results = await User.find({
        lastname: last_name.toLowerCase()
      });

    const results = [both_name_results, first_name_results, last_name_results];

    return res.render("search", {
      title: "Find Someone to Gift!",
      results: results
    });
  } catch (err) {
    return next(err);
  }
};
