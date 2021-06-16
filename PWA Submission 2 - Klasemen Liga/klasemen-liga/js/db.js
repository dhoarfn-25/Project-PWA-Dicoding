let dbPromise = idb.open("klasemen-liga", 6, function (upgradeDB) {
  if (!upgradeDB.objectStoreNames.contains('teamFavorite')) {
      let favTeamIndex = upgradeDB.createObjectStore('teamFavorite', {
          keyPath: 'id'
      })
      favTeamIndex.createIndex('id', 'id', {
          unique: false
      })
  }
})

// ADD data
function saveFav(data) {
  dbPromise.then(db => {
      let tx = db.transaction('teamFavorite', 'readwrite')
      tx.objectStore('teamFavorite').add(data)
      return tx.complete
  })
}

// READ data
function readFav() {
  return dbPromise.then(async db => {
      let tx = await db.transaction('teamFavorite', 'readonly')
      let store = await tx.objectStore('teamFavorite')
      return await store.getAll()
  })
}
// CHECK DATA
function checkDataFav(id) {
  return dbPromise
        .then(async db => {
          let tx = await db.transaction('teamFavorite', 'readonly')
          let data = await tx.objectStore('teamFavorite')
          return data.get(id)
        })
}
// DELETE data
function deleteFav(id) {
  dbPromise.then(db => {
      let tx = db.transaction('teamFavorite','readwrite')
      let data = tx.objectStore('teamFavorite')
      data.delete(id)
      return tx.complete
  })
}