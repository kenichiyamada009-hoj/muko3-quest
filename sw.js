const CACHE = 'muko3-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './game.js',
  './manifest.json',
  './Gemini_Generated_Image_ecrvo1ecrvo1ecrv.png',
  './Gemini_Generated_Image_8jr49d8jr49d8jr4.png',
  './Gemini_Generated_Image_20onxk20onxk20on.png',
  './Gemini_Generated_Image_tku6xetku6xetku6.png',
  './Gemini_Generated_Image_8iubvr8iubvr8iub.png',
  './g-4332000mrd-006.jpg',
  './1402935554627.jpg',
  './1992.jpg',
  './331731247_747685599987096_400141926464036215_n.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
