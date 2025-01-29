
/* eslint-disable no-restricted-globals */

// public/service-worker.js

const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/logo192.png',
  '/styles.css',
];

// Quando o Service Worker é instalado, faz o cache dos arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Quando o navegador tenta buscar algo, intercepta a requisição
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;  // Serve do cache se encontrar
        }
        return fetch(event.request);  // Senão, faz a requisição normal
      })
  );
});

// Atualiza o Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
             caches.delete(cacheName);  // Limpa caches antigos
          }
        })
      );
    })
  );
});
