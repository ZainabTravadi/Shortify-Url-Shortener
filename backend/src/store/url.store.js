class UrlStore {
  constructor() {
    this.codeToUrl = new Map(); // code -> longUrl
  }

  save(code, longUrl) {
    this.codeToUrl.set(code, longUrl);
  }

  find(code) {
    return this.codeToUrl.get(code);
  }

  exists(code) {
    return this.codeToUrl.has(code);
  }
}

module.exports = new UrlStore();
