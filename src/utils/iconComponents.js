// src/utils/iconComponent.js
// Utility to dynamically get platform-specific icons
import { FiYoutube, FiSmartphone, FiMonitor, FiMusic } from 'react-icons/fi'

export function getPlatformIcon(platform) {
  const icons = {
    youtube: FiYoutube,
    tiktok: FiMusic,
    shorts: FiYoutube,
    instagram: FiSmartphone,
  }
  return icons[platform] || FiMonitor
}

export function getToolIcon(toolType) {
  const icons = {
    'title-generator': 'FiType',
    'hook-generator': 'FiTarget',
    'script-generator': 'FiFileText',
    'idea-generator': 'FiLightbulb',
  }
  return icons[toolType] || 'FiZap'
}

export function getDifficultyColor(difficulty) {
  const colors = {
    Beginner: 'text-green-400',
    Intermediate: 'text-yellow-400',
    Advanced: 'text-red-400',
  }
  return colors[difficulty] || 'text-gray-400'
}
