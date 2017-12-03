self.addEventListener('install', (evt) => {
  console.info('[ServiceWorker]: Installing ServiceWorker...', evt);
  return null;
});

self.addEventListener('activate', (evt) => {
  console.info('[ServiceWorker]: Activating ServiceWorker...', evt);
  return self.clients.claim(); // Ensures ServiceWorker(s) are properly activated
});

self.addEventListener('fetch', (evt) => {
  console.info('[ServiceWorker]: Fetching item...', evt);
  return evt.respondWith(fetch(evt.request) || null);
});
