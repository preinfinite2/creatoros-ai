// src/components/common/CopyButton.jsx - REUSABLE COPY BUTTON
import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { useClipboard } from '../../hooks/useClipboard'

function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false)
  const { copy } = useClipboard()

  const handleCopy = async () => {
    const success = await copy(text)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        copied
          ? 'bg-green-500/10 text-green-400'
          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
      } ${className}`}
    >
      {copied ? <FiCheck /> : <FiCopy />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default CopyButton
