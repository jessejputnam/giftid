const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");
const user_controller = require("../controllers/userController");
const gift_controller = require("../controllers/giftController");

// GET request for delete gift
router.get("/:id/delete", gift_controller.delete_gift_get);

// GET request for delete gift
router.post("/:id/delete", gift_controller.delete_gift_post);

module.exports = router;
