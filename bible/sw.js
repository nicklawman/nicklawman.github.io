/* sw.js */
const DEV_MODE = false; // ← set true while developing to bypass all caches
const VERSION = "v5"; // ← bump on each deploy to invalidate old caches

// Scope-aware core assets (useful on GitHub Pages where scope includes /<repo>/)
const SCOPE = self.registration.scope; // e.g. https://user.github.io/repo/
const CORE = [
  SCOPE, // the scope root
  SCOPE + "index.html",
  SCOPE + "manifest.webmanifest",
  SCOPE + "bible.json",
  SCOPE + "summary.json",
  SCOPE + "qrcode.png",
  // add other critical files if you add them (css/js/icons)
];

self.addEventListener("install", (event) => {
  if (!DEV_MODE) {
    event.waitUntil(caches.open("core-" + VERSION).then((c) => c.addAll(CORE)));
  }
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if (!DEV_MODE) {
        const keys = await caches.keys();
        await Promise.all(
          keys.map((k) => {
            // keep only caches for this VERSION
            if (!k.endsWith(VERSION)) return caches.delete(k);
          }),
        );
      } else {
        // In dev, clear everything so you always see fresh
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // OPTION 1: DEV_MODE bypasses all caching
  if (DEV_MODE) {
    event.respondWith(fetch(req, { cache: "no-store" }));
    return;
  }

  // OPTION 3: if URL has ?nocache, always hit network (and don't cache)
  if (url.searchParams.has("nocache")) {
    event.respondWith(fetch(req, { cache: "no-store" }));
    return;
  }

  // Always try network first for navigations (index.html-like)
  if (req.mode === "navigate") {
    event.respondWith(networkFirst(req));
    return;
  }

  // Also network-first for the SW file itself so updates land immediately
  if (url.pathname.endsWith("/sw.js")) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Cache-first for everything else (JSON, icons, etc.)
  event.respondWith(cacheFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open("pages-" + VERSION);
  try {
    const fresh = await fetch(req, { cache: "no-store" });
    // Only cache successful, basic/opaque responses
    if (fresh && (fresh.status === 200 || fresh.type === "opaque")) {
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (e) {
    const cached = (await cache.match(req)) || (await caches.match(req));
    if (cached) return cached;
    throw e;
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  const cache = await caches.open("assets-" + VERSION);
  if (res && (res.status === 200 || res.type === "opaque")) {
    cache.put(req, res.clone());
  }
  return res;
}
