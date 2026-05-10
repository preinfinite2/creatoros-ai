// src/utils/performance.js
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.enabled = process.env.NODE_ENV === 'development'
  }

  startTimer(label) {
    if (!this.enabled) return
    this.metrics[label] = {
      start: performance.now(),
      end: null,
      duration: null,
    }
  }

  endTimer(label) {
    if (!this.enabled || !this.metrics[label]) return
    this.metrics[label].end = performance.now()
    this.metrics[label].duration = this.metrics[label].end - this.metrics[label].start
    console.log(`⏱️ [Performance] ${label}: ${this.metrics[label].duration.toFixed(2)}ms`)
  }

  measureComponentRender(componentName) {
    if (!this.enabled) return () => {}
    
    this.startTimer(`render_${componentName}`)
    return () => this.endTimer(`render_${componentName}`)
  }

  measureFunction(fn, label) {
    if (!this.enabled) return fn

    return (...args) => {
      this.startTimer(label)
      const result = fn(...args)
      
      if (result instanceof Promise) {
        return result.finally(() => this.endTimer(label))
      }
      
      this.endTimer(label)
      return result
    }
  }

  getMetrics() {
    return this.metrics
  }

  logMetrics() {
    if (!this.enabled) return
    console.table(
      Object.entries(this.metrics).map(([name, data]) => ({
        name,
        duration: data.duration ? `${data.duration.toFixed(2)}ms` : 'pending',
      }))
    )
  }

  clearMetrics() {
    this.metrics = {}
  }
}

export const perfMonitor = new PerformanceMonitor()

// Usage example:
// import { perfMonitor } from '@utils/performance'
// 
// function MyComponent() {
//   useEffect(() => {
//     const cleanup = perfMonitor.measureComponentRender('MyComponent')
//     return cleanup
//   }, [])
// }
