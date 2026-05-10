// src/components/common/EmptyState.jsx - REUSABLE EMPTY STATE COMPONENT
function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-16 px-4">
      {Icon && <Icon className="text-6xl text-gray-600 mx-auto mb-6" />}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6">{description}</p>
      {action && action}
    </div>
  )
}

export default EmptyState
