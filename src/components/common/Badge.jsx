// src/components/common/Badge.jsx (Missing badge component)
import { clsx } from 'clsx'

function Badge({ children, variant = 'default', size = 'sm', className }) {
  const variants = {
    default: 'bg-white/5 text-gray-300 border-white/10',
    primary: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  }

  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm',
  }

  return (
    <span className={clsx(
      'inline-flex items-center gap-1 rounded-full border font-medium',
      variants[variant] || variants.default,
      sizes[size] || sizes.sm,
      className
    )}>
      {children}
    </span>
  )
}

export default Badge
