const CACHE_NAME = "klasemen-liga-v6.8";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/klasemen.html",
  "/pages/fav.html",
  "/pages/teaminf.html",
  "/pages/team.html",
  "/css/materialize.css",
  "/css/style.css",
  "/js/jquery-3.5.1.min.js",
  "/js/api-set.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/init-sw.js",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/push.js",
  "/sw.js",
  "img/football.png",
  "img/app_bg.svg",
  "img/user_bg.jpg",
  "img/user.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2"
]

const base_url = 'https://api.football-data.org/v2'

//install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
        })
    )
})

//fetch cache
self.addEventListener('fetch', event => {
    if (event.request.url.indexOf(base_url) > -1){
        event.respondWith(
            (async () => {
                const cache = await caches.open(CACHE_NAME)
                const res = await fetch(event.request)
                cache.put(event.request.url, res.clone())
                return res
            })()
        )
    } else {
        event.respondWith(
            (async () => {
                return await caches.match(event.request.url, {
                    ignoreSearch: true
                }) || await fetch(event.request)
            })()
        )
    }
})

//delete cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('cache '+cacheName+' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

// push notification
self.addEventListener('push', event => {
  console.log(event);
  let body;
  if (event.data) {
      body = event.data.text()
  }else{
      body = "push message no payload"
  }

  let options ={
      body,
      icon : 'img/football.png',
      vibrate : [100,50,100],
      data : {
          dateOfArrival : Date.now(),
          primaryKey : 1
      }
  }

  event.waitUntil(
      self.registration.showNotification('Push notification',options)
  )
})
  