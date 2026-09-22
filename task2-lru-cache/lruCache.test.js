const assert = require("assert");
const { Cache } = require("./lruCache");

function test(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (err) {
    console.log(`FAIL: ${name}`);
    throw err;
  }
}

test("matches the spec example exactly", () => {
  const cache = new Cache(2);
  cache.put("A", 10);
  cache.put("B", 20);
  assert.strictEqual(cache.get("A"), 10);
  cache.put("C", 30);
  assert.strictEqual(cache.get("B"), -1);
  assert.strictEqual(cache.get("C"), 30);
  assert.strictEqual(cache.get("A"), 10);
});

test("get on missing key returns -1", () => {
  const cache = new Cache(1);
  assert.strictEqual(cache.get("nope"), -1);
});

test("put on existing key updates value without growing size", () => {
  const cache = new Cache(2);
  cache.put("A", 1);
  cache.put("A", 2);
  assert.strictEqual(cache.size(), 1);
  assert.strictEqual(cache.get("A"), 2);
});

test("least recently used entry is evicted, not the oldest inserted", () => {
  const cache = new Cache(2);
  cache.put("X", 1);
  cache.put("Y", 2);
  cache.get("X"); // X is now most recently used
  cache.put("Z", 3); // should evict Y, not X
  assert.strictEqual(cache.get("X"), 1);
  assert.strictEqual(cache.get("Y"), -1);
  assert.strictEqual(cache.get("Z"), 3);
});

test("capacity of 1 always evicts the previous single entry", () => {
  const cache = new Cache(1);
  cache.put("A", 1);
  cache.put("B", 2);
  assert.strictEqual(cache.get("A"), -1);
  assert.strictEqual(cache.get("B"), 2);
});

test("constructor rejects non-positive capacity", () => {
  assert.throws(() => new Cache(0));
  assert.throws(() => new Cache(-5));
});

console.log("\n=== Async TTL test ===");
(async () => {
  const cache = new Cache(5);
  cache.put("short", "value", 100);
  assert.strictEqual(cache.get("short"), "value");
  await new Promise((r) => setTimeout(r, 150));
  assert.strictEqual(cache.get("short"), -1);
  console.log("PASS: TTL entry expires after its duration");
  console.log("\nAll tests passed.");
})();
