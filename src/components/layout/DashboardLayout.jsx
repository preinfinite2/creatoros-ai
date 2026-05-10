// src/components/layout/DashboardLayout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '@components/navigation/Sidebar'
import DashboardHeader from '@components/navigation/DashboardHeader'
import { useUIStore } from '@store/uiStore'

function DashboardLayout() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-surface-dark">
      <Sidebar />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <DashboardHeader />
        
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout
