// src/components/navigation/DashboardHeader.jsx (UPDATED - more complete)
import { FiMenu, FiBell, FiSearch, FiSun, FiMoon } from 'react-icons/fi'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'

function DashboardHeader() {
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen)
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)
  const user = useAuthStore((state) => state.user)
  const [notifications] = useState(3)

  return (
    <header className={`fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5`}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <FiMenu size={20} />
          </button>

          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md">
            <FiSearch className="text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search projects, tools, settings..."
              className="bg-transparent text-white placeholder-gray-500 focus:outline-none w-full text-sm"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 bg-white/5 rounded text-xs text-gray-500 border border-white/10">
              <span>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle - Fixed missing import */}
          <button className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
            <FiMoon size={18} />
          </button>

          {/* Notifications */}
          <button className="relative text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
            <FiBell size={18} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                {notifications}
              </span>
            )}
          </button>
          
          {/* User Menu */}
          <div className="flex items-center gap-3 ml-2 pl-2 border-l border-white/5">
            <div className="hidden sm:block text-right">
              <p className="text-white text-sm font-medium">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-gray-500 text-xs">Pro Plan</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-r from-brand-500 to-accent-pink rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'C'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
