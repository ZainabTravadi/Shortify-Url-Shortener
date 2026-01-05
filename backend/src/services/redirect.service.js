const urlStore = require("../store/url.store");

class RedirectService {
  resolve(code) {
    const longUrl = urlStore.find(code);

    if (!longUrl) {
      throw new Error("NOT_FOUND");
    }

    return longUrl;
  }
}

module.exports = new RedirectService();
