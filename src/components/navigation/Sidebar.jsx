// src/components/navigation/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom'
import { useUIStore } from '@store/uiStore'
import { useAuthStore } from '@store/authStore'
import {
  FiHome, FiTool, FiFolderOpen, FiSettings,
  FiType, FiTarget, FiFileText, FiLightbulb,
  FiLogOut, FiChevronLeft, FiChevronRight,
  FiZap
} from 'react-icons/fi'
import { clsx } from 'clsx'

const mainNavItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard', exact: true },
  { path: '/tools', icon: FiTool, label: 'AI Tools' },
  { path: '/projects', icon: FiFolderOpen, label: 'Projects' },
  { path: '/settings', icon: FiSettings, label: 'Settings' },
]

const toolItems = [
  { path: '/tools/title-generator', icon: FiType, label: 'Title Generator', color: 'text-purple-400' },
  { path: '/tools/hook-generator', icon: FiTarget, label: 'Hook Generator', color: 'text-pink-400' },
  { path: '/tools/script-generator', icon: FiFileText, label: 'Script Generator', color: 'text-cyan-400' },
  { path: '/tools/idea-generator', icon: FiLightbulb, label: 'Idea Generator', color: 'text-yellow-400' },
]

function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.exact}
      onClick={() => setMobileMenuOpen(false)}
      className={({ isActive }) => clsx(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
        isActive
          ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      )}
    >
      <item.icon className={clsx('text-lg flex-shrink-0', item.color)} />
      {!sidebarCollapsed && (
        <span className="text-sm font-medium truncate">{item.label}</span>
      )}
    </NavLink>
  )

  return (
    <aside className={clsx(
      'fixed top-0 left-0 z-50 h-full bg-surface-dark/95 backdrop-blur-xl border-r border-white/5 transition-all duration-300',
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      sidebarCollapsed ? 'w-20' : 'w-64'
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-white/5">
        <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-accent-pink rounded-lg flex items-center justify-center flex-shrink-0">
          <FiZap className="text-white" size={16} />
        </div>
        {!sidebarCollapsed && (
          <span className="text-white font-bold text-lg">CreatorOS AI</span>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-white/5">
        {!sidebarCollapsed ? (
          <div>
            <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            <span className="badge-purple text-xs mt-1">Pro Plan</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto">
            <span className="text-brand-400 text-sm font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>

        {!sidebarCollapsed && (
          <div className="mt-6 mb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              AI Tools
            </p>
          </div>
        )}
        
        <div className="space-y-1">
          {toolItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
        </button>
        
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <FiLogOut className="flex-shrink-0" />
          {!sidebarCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
