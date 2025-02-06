/* eslint-disable no-restricted-globals */

const CACHE_NAME = "my-cache-v4";  // Atualize o nome para forçar nova versão
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json", // Adicionamos o manifesto para garantir o comportamento PWA
  "/logo192.png",
  "/logo512.png",
  "/static/js/main.js",
  "/static/css/main.css"
];

// Instalar e armazenar arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Arquivos em cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptar requisições e servir do cache quando possível
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Sempre tenta servir a página principal, mesmo offline
    event.respondWith(
      caches.match("/index.html").then((cachedResponse) => {
        return cachedResponse || fetch(event.request); // Se não tiver no cache, tenta pegar da rede
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Serve do cache se encontrado
      }

      // Tenta pegar da rede se não encontrar no cache
      return fetch(event.request).then((response) => {
        // Se a resposta for válida, coloca no cache para futuras requisições
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        let responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }).catch(() => {
      return caches.match("/index.html"); // Fallback para index.html quando offline
    })
  );
});

// Ativar o Service Worker e limpar caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Limpar caches antigos
          }
          return null;
        })
      );
    })
  );
});
