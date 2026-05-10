// src/pages/dashboard/tools/IdeaGenerator.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGeneration } from '../../../hooks/useGeneration'
import CopyButton from '../../../components/common/CopyButton'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import {
  FiLightbulb, FiZap, FiRefreshCw, FiTrendingUp,
  FiYoutube, FiSmartphone, FiGrid
} from 'react-icons/fi'
import toast from 'react-hot-toast'

function IdeaGenerator() {
  const [niche, setNiche] = useState('')
  const [count, setCount] = useState(20)
  
  const { output, isLoading, generate, reset } = useGeneration('idea-generator')

  const handleGenerate = async () => {
    if (!niche.trim()) {
      toast.error('Please enter a niche')
      return
    }
    await generate({ niche }, { count })
  }

  const platformIcons = {
    'YouTube': FiYoutube,
    'TikTok': FiSmartphone,
    'Instagram Reels': FiSmartphone,
    'YouTube Shorts': FiYoutube,
  }

  const difficultyColors = {
    'Beginner': 'bg-green-500/10 text-green-400',
    'Intermediate': 'bg-yellow-500/10 text-yellow-400',
    'Advanced': 'bg-red-500/10 text-red-400',
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
            <FiLightbulb className="text-yellow-400" />
          </div>
          Content Idea Generator
        </h1>
        <p className="text-gray-400 mt-2">
          Never run out of content ideas with AI-powered viral suggestions
        </p>
      </div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Niche *
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., tech reviews, fitness tips, cooking hacks..."
              className="input-primary"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Ideas
            </label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="select-primary"
            >
              <option value={10}>10 Ideas</option>
              <option value={20}>20 Ideas</option>
              <option value={30}>30 Ideas</option>
              <option value={50}>50 Ideas</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn-primary flex items-center gap-2 flex-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <FiZap /> Generate {count} Ideas
              </>
            )}
          </button>
          
          {output && (
            <button onClick={reset} className="btn-secondary flex items-center gap-2">
              <FiRefreshCw /> Reset
            </button>
          )}
        </div>
      </motion.div>

      {/* Results */}
      {isLoading && (
        <div className="py-12">
          <LoadingSpinner text="Brainstorming viral ideas..." />
        </div>
      )}

      {output?.ideas && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Generated Ideas ({output.ideas.length})
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Sorted by viral potential
              </p>
            </div>
            <CopyButton text={output.ideas.map(i => `${i.title} [${i.platform}]`).join('\n')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {output.ideas.map((idea, index) => {
              const PlatformIcon = platformIcons[idea.platform] || FiYoutube
              
              return (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="glass glass-hover p-5 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-bold text-sm">#{idea.id}</span>
                      <span className={`badge text-xs ${difficultyColors[idea.difficulty]}`}>
                        {idea.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-lg">
                      <FiTrendingUp className="text-green-400 text-xs" />
                      <span className="text-green-400 text-xs font-bold">{idea.viralScore}%</span>
                    </div>
                  </div>

                  <h3 className="text-white font-medium mb-3">{idea.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg text-gray-400">
                      <PlatformIcon size={12} />
                      {idea.platform}
                    </span>
                    <span className="bg-white/5 px-2 py-1 rounded-lg text-gray-400">
                      {idea.format}
                    </span>
                    <span className="bg-white/5 px-2 py-1 rounded-lg text-purple-400">
                      {idea.category}
                    </span>
                    <span className="bg-white/5 px-2 py-1 rounded-lg text-gray-500">
                      {idea.estimatedEngagement}
                    </span>
                  </div>

                  <CopyButton
                    text={idea.title}
                    className="mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {output?.ideas && output.ideas.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card text-center"
        >
          <p className="text-gray-400">
            💡 <span className="text-white font-semibold">Pro tip:</span> Combine these ideas with our{' '}
            <a href="/tools/script-generator" className="text-brand-400 hover:text-brand-300 underline">
              Script Generator
            </a>{' '}
            for complete video production!
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default IdeaGenerator
