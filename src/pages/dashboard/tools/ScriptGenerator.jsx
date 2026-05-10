// src/pages/dashboard/tools/ScriptGenerator.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGeneration } from '../../../hooks/useGeneration'
import CopyButton from '../../../components/common/CopyButton'
import LoadingSpinner from '../../../components/common/LoadingSpinner'
import { FiFileText, FiZap, FiRefreshCw, FiYoutube, FiSmartphone, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'

function ScriptGenerator() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('professional')
  const [platform, setPlatform] = useState('youtube')
  
  const { output, isLoading, generate, reset } = useGeneration('script-generator')

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic')
      return
    }
    await generate({ topic, tone, platform })
  }

  const tones = [
    { value: 'professional', label: '💼 Professional', color: 'purple' },
    { value: 'casual', label: '😎 Casual', color: 'blue' },
    { value: 'energetic', label: '⚡ Energetic', color: 'orange' },
    { value: 'storytelling', label: '📖 Storytelling', color: 'pink' },
    { value: 'educational', label: '📚 Educational', color: 'cyan' },
    { value: 'funny', label: '😂 Funny', color: 'yellow' },
  ]

  const platforms = [
    { value: 'youtube', label: 'YouTube', icon: FiYoutube, duration: '8-15 min' },
    { value: 'tiktok', label: 'TikTok', icon: FiSmartphone, duration: '15-60 sec' },
    { value: 'shorts', label: 'YouTube Shorts', icon: FiYoutube, duration: '15-60 sec' },
    { value: 'instagram', label: 'Instagram Reels', icon: FiSmartphone, duration: '15-90 sec' },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
            <FiFileText className="text-cyan-400" />
          </div>
          Script Generator
        </h1>
        <p className="text-gray-400 mt-2">
          Create complete viral video scripts with hooks, structure, and CTAs
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
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            placeholder="Describe your video topic in detail... e.g., How to edit videos 10x faster using AI tools for beginners"
            className="textarea-primary"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Platform
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {platforms.map((p) => (
              <button
                key={p.value}
                onClick={() => setPlatform(p.value)}
                className={`p-4 rounded-xl border transition-all text-center ${
                  platform === p.value
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400'
                }`}
              >
                <p.icon className={`text-xl mx-auto mb-2 ${
                  platform === p.value ? 'text-cyan-400' : ''
                }`} />
                <p className={`text-sm font-medium ${
                  platform === p.value ? 'text-white' : ''
                }`}>{p.label}</p>
                <p className="text-xs text-gray-500 mt-1">{p.duration}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tone
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {tones.map((t) => (
              <button
                key={t.value}
                onClick={() => setTone(t.value)}
                className={`p-3 rounded-xl border transition-all text-sm ${
                  tone === t.value
                    ? `bg-${t.color}-500/10 border-${t.color}-500/30 text-white`
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
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
                Writing Script...
              </>
            ) : (
              <>
                <FiZap /> Generate Script
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
          <LoadingSpinner text="Creating your viral script..." />
        </div>
      )}

      {output?.script && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Generated Script</h2>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FiClock size={14} />
                  {output.metadata?.estimatedDuration}
                </span>
                <span>•</span>
                <span>{output.metadata?.wordCount} words</span>
                <span>•</span>
                <span className="badge-cyan">{output.metadata?.platform}</span>
              </div>
            </div>
            <CopyButton text={output.script} />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card overflow-hidden"
          >
            <div className="bg-white/[0.02] rounded-xl p-6 lg:p-8">
              <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-x-auto">
                {output.script}
              </pre>
            </div>
          </motion.div>

          {/* Quick Actions for Script */}
          <div className="flex gap-3">
            <button
              onClick={() => {/* Refine logic */}}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <FiZap /> Make More Viral
            </button>
            <button
              onClick={() => {/* Refine logic */}}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              ✂️ Make Shorter
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ScriptGenerator
