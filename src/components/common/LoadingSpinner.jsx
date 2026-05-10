// src/components/common/LoadingSpinner.jsx - REUSABLE LOADING COMPONENT
function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizes[size]} border-2 border-brand-500 border-t-transparent rounded-full animate-spin`} />
      {text && <p className="text-gray-400 text-sm">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
