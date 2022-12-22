const express = require("express");
const router = express.Router();

const gift_controller = require("../controllers/giftController");

// GET request for delete gift
router.get("/:id/delete", gift_controller.delete_gift_get);

// POST request for delete gift
router.post("/:id/delete", gift_controller.delete_gift_post);

// POST request for claim gift
router.post("/:id/claim", gift_controller.claim_gift);

// POST request for unclaim gift
router.post("/:id/unclaim", gift_controller.unclaim_gift);

module.exports = router;
