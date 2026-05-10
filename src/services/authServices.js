// src/services/authService.js
const USERS_KEY = 'creatoros_users'
const CURRENT_USER_KEY = 'creatoros_current_user'
const SESSION_KEY = 'creatoros_session'

class AuthService {
  constructor() {
    this.users = this._loadUsers()
  }

  _loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    } catch {
      return []
    }
  }

  _saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users))
  }

  _createSession(user) {
    const session = {
      userId: user.id,
      email: user.email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  }

  _hashPassword(password) {
    // In production, use bcrypt or similar
    // For MVP, we use a simple hash for demo purposes
    return btoa(password + 'creatoros_salt')
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) throw new Error('Email is required')
    if (!re.test(email)) throw new Error('Invalid email format')
    return true
  }

  validatePassword(password) {
    if (!password) throw new Error('Password is required')
    if (password.length < 8) throw new Error('Password must be at least 8 characters')
    if (!/[A-Z]/.test(password)) throw new Error('Password must contain an uppercase letter')
    if (!/[a-z]/.test(password)) throw new Error('Password must contain a lowercase letter')
    if (!/[0-9]/.test(password)) throw new Error('Password must contain a number')
    if (!/[!@#$%^&*]/.test(password)) throw new Error('Password must contain a special character')
    return true
  }

  async signup(email, password, confirmPassword) {
    this.validateEmail(email)
    this.validatePassword(password)
    
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const existingUser = this.users.find(u => u.email === email)
    if (existingUser) {
      throw new Error('An account with this email already exists')
    }

    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      passwordHash: this._hashPassword(password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      settings: {
        theme: 'dark',
        notifications: true,
        defaultTone: 'professional',
      }
    }

    this.users.push(newUser)
    this._saveUsers()
    this._createSession(newUser)

    const { passwordHash, ...userWithoutPassword } = newUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  }

  async login(email, password) {
    this.validateEmail(email)
    
    if (!password) {
      throw new Error('Password is required')
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600))

    const user = this.users.find(u => u.email === email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    const hashedPassword = this._hashPassword(password)
    if (user.passwordHash !== hashedPassword) {
      throw new Error('Invalid email or password')
    }

    this._createSession(user)

    const { passwordHash, ...userWithoutPassword } = user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY)
    localStorage.removeItem(SESSION_KEY)
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY)
      const session = localStorage.getItem(SESSION_KEY)
      
      if (!user || !session) return null

      const parsedSession = JSON.parse(session)
      if (new Date(parsedSession.expiresAt) < new Date()) {
        this.logout()
        return null
      }

      return JSON.parse(user)
    } catch {
      this.logout()
      return null
    }
  }

  isAuthenticated() {
    return !!this.getCurrentUser()
  }

  updateProfile(data) {
    const currentUser = this.getCurrentUser()
    if (!currentUser) throw new Error('Not authenticated')

    const userIndex = this.users.findIndex(u => u.id === currentUser.id)
    if (userIndex === -1) throw new Error('User not found')

    const updatedUser = {
      ...this.users[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    this.users[userIndex] = updatedUser
    this._saveUsers()

    const { passwordHash, ...userWithoutPassword } = updatedUser
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword))
    
    return userWithoutPassword
  }
}

export const authService = new AuthService()
