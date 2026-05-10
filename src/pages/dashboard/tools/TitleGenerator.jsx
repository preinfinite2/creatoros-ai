// src/pages/dashboard/tools/TitleGenerator.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGeneration } from '../../../hooks/useGeneration'
import CopyButton from '../../../components/common/CopyButton'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { FiType, FiZap, FiRefreshCw, FiSave, FiTrendingUp } from 'react-icons/fi'
import toast from 'react-hot-toast'

function TitleGenerator() {
  const [topic, setTopic] = useState('')
  const [niche, setNiche] = useState('')
  
  const { output, isLoading, generate, reset } = useGeneration('title-generator')

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic')
      return
    }
    await generate({ topic, niche })
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <FiType className="text-purple-400" />
          </div>
          Viral Title Generator
        </h1>
        <p className="text-gray-400 mt-2">
          Generate 10 high-CTR, curiosity-driven titles optimized for YouTube and TikTok
        </p>
      </div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video Topic *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., morning routine, crypto trading..."
              className="input-primary"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Niche (optional)
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., productivity, finance..."
              className="input-primary"
            />
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
                Generating...
              </>
            ) : (
              <>
                <FiZap /> Generate Titles
              </>
            )}
          </button>
          
          {output && (
            <button
              onClick={reset}
              className="btn-secondary flex items-center gap-2"
            >
              <FiRefreshCw /> Reset
            </button>
          )}
        </div>
      </motion.div>

      {/* Results */}
      {isLoading && (
        <div className="py-12">
          <LoadingSpinner text="Crafting viral titles..." />
        </div>
      )}

      {output?.titles && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Generated Titles ({output.titles.length})
            </h2>
            <CopyButton text={output.titles.map(t => t.text).join('\n')} />
          </div>

          {output.titles.map((title, index) => (
            <motion.div
              key={title.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass glass-hover p-5 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">#{title.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg mb-2">{title.text}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-green-400">
                      <FiTrendingUp size={14} />
                      {title.score}% viral score
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">Est. CTR: {title.ctr}</span>
                    <span className="badge-purple text-xs">{title.category}</span>
                  </div>
                </div>
                <CopyButton text={title.text} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default TitleGenerator
