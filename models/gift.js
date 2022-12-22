"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// USER MODEL
const GiftSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gifter: { type: Schema.Types.ObjectId, ref: "User", default: null },
  isClaimed: { type: Boolean, required: true, default: false },
  link: { type: String },
  notes: [{ type: String }]
});

GiftSchema.virtual("getUrlDomain").get(function () {
  return this.link.split("//")[1].split("/")[0];
});

module.exports = mongoose.model("Gift", GiftSchema);
