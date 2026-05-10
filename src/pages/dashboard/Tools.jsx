// src/pages/dashboard/Tools.jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiType, FiTarget, FiFileText, FiLightbulb,
  FiArrowRight, FiZap, FiStar
} from 'react-icons/fi'

function Tools() {
  const tools = [
    {
      id: 'title-generator',
      icon: FiType,
      title: 'Viral Title Generator',
      description: 'Generate 10 high-CTR titles optimized for YouTube and TikTok algorithms',
      features: ['Curiosity gaps', 'Power words', 'SEO optimized', 'Platform-specific'],
      color: 'purple',
      popular: true,
    },
    {
      id: 'hook-generator',
      icon: FiTarget,
      title: 'Hook Generator',
      description: 'Create scroll-stopping hooks that captivate viewers in the first 3 seconds',
      features: ['Pattern interrupts', 'Emotional triggers', '5 variations', 'Platform optimized'],
      color: 'pink',
      popular: true,
    },
    {
      id: 'script-generator',
      icon: FiFileText,
      title: 'Script Generator',
      description: 'Complete video scripts with hooks, main content, and CTAs',
      features: ['Multiple tones', 'Platform formats', 'Full structure', 'Timing estimates'],
      color: 'cyan',
      popular: false,
    },
    {
      id: 'idea-generator',
      icon: FiLightbulb,
      title: 'Content Idea Generator',
      description: 'Never run out of content with 20 AI-powered video ideas per niche',
      features: ['Viral scoring', 'Platform suggestions', 'Format variety', 'Engagement estimates'],
      color: 'yellow',
      popular: false,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Tools</h1>
        <p className="text-gray-400 mt-2">Powerful AI generation tools for content creators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card group relative overflow-hidden"
          >
            {tool.popular && (
              <div className="absolute top-4 right-4">
                <span className="badge-pink flex items-center gap-1">
                  <FiStar size={12} />
                  Popular
                </span>
              </div>
            )}

            <div className={`w-14 h-14 bg-${tool.color}-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <tool.icon className={`text-${tool.color}-400 text-2xl`} />
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
            <p className="text-gray-400 mb-4">{tool.description}</p>

            <div className="space-y-2 mb-6">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className={`w-1.5 h-1.5 bg-${tool.color}-500 rounded-full`} />
                  {feature}
                </div>
              ))}
            </div>

            <Link
              to={`/tools/${tool.id}`}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FiZap />
              Launch Tool
              <FiArrowRight />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Tools
