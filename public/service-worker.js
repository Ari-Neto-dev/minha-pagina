/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo192.png',
  '/logo512.png',
  '/static/js/main.js', // Verifique o caminho correto para o JS
  '/static/css/main.css' // Verifique o caminho correto para o CSS
];

// Instalar o Service Worker e armazenar os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requisições e servir do cache quando disponível
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

// Ativar o Service Worker e limpar caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Limpar caches antigos
          }
          return Promise.resolve(); // Evita que undefined entre no Promise.all
        })
      );
    })
  );
});
