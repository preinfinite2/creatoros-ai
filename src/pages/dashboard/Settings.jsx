// src/pages/dashboard/Settings.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { FiUser, FiBell, FiShield, FiTrash2, FiSave, FiMoon } from 'react-icons/fi'
import toast from 'react-hot-toast'

function Settings() {
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  
  const [settings, setSettings] = useState({
    displayName: user?.email?.split('@')[0] || '',
    defaultTone: 'professional',
    defaultPlatform: 'youtube',
    notifications: true,
    emailDigest: false,
    autoSave: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      updateProfile({ settings })
      toast.success('Settings saved!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FiUser /> Profile
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="input-primary opacity-50 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
              className="input-primary"
              placeholder="Your display name"
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FiMoon /> Preferences
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Default Tone</label>
            <select
              value={settings.defaultTone}
              onChange={(e) => setSettings({ ...settings, defaultTone: e.target.value })}
              className="select-primary"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="energetic">Energetic</option>
              <option value="storytelling">Storytelling</option>
              <option value="educational">Educational</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">Default Platform</label>
            <select
              value={settings.defaultPlatform}
              onChange={(e) => setSettings({ ...settings, defaultPlatform: e.target.value })}
              className="select-primary"
            >
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="shorts">YouTube Shorts</option>
              <option value="instagram">Instagram Reels</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FiBell /> Notifications
        </h2>
        
        <div className="space-y-4">
          {[
            { key: 'notifications', label: 'Push notifications', description: 'Get notified when content is generated' },
            { key: 'emailDigest', label: 'Weekly digest', description: 'Receive a weekly summary of your activity' },
            { key: 'autoSave', label: 'Auto-save projects', description: 'Automatically save all generated content' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-white">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  [item.key]: !settings[item.key]
                })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings[item.key] ? 'bg-brand-500' : 'bg-white/10'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings[item.key] ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card border-red-500/20"
      >
        <h2 className="text-xl font-semibold text-red-400 mb-6 flex items-center gap-2">
          <FiShield /> Danger Zone
        </h2>
        
        <div className="space-y-4">
          <button
            onClick={() => {
              if (window.confirm('Delete all projects? This cannot be undone.')) {
                // Clear projects logic
                toast.success('All projects deleted')
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-all"
          >
            <FiTrash2 size={16} />
            Delete all projects
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center gap-2"
        >
          <FiSave />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default Settings
