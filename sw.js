/**
 * sw.js — Service Worker for Cooch Behar Healthcare Directory
 * Implements Cache-First for static assets (HTML, CSS, JS, icons)
 * and Network-First for CSV/API data to keep content fresh.
 * Provides offline fallback for the main page.
 */

const CACHE_NAME = 'cbh-directory-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/data.js',
    '/utils.js',
    '/config.js',
    '/png-share.js',
    '/manifest.json',
    '/icon.svg'
];

// Install event: pre-cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

// Fetch event: strategy based on request type
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // For Google Sheets CSV and Apps Script API, use Network-First with cache fallback
    if (url.pathname.includes('/spreadsheets/') || url.pathname.includes('/macros/')) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    // For Telegram API, network only (no caching)
    if (url.hostname === 'api.telegram.org') {
        event.respondWith(fetch(event.request));
        return;
    }

    // For static assets (including same-origin), use Cache-First
    event.respondWith(cacheFirst(event.request));
});

/**
 * Cache-First strategy: serve from cache, update cache in background.
 */
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) {
        // Background cache refresh (stale-while-revalidate)
        fetch(request).then(response => {
            if (response.ok) {
                caches.open(CACHE_NAME).then(cache => cache.put(request, response));
            }
        }).catch(() => {});
        return cached;
    }
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        // Offline fallback for navigation requests
        if (request.mode === 'navigate') {
            return caches.match('/index.html');
        }
        throw error;
    }
}

/**
 * Network-First strategy: try network, fallback to cache.
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        throw error;
    }
}
