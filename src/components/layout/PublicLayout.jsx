// src/components/layout/PublicLayout.jsx - PUBLIC LAYOUT COMPONENT
import { Outlet } from 'react-router-dom'
import Navbar from '../navigation/Navbar'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-dark">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default PublicLayout
