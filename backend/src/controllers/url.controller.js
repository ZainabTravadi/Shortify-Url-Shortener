const urlService = require("../services/url.service");
const redirectService = require("../services/redirect.service");
const errors = require("../utils/errors");

exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const result = await urlService.createShortUrl(longUrl);
    return res.status(201).json(result);
  } catch (err) {
    const error = errors[err.message] || errors.INTERNAL_ERROR;
    return res.status(error.status).json({
      error: err.message,
      message: error.message
    });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const metadata = {
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"]
    };

    const longUrl = await redirectService.resolve(code, metadata);
    return res.redirect(302, longUrl);
  } catch (err) {
    const error = errors[err.message] || errors.INTERNAL_ERROR;
    return res.status(error.status).json({
      error: err.message,
      message: error.message
    });
  }
};
