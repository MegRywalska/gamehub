const CACHE_NAME = 'gamehub-v1';
const urlsToCache = [
    '/gamehub/',
    '/gamehub/dashboard.html',
    '/gamehub/dashboard.js',
    '/gamehub/index.html',
    '/gamehub/registration.html',
    '/gamehub/validationLogin.js',
    '/gamehub/validationRegistration.js',
    '/gamehub/manifest.json',
    '/gamehub/images/gamehub-high-resolution-logo-transparent.png',
    '/gamehub/output.css'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
                .catch(error => {
                    console.error('Error cache.addAll:', error);
                });
        })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
            );
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
