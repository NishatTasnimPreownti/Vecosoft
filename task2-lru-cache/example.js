const { Cache } = require("./lruCache");

console.log("=== Basic LRU behavior ===");
const cache = new Cache(2);
cache.put("A", 10);
cache.put("B", 20);
console.log('cache.get("A") ->', cache.get("A")); // 10
cache.put("C", 30); // evicts B (least recently used)
console.log('cache.get("B") ->', cache.get("B")); // -1
console.log('cache.get("C") ->', cache.get("C")); // 30
console.log('cache.get("A") ->', cache.get("A")); // 10

console.log("\n=== Update existing key ===");
cache.put("A", 99); // A already exists, value updated, stays most recent
console.log('cache.get("A") ->', cache.get("A")); // 99

console.log("\n=== Eviction after update ===");
const cache2 = new Cache(2);
cache2.put("X", 1);
cache2.put("Y", 2);
cache2.get("X"); // X becomes most recently used
cache2.put("Z", 3); // evicts Y (least recently used), not X
console.log('cache2.get("X") ->', cache2.get("X")); // 1
console.log('cache2.get("Y") ->', cache2.get("Y")); // -1
console.log('cache2.get("Z") ->', cache2.get("Z")); // 3

console.log("\n=== TTL / expiration (bonus) ===");
const ttlCache = new Cache(5);
ttlCache.put("short", "expires-fast", 200); // 200ms TTL
ttlCache.put("long", "sticks-around"); // no TTL, never expires
console.log('immediately: ttlCache.get("short") ->', ttlCache.get("short"));

setTimeout(() => {
  console.log('after 300ms: ttlCache.get("short") ->', ttlCache.get("short")); // -1, expired
  console.log('after 300ms: ttlCache.get("long") ->', ttlCache.get("long")); // still there
}, 300);
