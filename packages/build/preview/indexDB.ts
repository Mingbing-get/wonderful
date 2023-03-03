type DataType = {
  data: any,
  audioInfo: any
}

const version = 3

export function save(dbName: string, tableName: string, data: DataType) {
  const request = indexedDB.open(dbName, version)

  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('打开indexDB失败')
    }
    request.onsuccess = () => {
      saveByDb(request.result, tableName, data)
        .then(resolve)
        .catch(reject)
    }

    request.onupgradeneeded = (event) => {
      const db = request.result

      if (!db.objectStoreNames.contains(tableName)) {
        const objectStore = db.createObjectStore(tableName, { keyPath: 'id' })
        objectStore.createIndex('data', 'data')
        objectStore.createIndex('audioInfo', 'audioInfo')
      }
      saveByDb(db, tableName, data)
        .then(resolve)
        .catch(reject)
    }
  })
}

function saveByDb(db: IDBDatabase, tableName: string, data: DataType) {
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains(tableName)) {
      const writeRequest = db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .add({ id: 1, ...data })

      writeRequest.onsuccess = () => {
        resolve('保存成功')
      }
      writeRequest.onerror = () => {
        reject('保存失败')
      }
      return
    }
    const transaction = db.transaction([tableName])
    const objectStore = transaction.objectStore(tableName)
    const request = objectStore.get(1)

    request.onerror = () => {
      const writeRequest = db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .add({ id: 1, ...data })

      writeRequest.onsuccess = () => {
        resolve('保存成功')
      }
      writeRequest.onerror = () => {
        reject('保存失败')
      }
    }
    request.onsuccess = () => {
      const putRequest = db.transaction([tableName], 'readwrite')
        .objectStore(tableName)
        .put({ id: 1, ...data })

      putRequest.onsuccess = () => {
        resolve('保存成功')
      }
      putRequest.onerror = () => {
        reject('保存失败')
      }
    }
  })
}

export function read(dbName: string, tableName: string) {
  const request = indexedDB.open(dbName, version)

  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('打开indexDB失败')
    }
    request.onsuccess = () => {
      if (!request.result.objectStoreNames.contains(tableName)) {
        resolve({ id: 1, data: [], audioInfo: null })
        return
      }

      const transaction = request.result.transaction([tableName])
      const objectStore = transaction.objectStore(tableName)
      const readRequest = objectStore.get(1)

      readRequest.onerror = () => {
        resolve({ id: 1, data: [], audioInfo: null })
      }
      readRequest.onsuccess = () => {
        resolve(readRequest.result)
      }
    }

    request.onupgradeneeded = (event) => {
      const db = request.result

      if (!db.objectStoreNames.contains(tableName)) {
        const objectStore = db.createObjectStore(tableName, { keyPath: 'id' })
        objectStore.createIndex('data', 'data')
        objectStore.createIndex('audioInfo', 'audioInfo')
        resolve({ id: 1, data: [], audioInfo: null })
      }
    }
  })
}