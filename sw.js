// Guarda la presentación y el juego en el celular para que abran aunque falle internet.
// La transmisión en vivo (Firebase) siempre va por la red; Firestore guarda su propia copia del recorrido.
const CACHE = 'go-ruta2-v2';
const CORE = [
  './',
  './index.html',
  './juego/',
  './juego/index.html',
  './juego/config.js?v=2',
  './juego/manifest.webmanifest',
  './juego/icon.svg',
  './juego/jugador.webmanifest',
  './juego/icon-192.png',
  './juego/icon-512.png',
  './juego/apple-touch-icon.png'
];
const CDN = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'
];
const CACHEABLE_HOSTS = ['unpkg.com', 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE.map(u => cache.add(u).catch(() => {})));
    await Promise.all(CDN.map(async u => {
      try { const r = await fetch(new Request(u, { mode: 'no-cors' })); await cache.put(u, r); } catch (e) {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('go-ruta2') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  // Firebase (datos en vivo e ingreso) y mapas: siempre por la red
  if (!same && !CACHEABLE_HOSTS.includes(url.hostname)) return;
  if (url.hostname === 'www.gstatic.com' && !url.pathname.startsWith('/firebasejs/')) return;

  // Páginas: primero la red (para tener la última versión) y, si no hay, la copia guardada
  if (req.mode === 'navigate' || (same && /\.html$|\/$/.test(url.pathname))) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (e) {
        return (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./juego/index.html')) || Response.error();
      }
    })());
    return;
  }

  // Resto (scripts, fuentes, config): copia guardada al instante y se actualiza por detrás
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req) || (same ? await cache.match(req, { ignoreSearch: true }) : null);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || Response.error();
  })());
});
