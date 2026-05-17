/**
 * COOCH BEHAR HEALTHCARE DIRECTORY
 * Service Worker
 * 
 * Cache Strategy:
 *   - Static assets: Cache First (fastest load, offline capable)
 *   - API / CSV / Telegram: Network First (fresh data always preferred)
 */

const CACHE_NAME = 'cbh-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './config.js',
  './utils.js',
  './data.js',
  './png-share.js',
  './app.js',
  './manifest.json',
  './icon.svg'
];

// Install: Pre-cache static shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Activate: Clean stale caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(name) {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

// Fetch: Route-based strategy
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Network-first for Google APIs, Telegram, and data endpoints
  if (
    url.hostname.includes('google') ||
    url.hostname.includes('telegram') ||
    event.request.url.includes('script.google.com')
  ) {
    event.respondWith(
      fetch(event.request)
        .catch(function() {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Cache-first for static local assets
  event.respondWith(
    caches.match(event.request)
      .then(function(cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(function(networkResponse) {
            if (
              !event.request.url.startsWith('http') ||
              event.request.method !== 'GET' ||
              networkResponse.status !== 200
            ) {
              return networkResponse;
            }

            var clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });

            return networkResponse;
          })
          .catch(function() {
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
      })
  );
});
