// src/utils/debounce.js
export function debounce(func, wait = 300) {
  let timeout
  
  const debounced = (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
  }

  return debounced
}

export function throttle(func, limit = 300) {
  let inThrottle
  let lastFunc
  let lastRan

  return (...args) => {
    if (!inThrottle) {
      func(...args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
