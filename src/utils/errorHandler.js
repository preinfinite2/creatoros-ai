// src/utils/errorHandler.js
class ErrorHandler {
  constructor() {
    this.errorLog = []
    this.maxLogSize = 100
  }

  handle(error, context = {}) {
    const errorObj = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userId: this._getUserId(),
    }

    this.errorLog.unshift(errorObj)
    
    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(0, this.maxLogSize)
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorHandler]', errorObj)
    }

    // Send to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this._sendToService(errorObj)
    }

    return this._getUserFriendlyMessage(error, context)
  }

  _getUserFriendlyMessage(error, context) {
    // Return user-friendly messages based on error type
    if (error.message?.includes('Network')) {
      return 'Please check your internet connection and try again.'
    }
    
    if (error.message?.includes('validation')) {
      return error.message
    }

    if (context.type === 'auth') {
      return 'Authentication failed. Please try again.'
    }

    if (context.type === 'generation') {
      return 'Content generation failed. Please try again.'
    }

    return 'Something went wrong. Please try again later.'
  }

  _getUserId() {
    try {
      const user = localStorage.getItem('creatoros_current_user')
      return user ? JSON.parse(user).id : 'anonymous'
    } catch {
      return 'anonymous'
    }
  }

  _sendToService(errorObj) {
    // Integration with error tracking services like Sentry
    // Example:
    // Sentry.captureException(errorObj)
  }

  getErrorLog() {
    return this.errorLog
  }

  clearErrorLog() {
    this.errorLog = []
  }
}

export const errorHandler = new ErrorHandler()
