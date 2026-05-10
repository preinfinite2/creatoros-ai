// src/components/common/Tooltip.jsx (Missing tooltip component)
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-white/10',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-white/10',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-white/10',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-white/10',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`absolute z-50 ${positions[position]} pointer-events-none`}
          >
            <div className="bg-surface-card border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 whitespace-nowrap shadow-xl">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
