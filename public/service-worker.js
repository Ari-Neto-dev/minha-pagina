
/* eslint-disable no-restricted-globals */

// public/service-worker.js
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo192.png',
  '/logo512.png',
  '/static/js/main.js', // Inclua o caminho correto para o JS
  '/static/css/main.css' // Inclua o caminho correto para o CSS
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
             caches.delete(cacheName); // Limpar caches antigos
          }
        })
      );
    })
  );
});
