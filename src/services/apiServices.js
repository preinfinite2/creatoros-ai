// src/services/apiService.js (API service ready for backend integration)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const token = this._getToken()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Network error. Please check your connection.')
      }
      throw error
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' })
  }

  // Project endpoints
  async getProjects() {
    return this.request('/projects')
  }

  async createProject(data) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, { method: 'DELETE' })
  }

  // AI Generation endpoints
  async generateContent(toolType, input) {
    return this.request('/generate', {
      method: 'POST',
      body: JSON.stringify({ toolType, input }),
    })
  }

  _getToken() {
    try {
      const session = localStorage.getItem('creatoros_session')
      return session ? JSON.parse(session).token : null
    } catch {
      return null
    }
  }
}

export const apiService = new ApiService()
