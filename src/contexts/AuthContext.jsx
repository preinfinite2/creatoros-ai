// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('creatoros_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem('creatoros_users') || '[]')
    
    if (users.find(u => u.email === email)) {
      throw new Error('User already exists')
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      createdAt: new Date().toISOString()
    }
    
    users.push({ ...newUser, password })
    localStorage.setItem('creatoros_users', JSON.stringify(users))
    localStorage.setItem('creatoros_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('creatoros_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const { password: _, ...userWithoutPassword } = user
    localStorage.setItem('creatoros_user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
    return userWithoutPassword
  }

  const logout = () => {
    localStorage.removeItem('creatoros_user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
