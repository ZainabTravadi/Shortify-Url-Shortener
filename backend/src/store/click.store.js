class ClickStore {
  constructor() {
    this.clicksByCode = new Map(); // code -> [clicks]
  }

  record(code, click) {
    if (!this.clicksByCode.has(code)) {
      this.clicksByCode.set(code, []);
    }
    this.clicksByCode.get(code).push(click);
  }

  findByCode(code) {
    return this.clicksByCode.get(code) || [];
  }
}

module.exports = new ClickStore();
