const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");

/* GET users listing. */
router.get("/", auth_controller.home_get);

module.exports = router;
