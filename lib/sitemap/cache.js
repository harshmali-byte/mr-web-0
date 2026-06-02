const store = new Map();

/**
 * In-process cache for sitemap generation (per Node server instance).
 * Speeds up repeat requests in dev and after cache expiry on the CDN.
 */
export function getCached(key, ttlMs, factory) {
  const now = Date.now();
  const hit = store.get(key);

  if (hit && hit.expiresAt > now) {
    return Promise.resolve(hit.value);
  }

  return Promise.resolve(factory()).then((value) => {
    store.set(key, { value, expiresAt: now + ttlMs });
    return value;
  });
}

export function invalidateSitemapCache() {
  store.clear();
}
