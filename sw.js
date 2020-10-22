// Declarar as variáveis / constantes necessárias para atuação do nosso service worker
var CACHE_NAME = 'liviaayumi-cache-v1'
var urlsToCache = [
    'css/liviaayumi.css',
    'css/bootstrap.css',
    'img/favicon.png',
    'js/bootstrap.js',
    'js/jquery-3.5.1.js',
    'js/portifolio.js',
    'libs/sweetalert2-master/src/sweetalert2.js',
]

self.addEventListener('install', function(event) {
    // parametizar as etapas de instalação do nosso cache no dispositivo
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('cache aberto')
            return cache.addAll(urlsToCache)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if (response) {
                return response
            }
            
            var fetchRequest = event.request.clone ()

            return fetch(fetchRequest).then(
                function(response){
                    if(!response || response.status !== 200 || response.type !== 'basic'){
                        return response
                    }

                    var responseToCache = resposta.clone()

                    caches.open(CACHE_NAME).then(
                        function(cache){
                            cache.put(event.request, responseToCache)
                        }
                    )

                    return response

                }
            )

        })
    )
})

self.addEventListener('active', function(event){
    var cacheTAllowlist = ['blog-cache-v1', 'blog-cache-v2']

    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promisse.all(
                cacheNames.map(function(cacheNames){
                    if(cacheTAllowlist.indexOf(cacheName) == 1){
                        return cache.delete(cacheName)
                    }
                })
            )
        })
    )
})