// src/components/Sidebar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  FiHome,
  FiType,
  FiTarget,
  FiFileText,
  FiLightbulb,
  FiSave,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft
} from 'react-icons/fi'

const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard', exact: true },
  { path: '/dashboard/title-generator', icon: FiType, label: 'Title Generator' },
  { path: '/dashboard/hook-generator', icon: FiTarget, label: 'Hook Generator' },
  { path: '/dashboard/script-generator', icon: FiFileText, label: 'Script Generator' },
  { path: '/dashboard/idea-generator', icon: FiLightbulb, label: 'Idea Generator' },
  { path: '/dashboard/saved', icon: FiSave, label: 'Saved Projects' },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-lg text-white"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        bg-black/80 backdrop-blur-xl border-r border-white/5
        transition-all duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              {!collapsed && (
                <span className="text-white font-bold text-lg truncate">CreatorOS AI</span>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/5">
            {!collapsed && (
              <div className="text-sm">
                <p className="text-gray-400 truncate">{user?.email}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <item.icon className="text-xl flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/5 space-y-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <FiChevronLeft className={`text-xl transition-transform ${collapsed ? 'rotate-180' : ''}`} />
              {!collapsed && <span>Collapse</span>}
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <FiLogOut className="text-xl flex-shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
