// Declarar as variáveis / constantes necessárias para atuação do nosso service worker
var CACHE_NAME = 'liviaayumi-cache-v1'
var urlsToCache = [
    'css/liviaayumi.css',
    'css/bootstrap.css',
    'img/favicon.png',
    'js/bootstrap.js',
    'js/jquery-3.5.1.min.js',
    'js/portifolio.js',
    'libs/sweetalert2-master/scr/sweetalert2.js',
]

self.addEventListener('install', function(event) {
    // parametizar as etapas de instalação do nosso cache no dispositivo
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('cache aberto')
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response){
                return response
            }
            return fetch(event.request)
        })
    )
})