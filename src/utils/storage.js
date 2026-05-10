// src/utils/storage.js (Enhanced version)
const STORAGE_PREFIX = 'creatoros_'

class StorageManager {
  set(key, value) {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(STORAGE_PREFIX + key, serialized)
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  }

  exists(key) {
    return localStorage.getItem(STORAGE_PREFIX + key) !== null
  }

  getSize(key) {
    const item = localStorage.getItem(STORAGE_PREFIX + key)
    return item ? new Blob([item]).size : 0
  }

  getTotalSize() {
    const keys = Object.keys(localStorage)
    let totalSize = 0
    
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const item = localStorage.getItem(key)
        totalSize += item ? new Blob([item]).size : 0
      }
    })
    
    return totalSize
  }

  getAllKeys() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .map(key => key.replace(STORAGE_PREFIX, ''))
  }
}

export const storage = new StorageManager()
