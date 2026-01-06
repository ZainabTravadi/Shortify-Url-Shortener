const ShortUrl = require("../models/shortUrl.model");
const Click = require("../models/click.model");

class RedirectService {
  async resolve(code, metadata) {
    const record = await ShortUrl.findOne({ code });

    if (!record) {
      throw new Error("NOT_FOUND");
    }

    await Click.create({
      code,
      ipAddress: metadata?.ipAddress,
      userAgent: metadata?.userAgent
    });

    return record.longUrl;
  }
}

// 🔥 EXPORT AN INSTANCE (IMPORTANT)
module.exports = new RedirectService();
