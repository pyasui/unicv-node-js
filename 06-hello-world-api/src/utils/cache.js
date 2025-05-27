class Cache {
  constructor(durationMs) {
    this.duration = durationMs;
    this.store = new Map(); 
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    const now = Date.now();
    if ((now - entry.timestamp) < this.duration) {
      return entry.data;
    }

    this.store.delete(key);
    return null;
  }

  set(key, data) {
    this.store.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  delete(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }

  async getOrSet(key, fetchFunction) {
    const cached = this.get(key);
    if (cached) {
      return cached;
    }

    const data = await fetchFunction();
    this.set(key, data);
    return data;
  }
}

module.exports = {
  Cache,
  globalCache: new Cache(6 * 60 * 60 * 1000), // 6 horas
};