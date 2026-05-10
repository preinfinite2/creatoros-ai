// src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      await login(email, password)
      toast.success('Welcome back! 🎉')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-pink/10 rounded-full filter blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-accent-pink rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">Sign in to your CreatorOS account</p>
        </div>
        
        <div className="glass p-8">
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
            >
              <FiAlertCircle />
              {errors.submit}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors({ ...errors, email: '' })
                  }}
                  className={`input-primary pl-10 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
              )}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors({ ...errors, password: '' })
                  }}
                  className={`input-primary pl-10 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-600 bg-transparent checked:bg-brand-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-400">
                Remember me for 30 days
              </label>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
              >
                Create free account
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
