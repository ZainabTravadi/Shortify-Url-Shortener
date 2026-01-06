const ShortUrl = require("../models/shortUrl.model");
const generateCode = require("../utils/code-generator");
const isValidUrl = require("../utils/validate-url");

class UrlService {
  async createShortUrl(longUrl) {
    if (!isValidUrl(longUrl)) {
      throw new Error("INVALID_URL");
    }

    const existing = await ShortUrl.findOne({ longUrl });
    if (existing) {
      return {
        code: existing.code,
        shortUrl: `${process.env.BASE_URL}/${existing.code}`,
        longUrl
      };
    }

    let code;
    do {
      code = generateCode();
    } while (await ShortUrl.exists({ code }));

    await ShortUrl.create({ code, longUrl });

    return {
      code,
      shortUrl: `${process.env.BASE_URL}/${code}`,
      longUrl
    };
  }
}

module.exports = new UrlService();
