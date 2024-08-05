
globalThis.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil((async function () {
        globalThis.skipWaiting();
    })());
});

globalThis.addEventListener('activate', function (e) {
    e.waitUntil((async function () {
        await clients.claim();
    })());
});



function nop() {}



