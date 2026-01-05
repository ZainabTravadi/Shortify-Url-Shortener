const generateCode = require("../utils/code-generator");
const urlStore = require("../store/url.store");

class UrlService {
  createShortUrl(longUrl) {
    if (!longUrl || typeof longUrl !== "string") {
      throw new Error("INVALID_URL");
    }

    let code;
    do {
      code = generateCode();
    } while (urlStore.exists(code));

    urlStore.save(code, longUrl);

    return {
      code,
      shortUrl: `http://localhost:8080/${code}`,
      longUrl
    };
  }
}

module.exports = new UrlService();
