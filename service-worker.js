
const CACHE="ninja-pwa-v17";
const ASSETS=[
  "./","./index.html","./quiz.html","./missions.html","./jutsu.html","./profile.html","./inventory.html",
  "./style.css","./app.js","./questions.js","./quiz.js",
  "./manifest.json","./icon-192.png","./icon-512.png","./apple-touch-icon.png",
  "./assets/home-video-poster.jpg",
  "./assets/characters/naruto.png","./assets/characters/sasuke.png","./assets/characters/sakura.png","./assets/characters/kakashi.png","./assets/characters/itachi.png","./assets/characters/gaara.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;

  const url=new URL(event.request.url);

  // Video-ul se ia direct din retea pentru suport corect al Range requests pe iPhone.
  if(event.request.destination==="video" || /\.(mp4|webm|mov)(\?|$)/i.test(url.pathname)){
    event.respondWith(fetch(event.request));
    return;
  }

  // Pentru pagini/CSS/JS folosim network-first ca actualizarile sa apara imediat.
  if(event.request.mode==="navigate" || /\.(html|css|js)$/.test(url.pathname)){
    event.respondWith(
      fetch(event.request).then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
        return response;
      }).catch(()=>caches.match(event.request).then(r=>r||caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
      return response;
    }))
  );
});
