/* eslint-disable no-restricted-globals */

const CACHE_NAME = "my-cache-v5";  // Atualiza a versão do cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json", // Cache o manifest.json
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
  // Trata as requisições de navegação
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Serve a página do cache, se disponível
        }

        // Se não houver cache, tenta pegar da rede
        return fetch(event.request);
      })
    );
    return;
  }

  // Para outros tipos de requisição (JS, CSS, imagens), tenta buscar no cache
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;  // Serve o conteúdo do cache
      }

      // Se não encontrado, tenta fazer o fetch e guardar no cache
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        let responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);  // Coloca o novo conteúdo no cache
        });

        return response;
      });
    }).catch(() => {
      // Caso haja erro no fetch, serve o index.html
      return caches.match("/index.html");
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
