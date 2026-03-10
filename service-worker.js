const CACHE_NAME = "life-planner-v3";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  // Dark theme icons (default)
  "./appIcon-dark.png",
 
  // Light theme icons
  "./appIcon-light.png",
];

// ── Install: pre-cache all core assets ───────────────────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
  // Take control immediately without waiting for old SW to expire
  self.skipWaiting();
});

// ── Activate: delete stale caches from previous versions ─────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  // Claim all open clients so new SW is active immediately
  self.clients.claim();
});

// ── Fetch: cache-first for assets, network-first for navigation ───────────────
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  if (request.mode === "navigate") {
    // Navigation: network-first so app shell is always fresh
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
  } else {
    // Assets: cache-first, update cache in background
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(request, clone));
          }
          return res;
        });
        return cached || fetchPromise;
      })
    );
  }
});

// ── Push notifications ────────────────────────────────────────────────────────
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Life Planner";
  const options = {
    body:    data.body  || "Reminder",
    icon:    "appIcon-dark.png",
    badge:   "appIcon-dark.png",
    data:    data.url ? { url: data.url } : {},
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification click: open / focus the app ─────────────────────────────────
self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data?.url || "./";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes(location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});