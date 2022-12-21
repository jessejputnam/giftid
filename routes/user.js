"use strict";
const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// GET request for user page
router.get("/:id", user_controller.user_page_get);

module.exports = router;
