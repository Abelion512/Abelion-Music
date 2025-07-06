const cacheName = 'abelion-player-v1';
const assets = [
  './',
  './index.html',
  './detail-lagu.html',
  './music/lagu1.mp3',
  './music/lagu2.mp3',
  './music/lagu3.mp3',
  './music/lagu4.mp3',
  './music/lagu5.mp3',
  './music/lagu6.mp3',
  '.image/doit.jpeg',
  './video/doit_bg.mp4',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  './service-worker.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
  self.skipWaiting(); // ⬅ agar langsung aktif
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== cacheName).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // ⬅ aktifkan langsung di semua tab
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res =>
      res || fetch(e.request)
    )
  );
});
