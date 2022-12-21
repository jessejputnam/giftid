const express = require("express");
const router = express.Router();

const search_controller = require("../controllers/searchController");

// GET request for search page and results.
router.get("/", search_controller.search_get);

module.exports = router;
