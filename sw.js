const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1")
  await cache.addAll(resources)
}

this.addEventListener('install', event => {
  console.log('Perform install steps')
  event.waitUntil(
    addResourcesToCache([
        '/',
        '/index.html',
        '/github-icon.svg',
        '/scoreCalc.png'
      ])
  )
})

this.addEventListener("fetch", event => {
  onsole.log('Handling fetch event for', event.request.url);
  
  event.respondWith(caches.match(event.request))
})