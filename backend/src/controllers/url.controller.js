const urlService = require("../services/url.service");
const redirectService = require("../services/redirect.service");

exports.shortenUrl = (req, res) => {
  try {
    const { longUrl } = req.body;
    const result = urlService.createShortUrl(longUrl);
    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "INVALID_URL") {
      return res.status(400).json({
        error: "INVALID_URL",
        message: "Invalid or missing URL"
      });
    }

    return res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Something went wrong"
    });
  }
};

exports.redirectUrl = (req, res) => {
  try {
    const { code } = req.params;
    const longUrl = redirectService.resolve(code);
    return res.redirect(302, longUrl);
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({
        error: "NOT_FOUND",
        message: "Short URL does not exist"
      });
    }

    return res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Something went wrong"
    });
  }
};
