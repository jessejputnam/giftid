const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

// GET request for home page.
router.get("/", auth_controller.index_get);

// GET request for register
router.get("/register", auth_controller.signup_get);

// POST request for register
router.post("/register", auth_controller.sign_up_post);

// GET request for login
router.get("/login", auth_controller.login_get);

// POST request for login
router.post("/login", auth_controller.login_post);

// GET request for logout
router.get("/logout", auth_controller.logout_get);

module.exports = router;
