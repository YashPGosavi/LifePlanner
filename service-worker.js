const CACHE_NAME = "life-planner-v4";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./appIcon-dark.png",
  "./appIcon-light.png"
];


// ── Install: cache core assets ─────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        CORE_ASSETS.map(asset =>
          cache.add(asset).catch(() => {
            console.warn("Failed to cache:", asset);
          })
        )
      )
    )
  );

  self.skipWaiting();
});


// ── Activate: remove old caches ────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});


// ── Fetch strategy ─────────────────────────────────────
self.addEventListener("fetch", event => {

  const request = event.request;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;


  // ── Navigation → Network First (keeps app fresh)
  if (request.mode === "navigate") {

    event.respondWith(
      fetch(request)
        .then(response => {

          const clone = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put("./index.html", clone));

          return response;

        })
        .catch(() => caches.match("./index.html"))
    );

    return;
  }


  // ── Assets → Cache First
  event.respondWith(

    caches.match(request)
      .then(cached => {

        if (cached) return cached;

        return fetch(request)
          .then(response => {

            if (!response || response.status !== 200) return response;

            const clone = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, clone));

            return response;

          });

      })

  );

});