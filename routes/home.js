const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");

// GET request for user home
router.get("/", auth_controller.home_get);

// GET request for user gift preferences
router.get("/gift-preferences", user_controller.gift_preferences_get);

// POST request for add user gift preference
router.post("/gift-preferences", user_controller.gift_preferences_post);

// POST request for delete user gift prefernce
router.post("/delete-preference", user_controller.gift_preferences_delete);

module.exports = router;
