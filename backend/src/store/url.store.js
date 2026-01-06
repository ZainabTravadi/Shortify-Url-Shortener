class UrlStore {
  constructor() {
    this.codeToUrl = new Map();   // code -> longUrl
    this.urlToCode = new Map();   // longUrl -> code
  }

  save(code, longUrl) {
    this.codeToUrl.set(code, longUrl);
    this.urlToCode.set(longUrl, code);
  }

  findByCode(code) {
    return this.codeToUrl.get(code);
  }

  findByUrl(longUrl) {
    return this.urlToCode.get(longUrl);
  }

  existsCode(code) {
    return this.codeToUrl.has(code);
  }
}

module.exports = new UrlStore();
