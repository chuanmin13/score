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
  console.log('Handling fetch event for', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        } 

      return fetch(event.request)
        .then(function (response) {
          console.log('Response from network is:', response)
          // 加入快取供之後使用
          return caches.open('v1').then(function (cache) {
            cache.put(event.request, response.clone())
            return response;
          })
        })
        .catch(function (error) {
          // 錯誤處理
          console.error('Fetching failed:', error)
          throw error;
        })
      
    })
  )
})

