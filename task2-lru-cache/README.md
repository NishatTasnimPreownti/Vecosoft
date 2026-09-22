# LRU Cache

A Least Recently Used (LRU) cache implemented in JavaScript (Node.js), supporting `get(key)`, `put(key, value)`, positive-capacity enforcement, and an optional bonus TTL/expiration feature.

## Data structures used and why

The cache is backed by a single [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

A `Map` in JavaScript:
- gives O(1) average-time `get`/`set`/`delete` by key (hash table), and
- **preserves insertion order** when iterating.

That second property is what makes it usable as the sole structure for an LRU cache: instead of pairing a hash map with a hand-rolled doubly linked list (the classic textbook approach), we can use the Map's own iteration order as the recency list. This keeps the implementation simpler while still meeting the O(1) requirement, because `Map#delete` + `Map#set` are each O(1) average.

## How LRU ordering is maintained

- **On `get(key)`**: if the key exists (and hasn't expired), its entry is removed and immediately re-inserted into the `Map`. Since `Map` iterates in insertion order, this moves the key to the "most recently used" end.
- **On `put(key, value)`**:
  - If the key already exists, it's deleted first (so the following insert moves it to the most-recently-used end) and its value is updated.
  - If the key is new and the cache is at capacity, the **first** key returned by the `Map`'s iterator (`map.keys().next().value`) is evicted — that key is, by construction, the one that has gone the longest without being touched, i.e. the least recently used entry.
  - The key/value is then inserted at the most-recently-used end.

This means the head of the Map's iteration order is always the LRU entry, and the tail is always the MRU entry — no separate linked list bookkeeping needed.

## Time complexity

- `get(key)`: O(1) average (one `Map.has`/`get`, one `delete`, one `set`)
- `put(key, value)`: O(1) average (constant number of `Map` operations regardless of cache size)

## Space complexity

O(capacity) — the cache stores at most `capacity` entries, each holding a key, a value, and (optionally) an expiration timestamp.

## TTL / expiration (bonus)

`put(key, value, ttl)` accepts an optional `ttl` in milliseconds (or a `defaultTTL` can be passed to the `Cache` constructor to apply to all entries). Each entry stores `expiresAt = Date.now() + ttl`.

- `get(key)` lazily checks `expiresAt` before returning a value. If the entry has expired, it is deleted from the map and `-1` is returned, exactly as if the key didn't exist.
- There is no background sweep/timer — expiration is checked lazily on access. This keeps the implementation simple and avoids timer overhead, at the trade-off that an expired-but-never-accessed-again entry stays in memory (and still counts toward `capacity`) until it's evicted by normal LRU pressure or looked up.
- Entries with no TTL never expire.

See `example.js` for a demonstration of TTL expiration.

## How to run it

Requires only Node.js (no dependencies).

```bash
# Run the test suite
node lruCache.test.js

# Run the example / demo matching the spec's sample sequence, plus TTL demo
node example.js
```

## Files

- `lruCache.js` — the `Cache` implementation
- `lruCache.test.js` — automated tests (spec example, eviction order, capacity validation, TTL expiration)
- `example.js` — runnable demo producing the output shown in the submission screenshot
