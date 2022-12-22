"use strict";

const User = require("../models/user");
const Gift = require("../models/gift");

// ######################################################
// ######################################################

exports.my_gifts_get = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const my_gifts = await Gift.find({ user: userId });
    return res.render("my-list", {
      my_gifts
    });
  } catch (err) {
    return next(err);
  }
};

exports.add_gift_get = (req, res, next) => {
  return res.render("form-add-gift", {
    title: "Add Gift to Wish List"
  });
};

exports.add_gift_post = async (req, res, next) => {
  const userId = req.user._id;
  const gift_name = req.body.name.trim();
  const gift_url = req.body.url.trim();
  const gift_notes = req.body.notes.trim();

  const gift = new Gift({
    name: gift_name,
    user: userId,
    link: gift_url ? gift_url : null,
    notes: gift_notes ? gift_notes : null
  });

  try {
    await gift.save();
  } catch (err) {
    return next(err);
  }

  return res.redirect("/home/my-list");
};

exports.delete_gift_get = async (req, res, next) => {
  try {
    const gift_id = req.params.id;

    const gift = await Gift.findById(gift_id);

    return res.render("confirm-delete", {
      gift
    });
  } catch (err) {
    return next(err);
  }
};

exports.delete_gift_post = async (req, res, next) => {
  const gift_id = req.params.id;

  try {
    await Gift.findByIdAndRemove(gift_id);

    return res.redirect("/home/my-list");
  } catch (err) {
    return next(err);
  }
};

exports.claim_gift = async (req, res, next) => {
  const user_id = req.user._id;
  const gift_id = req.params.id;

  try {
    const gift = await Gift.findById(gift_id);

    gift.isClaimed = true;
    gift.gifter = user_id;

    await gift.save();

    return res.redirect("/home");
  } catch (err) {
    return next(err);
  }
};

exports.unclaim_gift = async (req, res, next) => {
  const gift_id = req.params.id;

  try {
    const gift = await Gift.findById(gift_id);

    gift.isClaimed = false;
    gift.gifter = null;

    await gift.save();
    return res.redirect("/home");
  } catch (err) {
    return next(err);
  }
};
