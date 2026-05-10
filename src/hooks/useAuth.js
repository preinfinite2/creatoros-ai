// src/hooks/useAuth.js (Missing hook for auth operations)
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import toast from 'react-hot-toast'

export function useAuth() {
  const navigate = useNavigate()
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: storeLogin,
    signup: storeSignup,
    logout: storeLogout,
    updateProfile,
    clearError,
  } = useAuthStore()

  const login = useCallback(async (email, password) => {
    try {
      await storeLogin(email, password)
      toast.success('Welcome back! 🎉')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }, [storeLogin, navigate])

  const signup = useCallback(async (email, password, confirmPassword) => {
    try {
      await storeSignup(email, password, confirmPassword)
      toast.success('Account created! 🎉')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }, [storeSignup, navigate])

  const logout = useCallback(() => {
    storeLogout()
    navigate('/')
    toast.success('Logged out')
  }, [storeLogout, navigate])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
  }
}
