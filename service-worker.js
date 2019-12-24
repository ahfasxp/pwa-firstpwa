const CACHE_NAME = "mycode";
var urlsToCache = [
  "/",
  "nav.html",
  "index.html",
  "manifest.json",
  "home.jpg",
  "html.svg",
  "css.png",
  "javascript.svg",
  "php.svg",
  "pages/home.html",
  "pages/html.html",
  "pages/css.html",
  "pages/javascript.html",
  "pages/php.html",
  "css/materialize.min.css",
  "js/materialize.min.js",
  "js/nav.js"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });


  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
