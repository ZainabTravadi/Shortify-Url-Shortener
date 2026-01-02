exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({
        error: "INVALID_URL",
        message: "longUrl is required"
      });
    }

    return res.status(201).json({
      shortUrl: "https://short.ly/dev123",
      code: "dev123",
      longUrl
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "INTERNAL_ERROR",
      message: "Something went wrong"
    });
  }
};

exports.redirectUrl = async (req, res) => {
  const { code } = req.params;

  if (code !== "dev123") {
    return res.status(404).json({
      error: "NOT_FOUND",
      message: "Short URL does not exist"
    });
  }

  return res.redirect(302, "https://example.com");
};
