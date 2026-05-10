// src/pages/dashboard/Dashboard.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useProjectStore } from '../../store/projectStore'
import {
  FiType, FiTarget, FiFileText, FiLightbulb,
  FiTrendingUp, FiClock, FiZap, FiFolderOpen,
  FiArrowRight
} from 'react-icons/fi'

function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const stats = useProjectStore((state) => ({
    total: state.projects.length,
    thisMonth: state.projects.filter(p => {
      const date = new Date(p.metadata?.createdAt)
      const now = new Date()
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    }).length,
    byType: {
      titles: state.projects.filter(p => p.toolType === 'title-generator').length,
      hooks: state.projects.filter(p => p.toolType === 'hook-generator').length,
      scripts: state.projects.filter(p => p.toolType === 'script-generator').length,
      ideas: state.projects.filter(p => p.toolType === 'idea-generator').length,
    }
  }))

  const quickActions = [
    { to: '/tools/title-generator', icon: FiType, label: 'Title Generator', description: 'Create viral titles', color: 'purple' },
    { to: '/tools/hook-generator', icon: FiTarget, label: 'Hook Generator', description: 'Stop the scroll', color: 'pink' },
    { to: '/tools/script-generator', icon: FiFileText, label: 'Script Generator', description: 'Full video scripts', color: 'cyan' },
    { to: '/tools/idea-generator', icon: FiLightbulb, label: 'Idea Generator', description: 'Never run out of ideas', color: 'yellow' },
  ]

  const statCards = [
    { label: 'Total Projects', value: stats.total, icon: FiFolderOpen, color: 'purple' },
    { label: 'This Month', value: stats.thisMonth, icon: FiTrendingUp, color: 'green' },
    { label: 'Active Streak', value: '3 days', icon: FiZap, color: 'orange' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.email?.split('@')[0]} 👋
        </h1>
        <p className="text-gray-400 mt-2">Here's what's happening with your content today</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${stat.color}-500/10 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`text-${stat.color}-400 text-lg`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.to}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass glass-hover p-6 cursor-pointer group"
              >
                <div className={`w-12 h-12 bg-${action.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`text-${action.color}-400 text-xl`} />
                </div>
                <h3 className="text-white font-semibold mb-1">{action.label}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
                <div className="flex items-center gap-1 mt-3 text-brand-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Generate <FiArrowRight size={14} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Usage Overview */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Generation Overview</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Titles', value: stats.byType.titles, color: 'purple' },
              { label: 'Hooks', value: stats.byType.hooks, color: 'pink' },
              { label: 'Scripts', value: stats.byType.scripts, color: 'cyan' },
              { label: 'Ideas', value: stats.byType.ideas, color: 'yellow' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mx-auto mb-2`} />
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pro Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card bg-gradient-to-r from-brand-500/5 to-accent-pink/5 border-brand-500/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiZap className="text-brand-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Pro Tip</h3>
            <p className="text-gray-400 text-sm">
              Combine the Script Generator with the Hook Generator for maximum engagement. 
              Start with a viral hook, then use the full script template for a complete video strategy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
