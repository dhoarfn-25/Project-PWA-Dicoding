

//const CACHE_NAME = "klasemen-liga-v6.8";
//const urlsToCache = [
    
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    {url: "/", revision: '1'},
    {url: "/manifest.json", revision: '1'},
    {url: "/nav.html", revision: '1'},
    {url: "/index.html", revision: '1'},
    {url: "/pages/klasemen.html", revision: '1'},
    {url: "/pages/fav.html", revision: '1'},
    {url: "/pages/teaminf.html", revision: '1'},
    {url: "/pages/team.html", revision: '1'},
    {url: "/css/materialize.css", revision: '1'},
    {url: "/css/style.css", revision: '1'},
    {url: "/js/jquery-3.5.1.min.js", revision: '1'},
    {url: "/js/api-set.js", revision: '1'},
    {url: "/js/api.js", revision: '1'},
    {url: "/js/db.js", revision: '1'},
    {url: "/js/idb.js", revision: '1'},
    {url: "/js/init-sw.js", revision: '1'},
    {url: "/js/materialize.js", revision: '1'},
    {url: "/js/materialize.min.js", revision: '1'},
    {url: "/js/nav.js", revision: '1'},
    {url: "/push.js", revision: '1'},
    {url: "img/football.png", revision: '1'},
    {url: "img/app_bg.svg", revision: '1'},
    {url: "img/user_bg.jpg", revision: '1'},
    {url: "img/user.png", revision: '1'},
    {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: '1'},
    {url: "https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2", revision: '1'}
  ]);
  
  
workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'cache-images',
        plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200]
        }),
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
        ]
    })
);
  
  workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/v2'),
      new workbox.strategies.StaleWhileRevalidate()
  );
  
  workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com/,
      new workbox.strategies.StaleWhileRevalidate({
          cacheName: 'google-fonts-stylesheets',
          plugins: [
              new workbox.cacheableResponse.CacheableResponsePlugin({
                  statuses: [0, 200],
              }),
              new workbox.expiration.ExpirationPlugin({
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  maxEntries: 30,
              }),
          ],
      })
  );
  
  workbox.routing.registerRoute(
      /\.(?:js|css)$/,
     new workbox.strategies.StaleWhileRevalidate({
          cacheName: 'static-resources',
      })
  );
  
  workbox.routing.registerRoute(
  new RegExp('/pages/'),
          new workbox.strategies.StaleWhileRevalidate({
          cacheName: 'pages'
      })
  );
           
  }else
      {
      console.log(`Workbox gagal dimuat`);
      }

//install
//self.addEventListener('install', event => {
    //event.waitUntil(
//        caches.open(CACHE_NAME).then(cache => {
//            return cache.addAll(urlsToCache)
//        })
//    )
//   })

//fetch cache
//self.addEventListener('fetch', event => {
//    if (event.request.url.indexOf(base_url) > -1){
//        event.respondWith(
//            (async () => {
//                const cache = await caches.open(CACHE_NAME)
//                const res = await fetch(event.request)
//                cache.put(event.request.url, res.clone())
//                return res
//            })()
//        )
//    } else {
//        event.respondWith(
//            (async () => {
//                return await caches.match(event.request.url, {
//                    ignoreSearch: true
//                }) || await fetch(event.request)
//            })()
//        )
//    }
//    })

//delete cache
//self.addEventListener('activate', event => {
//    event.waitUntil(
//        caches.keys().then( cacheNames => {
//            return Promise.all(
//                cacheNames.map( cacheName => {
//                    if (cacheName !== CACHE_NAME) {
//                        console.log('cache '+cacheName+' dihapus')
//                        return caches.delete(cacheName)
//                    }
//                })
//            )
//        })
//    )
//})

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
  