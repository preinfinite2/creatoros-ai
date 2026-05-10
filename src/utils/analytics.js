// src/utils/analytics.js
class Analytics {
  constructor() {
    this.enabled = true
    this.events = []
  }

  trackEvent(eventName, properties = {}) {
    if (!this.enabled) return

    const event = {
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      userId: this._getUserId(),
    }

    this.events.push(event)

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      this._sendToService(event)
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, properties)
    }
  }

  trackPageView(pageName) {
    this.trackEvent('page_view', { page: pageName })
  }

  trackGeneration(toolType, input, success) {
    this.trackEvent('generation', {
      tool: toolType,
      inputLength: JSON.stringify(input).length,
      success,
    })
  }

  trackProjectAction(action, projectType) {
    this.trackEvent('project_action', {
      action,
      type: projectType,
    })
  }

  trackSignup() {
    this.trackEvent('signup', { timestamp: Date.now() })
  }

  trackLogin() {
    this.trackEvent('login', { timestamp: Date.now() })
  }

  getEvents() {
    return this.events
  }

  clearEvents() {
    this.events = []
  }

  _getUserId() {
    try {
      const user = localStorage.getItem('creatoros_current_user')
      if (user) {
        return JSON.parse(user).id
      }
    } catch {}
    return 'anonymous'
  }

  _sendToService(event) {
    // Implementation for sending to Google Analytics, Mixpanel, etc.
    // Example:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(event),
    // })
  }
}

export const analytics = new Analytics()
