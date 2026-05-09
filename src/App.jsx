// src/App.jsx
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from '@store/authStore'
import { useProjectStore } from '@store/projectStore'

// Layouts
import PublicLayout from '@components/layout/PublicLayout'
import DashboardLayout from '@components/layout/DashboardLayout'

// Pages
import Landing from '@pages/Landing'
import Login from '@pages/auth/Login'
import Signup from '@pages/auth/Signup'
import Dashboard from '@pages/dashboard/Dashboard'
import Tools from '@pages/dashboard/Tools'
import TitleGenerator from '@pages/dashboard/tools/TitleGenerator'
import HookGenerator from '@pages/dashboard/tools/HookGenerator'
import ScriptGenerator from '@pages/dashboard/tools/ScriptGenerator'
import IdeaGenerator from '@pages/dashboard/tools/IdeaGenerator'
import Projects from '@pages/dashboard/Projects'
import Settings from '@pages/dashboard/Settings'

// Components
import ProtectedRoute from '@components/auth/ProtectedRoute'

function App() {
  const { initialize } = useAuthStore()
  const { loadProjects } = useProjectStore()

  useEffect(() => {
    initialize()
    loadProjects()
  }, [])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111113',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#a855f7',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/title-generator" element={<TitleGenerator />} />
          <Route path="/tools/hook-generator" element={<HookGenerator />} />
          <Route path="/tools/script-generator" element={<ScriptGenerator />} />
          <Route path="/tools/idea-generator" element={<IdeaGenerator />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
