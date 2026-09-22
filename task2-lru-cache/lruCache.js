// Uses a JS Map for storage: Map preserves insertion order, and re-inserting
// a key (delete then set) pushes it to the "most recently used" end, so the
// least recently used entry is always the first one Map iterates.
class Cache {
  constructor(capacity, defaultTTL) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("capacity must be a positive integer");
    }
    this.capacity = capacity;
    this.defaultTTL = defaultTTL;
    this.map = new Map(); // key -> { value, expiresAt }
  }

  _isExpired(entry) {
    return entry.expiresAt !== undefined && entry.expiresAt <= Date.now();
  }

  get(key) {
    if (!this.map.has(key)) return -1;

    const entry = this.map.get(key);
    if (this._isExpired(entry)) {
      this.map.delete(key);
      return -1;
    }

    this.map.delete(key);
    this.map.set(key, entry);
    return entry.value;
  }

  put(key, value, ttl) {
    const effectiveTTL = ttl !== undefined ? ttl : this.defaultTTL;
    const expiresAt = effectiveTTL !== undefined ? Date.now() + effectiveTTL : undefined;

    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const lruKey = this.map.keys().next().value;
      this.map.delete(lruKey);
    }

    this.map.set(key, { value, expiresAt });
  }

  size() {
    return this.map.size;
  }
}

module.exports = { Cache };
