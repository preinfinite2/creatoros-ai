// src/pages/dashboard/tools/HookGenerator.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGeneration } from '../../../hooks/useGeneration'
import CopyButton from '../../../components/common/CopyButton'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { FiTarget, FiZap, FiRefreshCw, FiClock, FiBarChart2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

function HookGenerator() {
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('all')
  const [tone, setTone] = useState('curious')
  
  const { output, isLoading, generate, reset } = useGeneration('hook-generator')

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic')
      return
    }
    await generate({ topic, audience, tone })
  }

  const audienceTypes = [
    { value: 'all', label: 'All Audiences' },
    { value: 'beginners', label: 'Beginners' },
    { value: 'experts', label: 'Experts' },
    { value: 'creators', label: 'Content Creators' },
  ]

  const toneTypes = [
    { value: 'curious', label: 'Curiosity-Driven' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'emotional', label: 'Emotional' },
    { value: 'urgent', label: 'Urgent/FOMO' },
    { value: 'educational', label: 'Educational' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center">
            <FiTarget className="text-pink-400" />
          </div>
          Hook Generator
        </h1>
        <p className="text-gray-400 mt-2">
          Create scroll-stopping hooks that grab attention in the first 3 seconds
        </p>
      </div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Video Topic *
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., how to grow on TikTok, crypto investing..."
            className="input-primary"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="select-primary"
            >
              {audienceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hook Style
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="select-primary"
            >
              {toneTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
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
                Generating Hooks...
              </>
            ) : (
              <>
                <FiZap /> Generate Hooks
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
          <LoadingSpinner text="Crafting irresistible hooks..." />
        </div>
      )}

      {output?.hooks && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Generated Hooks ({output.hooks.length})
            </h2>
            <CopyButton text={output.hooks.map(h => h.text).join('\n\n')} />
          </div>

          {output.hooks.map((hook, index) => (
            <motion.div
              key={hook.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass glass-hover p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center">
                  <span className="text-pink-400 font-bold">0{hook.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg font-medium mb-3 leading-relaxed">
                    "{hook.text}"
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="badge-pink">{hook.type}</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <FiClock size={14} />
                      {hook.duration}
                    </span>
                    <span className="flex items-center gap-1 text-green-400">
                      <FiBarChart2 size={14} />
                      {hook.retentionRate} retention
                    </span>
                    <span className="text-gray-500 text-xs">
                      Best for: {hook.bestFor}
                    </span>
                  </div>
                </div>
                <CopyButton text={hook.text} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default HookGenerator
