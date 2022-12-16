"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// USER MODEL
const GiftSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gifter: { type: Schema.Types.ObjectId, ref: "User" },
  isClaimed: { type: Boolean, required: true, default: false },
  link: { type: String },
  notes: [{ type: String }]
});

module.exports = mongoose.model("Gift", GiftSchema);
