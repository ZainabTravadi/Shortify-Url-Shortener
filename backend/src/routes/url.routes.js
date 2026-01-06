const express = require("express");
const router = express.Router();

const {
  shortenUrl,
  redirectUrl
} = require("../controllers/url.controller");

const clickStore = require("../store/click.store");

// Create short URL
router.post("/shorten", shortenUrl);

// Redirect (generic route LAST)
router.get("/:code", redirectUrl);

module.exports = router;
