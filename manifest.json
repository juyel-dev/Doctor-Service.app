const CACHE = "cbhd-v1";
const STATIC = [
  "./",
  "./index.html",
  "./style.css",
  "./config.js",
  "./utils.js",
  "./data.js",
  "./app.js",
  "./png-share.js",
  "./manifest.json",
  "./icon.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(
        ks.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = e.request.url;
  const isNetworkFirst =
    url.includes("docs.google.com") ||
    url.includes("script.google.com") ||
    url.includes("api.telegram.org") ||
    url.includes("cdnjs.cloudflare.com");

  if (isNetworkFirst) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});
