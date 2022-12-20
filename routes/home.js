const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");
const gift_controller = require("../controllers/giftController");

// GET request for user home
router.get("/", auth_controller.home_get);

// GET request for user gift preferences
router.get("/gift-preferences", user_controller.gift_preferences_get);

// POST request for add user gift preference
router.post("/gift-preferences", user_controller.gift_preferences_post);

// POST request for delete user gift prefernce
router.post("/delete-preference", user_controller.gift_preferences_delete);

// GET request for my gifts
router.get("/my-list", gift_controller.my_gifts_get);

// GET request for add gift
router.get("/add-gift", gift_controller.add_gift_get);

// POST request for add gift
router.post("/add-gift", gift_controller.add_gift_post);

module.exports = router;
