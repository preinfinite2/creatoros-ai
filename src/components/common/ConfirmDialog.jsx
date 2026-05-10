// src/components/common/ConfirmDialog.jsx (Missing confirmation dialog)
import Modal from './Modal'
import { FiAlertTriangle } from 'react-icons/fi'

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // danger, warning, info
  loading = false,
}) {
  const variants = {
    danger: {
      icon: FiAlertTriangle,
      iconColor: 'text-red-400',
      buttonClass: 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
    },
    warning: {
      icon: FiAlertTriangle,
      iconColor: 'text-yellow-400',
      buttonClass: 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20',
    },
    info: {
      icon: FiAlertTriangle,
      iconColor: 'text-blue-400',
      buttonClass: 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20',
    },
  }

  const { icon: Icon, iconColor, buttonClass } = variants[variant]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="text-center">
        <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`text-2xl ${iconColor}`} />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary text-sm"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${buttonClass} rounded-xl py-2.5 text-sm font-semibold transition-all disabled:opacity-50`}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
