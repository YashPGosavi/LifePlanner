const CACHE_NAME = "life-planner-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/appIcon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {

      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });

      return cached || fetchPromise;
    })
  );
});

self.addEventListener("push", event => {

  const data = event.data ? event.data.json() : {};

  const title = data.title || "Life Planner";

  const options = {
    body: data.body || "Reminder",
    icon: "appIcon.png",
    badge: "appIcon.png"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );

});
