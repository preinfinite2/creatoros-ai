// src/components/navigation/DashboardHeader.jsx - DASHBOARD HEADER COMPONENT
import { FiMenu, FiBell, FiSearch } from 'react-icons/fi'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'

function DashboardHeader() {
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen)
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)
  const user = useAuthStore((state) => state.user)

  return (
    <header className={`fixed top-0 right-0 left-0 lg:left-64 z-30 h-16 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5`}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg"
        >
          <FiMenu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md ml-4">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-transparent text-white placeholder-gray-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg">
            <FiBell size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center">
              <span className="text-brand-400 text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
