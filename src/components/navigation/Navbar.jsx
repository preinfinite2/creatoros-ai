// src/components/navigation/Navbar.jsx - PUBLIC NAVBAR COMPONENT
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiZap } from 'react-icons/fi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-500 to-accent-pink rounded-lg flex items-center justify-center">
              <FiZap className="text-white" size={16} />
            </div>
            <span className="text-white font-bold text-lg">CreatorOS AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary text-sm">
              Get Started Free
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/login"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="btn-primary block text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
