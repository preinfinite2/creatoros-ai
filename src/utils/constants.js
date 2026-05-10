// src/utils/constants.js
export const APP_NAME = 'CreatorOS AI'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'AI-powered content creation platform for modern creators'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  TOOLS: '/tools',
  PROJECTS: '/projects',
  SETTINGS: '/settings',
  TITLE_GENERATOR: '/tools/title-generator',
  HOOK_GENERATOR: '/tools/hook-generator',
  SCRIPT_GENERATOR: '/tools/script-generator',
  IDEA_GENERATOR: '/tools/idea-generator',
}

export const TOOL_TYPES = {
  TITLE_GENERATOR: 'title-generator',
  HOOK_GENERATOR: 'hook-generator',
  SCRIPT_GENERATOR: 'script-generator',
  IDEA_GENERATOR: 'idea-generator',
}

export const PLATFORMS = [
  { id: 'youtube', label: 'YouTube', icon: 'FiYoutube' },
  { id: 'tiktok', label: 'TikTok', icon: 'FiMusic' },
  { id: 'shorts', label: 'YouTube Shorts', icon: 'FiYoutube' },
  { id: 'instagram', label: 'Instagram Reels', icon: 'FiInstagram' },
]

export const TONES = [
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'casual', label: 'Casual', emoji: '😎' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡' },
  { id: 'storytelling', label: 'Storytelling', emoji: '📖' },
  { id: 'educational', label: 'Educational', emoji: '📚' },
  { id: 'funny', label: 'Funny', emoji: '😂' },
  { id: 'luxury', label: 'Luxury', emoji: '💎' },
  { id: 'emotional', label: 'Emotional', emoji: '💕' },
]

export const AUDIENCE_TYPES = [
  { id: 'all', label: 'All Audiences' },
  { id: 'beginners', label: 'Beginners' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'experts', label: 'Experts' },
  { id: 'creators', label: 'Content Creators' },
  { id: 'business', label: 'Business Owners' },
]

export const STORAGE_KEYS = {
  USER: 'creatoros_current_user',
  USERS: 'creatoros_users',
  PROJECTS: 'creatoros_projects',
  SETTINGS: 'creatoros_settings',
  SESSION: 'creatoros_session',
}

export const MAX_PROJECTS_FREE = 20
export const MAX_GENERATIONS_FREE = 10
export const SESSION_DURATION_DAYS = 7

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
}

export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! 🎉',
  SIGNUP: 'Account created successfully! 🎉',
  LOGOUT: 'Logged out successfully',
  GENERATED: 'Content generated successfully!',
  SAVED: 'Saved to projects!',
  COPIED: 'Copied to clipboard!',
  DELETED: 'Project deleted successfully',
  SETTINGS_SAVED: 'Settings saved!',
}
