// src/store/authStore.js
import { create } from 'zustand'
import { authService } from '@services/authService'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  initialize: () => {
    try {
      const user = authService.getCurrentUser()
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      set({ isLoading: false })
    }
  },

  signup: async (email, password, confirmPassword) => {
    set({ error: null, isLoading: true })
    try {
      const user = await authService.signup(email, password, confirmPassword)
      set({ user, isAuthenticated: true, isLoading: false })
      return user
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  login: async (email, password) => {
    set({ error: null, isLoading: true })
    try {
      const user = await authService.login(email, password)
      set({ user, isAuthenticated: true, isLoading: false })
      return user
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    set({ user: null, isAuthenticated: false, error: null })
  },

  updateProfile: (data) => {
    const updated = authService.updateProfile(data)
    set({ user: updated })
    return updated
  },

  clearError: () => set({ error: null }),
}))
