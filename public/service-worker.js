// /* eslint-disable no-restricted-globals */

// const CACHE_NAME = 'my-cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/logo192.png',
//   '/logo512.png',
//   '/static/js/main.js', // Verifique o caminho correto para o JS
//   '/static/css/main.css' // Verifique o caminho correto para o CSS
// ];

// // Instalar o Service Worker e armazenar os arquivos no cache
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Service Worker: Arquivos em cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // Interceptar requisições e servir do cache quando disponível
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }
//         return fetch(event.request);
//       })
//   );
// });

// Interceptar requisições e servir do cache quando disponível
// // Ativar o Service Worker e limpar caches antigos
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName); // Limpar caches antigos
//           }
//           return Promise.resolve(); // Evita que undefined entre no Promise.all
//         })
//       );
//     })
//   );
// });




// /* eslint-disable no-restricted-globals */

// const CACHE_NAME = "my-cache-v2"; // Atualize para forçar nova versão do cache
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/logo192.png",
//   "/logo512.png",
//   "/static/js/main.js",
//   "/static/css/main.css"
// ];

// // Instalar o Service Worker e armazenar os arquivos no cache
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Service Worker: Arquivos em cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Estratégia de Cache First com Network Fallback
// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     // Garante que a página inicial funcione offline
//     event.respondWith(
//       caches.match("/index.html").then((cachedResponse) => {
//         return cachedResponse || fetch(event.request);
//       })
//     );
//     return;
//   }

//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return (
//         cachedResponse ||
//         fetch(event.request)
//           .then((response) => {
//             // Verifica se a resposta é válida antes de armazenar no cache
//             if (!response || response.status !== 200 || response.type !== "basic") {
//               return response;
//             }

//             let responseClone = response.clone();
//             caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, responseClone);
//             });

//             return response;
//           })
//           .catch(() => {
//             return caches.match("/index.html"); // Retorna a página inicial offline se falhar
//           })
//       );
//     })
//   );
// });

// // Ativar o Service Worker e remover caches antigos
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//           return null;
//         })
//       );
//     })
//   );
// });





/* eslint-disable no-restricted-globals */

const CACHE_NAME = "my-cache-v3"; // Mudamos o nome para forçar atualização
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json", // Adicionamos o manifesto ao cache
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
    // Isso garante que a página inicial carregue no Safari offline
    event.respondWith(
      caches.match("/index.html").then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((response) => {
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
      return caches.match("/index.html"); // Tenta servir o index.html offline no Safari
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
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});
