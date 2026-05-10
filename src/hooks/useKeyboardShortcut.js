// src/hooks/useKeyboardShortcut.js (Keyboard shortcuts hook)
import { useEffect, useCallback } from 'react'

export function useKeyboardShortcut(keys, callback, options = {}) {
  const { enabled = true, preventDefault = true } = options

  const handleKeyDown = useCallback((event) => {
    if (!enabled) return

    const { key, ctrlKey, metaKey, shiftKey, altKey } = event
    
    const keyCombo = {
      key: key.toLowerCase(),
      ctrl: ctrlKey,
      meta: metaKey,
      shift: shiftKey,
      alt: altKey,
    }

    const matches = keys.some(shortcut => {
      if (typeof shortcut === 'string') {
        return key.toLowerCase() === shortcut.toLowerCase() && !ctrlKey && !metaKey
      }
      
      return (
        key.toLowerCase() === shortcut.key?.toLowerCase() &&
        (!shortcut.ctrl || ctrlKey) &&
        (!shortcut.meta || metaKey) &&
        (!shortcut.shift || shiftKey) &&
        (!shortcut.alt || altKey)
      )
    })

    if (matches) {
      if (preventDefault) event.preventDefault()
      callback(event)
    }
  }, [keys, callback, enabled, preventDefault])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Pre-built shortcuts
export const SHORTCUTS = {
  SAVE: { key: 's', ctrl: true },
  SEARCH: { key: 'k', ctrl: true },
  NEW: { key: 'n', ctrl: true },
  ESCAPE: 'Escape',
  ENTER: 'Enter',
}
