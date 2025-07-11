const CACHE_NAME = 'japanese-letters-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/IMG_20250710_183738_(192_x_192_ピクセル).png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/IMG_20250710_183648_(512_x_512_ピクセル).png',
  '/icons/favicon.ico',
  '/icons/apple-touch-icon.png',
  '/icons/safari-pinned-tab.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});
