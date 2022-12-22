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

    gift_preferences: [{ type: String }]
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

UserSchema.virtual("getFirstName").get(function () {
  return this.firstname[0].toUpperCase() + this.firstname.slice(1);
});

UserSchema.virtual("getLastName").get(function () {
  return this.lastname[0].toUpperCase() + this.lastname.slice(1);
});

UserSchema.virtual("getFullName").get(function () {
  return `${
    this.firstname[0].toUpperCase() + this.firstname.slice(1)
  } ${this.lastname[0].toUpperCase() + this.lastname.slice(1)}`;
});

module.exports = mongoose.model("User", UserSchema);
