const CACHE_NAME = "app-shell";
const urlsToCache = ['index.html', 'offline.html'];
const self = this; //SSW

// importScripts(
//     'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
// );

// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.NetworkFirst()
// );

// Install SW
self.addEventListener('install', (event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('Opened cache');

            return cache.addAll(urlsToCache);
        })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) =>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
                .catch(()=> caches.match('offline.html'))
        })
    )
});

// Activate the SW
self.addEventListener('activate', (event) =>{
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    console.log("activate SW");
    event.waitUntil(
        caches.keys().then((cacheNames)=>{
            Promise.all(
                cacheNames.map((cacheName)=>{
                    if(!cacheWhitelist.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            )
        }))
});

// self.addEventListener('sync', e => {
//     try{
//         console.log('SW: Sync');
//         if ( e.tag === 'new-form' ) {

            
//             const resp = sendForm();

//             self.registration.showNotification(' Succesfully sent');

//             e.waitUntil( resp);
//         }
//     }catch(e){
//         console.log(e);
//     }
// }); 