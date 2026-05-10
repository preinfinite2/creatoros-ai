// src/hooks/useClipboard.js
import { useCallback } from 'react'
import toast from 'react-hot-toast'

export function useClipboard() {
  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
      return true
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        toast.success('Copied to clipboard!')
        return true
      } catch {
        toast.error('Failed to copy')
        return false
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }, [])

  return { copy }
}
