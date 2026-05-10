// src/pages/dashboard/Projects.jsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjectStore } from '../../store/projectStore'
import EmptyState from '../../components/common/EmptyState'
import CopyButton from '../../components/common/CopyButton'
import {
  FiFolderOpen, FiTrash2, FiSearch, FiFilter,
  FiType, FiTarget, FiFileText, FiLightbulb,
  FiCalendar, FiClock
} from 'react-icons/fi'
import toast from 'react-hot-toast'

function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  
  const projects = useProjectStore((state) => state.projects)
  const deleteProject = useProjectStore((state) => state.deleteProject)

  const typeFilters = [
    { id: 'all', label: 'All', icon: FiFolderOpen },
    { id: 'title-generator', label: 'Titles', icon: FiType },
    { id: 'hook-generator', label: 'Hooks', icon: FiTarget },
    { id: 'script-generator', label: 'Scripts', icon: FiFileText },
    { id: 'idea-generator', label: 'Ideas', icon: FiLightbulb },
  ]

  const filteredProjects = useMemo(() => {
    let result = projects

    if (filterType !== 'all') {
      result = result.filter(p => p.toolType === filterType)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        JSON.stringify(p.input).toLowerCase().includes(query)
      )
    }

    return result
  }, [projects, filterType, searchQuery])

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      deleteProject(id)
      if (selectedProject?.id === id) setSelectedProject(null)
      toast.success('Project deleted')
    }
  }

  const getOutputText = (project) => {
    const output = project.output
    if (output.titles) return output.titles.map(t => t.text).join('\n')
    if (output.hooks) return output.hooks.map(h => h.text).join('\n')
    if (output.script) return output.script
    if (output.ideas) return output.ideas.map(i => i.title).join('\n')
    return JSON.stringify(output, null, 2)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Saved Projects</h1>
        <p className="text-gray-400 mt-2">{projects.length} total projects</p>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FiFolderOpen}
          title="No projects yet"
          description="Start generating content with our AI tools and your projects will appear here"
        />
      ) : (
        <>
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="input-primary pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                    filterType === filter.id
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <filter.icon size={16} />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project List */}
            <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto scrollbar-thin">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No projects found
                </div>
              ) : (
                filteredProjects.map((project, index) => {
                  const TypeIcon = typeFilters.find(f => f.id === project.toolType)?.icon || FiFolderOpen
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedProject(project)}
                      className={`glass p-4 cursor-pointer transition-all ${
                        selectedProject?.id === project.id
                          ? 'border-brand-500 bg-brand-500/5'
                          : 'glass-hover'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TypeIcon className="text-gray-400" size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {project.title}
                            </p>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                              <FiCalendar size={12} />
                              {formatDate(project.metadata?.createdAt)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(project.id)
                          }}
                          className="text-gray-600 hover:text-red-400 transition-colors p-1"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>

            {/* Project Preview */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {selectedProject.title}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <FiClock size={14} />
                            {formatDate(selectedProject.metadata?.createdAt)}
                          </span>
                          <span className="badge-purple">
                            {selectedProject.toolType}
                          </span>
                        </p>
                      </div>
                      <CopyButton text={getOutputText(selectedProject)} />
                    </div>

                    <div className="bg-white/[0.02] rounded-xl p-6 max-h-[500px] overflow-y-auto scrollbar-thin">
                      <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {getOutputText(selectedProject)}
                      </pre>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-gray-500 text-xs">
                        Input: {JSON.stringify(selectedProject.input)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="glass-card flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <FiFolderOpen className="text-6xl text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Select a project
                      </h3>
                      <p className="text-gray-400">
                        Click on a project to view its content
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Projects
