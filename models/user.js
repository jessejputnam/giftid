"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

// USER MODEL
const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Email cannot be empty"],
      match: [/\S+@\S+\.\S+/, "Must be valid email"],
      index: true
    },
    password: { type: String, required: true },

    firstname: { type: String, maxLength: 30, required: true },
    lastname: { type: String, maxLength: 30, required: true },

    birth_month: { type: Number, required: true },
    birth_day: { type: Number, required: true },

    friend_list: [{ type: Schema.Types.ObjectId, ref: "User" }],
    gifted_items: [{ type: Schema.Types.ObjectId, ref: "Gift" }],

    gift_preferences: [{ type: String }],
    my_gift_list: [{ type: Schema.Types.ObjectId, ref: "Gift" }]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken" });

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model("User", UserSchema);
