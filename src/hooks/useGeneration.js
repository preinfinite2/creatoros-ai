// src/hooks/useGeneration.js
import { useState, useCallback } from 'react'
import { useProjectStore } from '@store/projectStore'
import { generationService } from '@services/generationService'
import { useUIStore } from '@store/uiStore'
import toast from 'react-hot-toast'

export function useGeneration(toolType) {
  const [output, setOutput] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refinementHistory, setRefinementHistory] = useState([])
  
  const { addProject } = useProjectStore()
  const { setGenerationLoading } = useUIStore()

  const generate = useCallback(async (input, options = {}) => {
    if (!input) {
      toast.error('Please provide input')
      return null
    }

    setIsLoading(true)
    setGenerationLoading(true)
    setError(null)

    try {
      const result = await generationService.generate(toolType, input, options)
      setOutput(result)
      setRefinementHistory([{ type: 'original', output: result }])
      
      // Auto-save to projects
      const projectTitle = this._generateProjectTitle(toolType, input)
      addProject({
        title: projectTitle,
        toolType,
        input,
        output: result,
      })
      
      toast.success('Content generated successfully!')
      return result
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      return null
    } finally {
      setIsLoading(false)
      setGenerationLoading(false)
    }
  }, [toolType, addProject, setGenerationLoading])

  const refine = useCallback(async (refinementType) => {
    if (!output) {
      toast.error('Nothing to refine')
      return null
    }

    setIsLoading(true)
    try {
      const refined = await generationService.refine(toolType, output, refinementType)
      setOutput(refined)
      setRefinementHistory(prev => [...prev, { type: refinementType, output: refined }])
      toast.success(`Content refined: ${refinementType}`)
      return refined
    } catch (err) {
      toast.error(err.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [toolType, output])

  const reset = useCallback(() => {
    setOutput(null)
    setError(null)
    setRefinementHistory([])
  }, [])

  const _generateProjectTitle = (toolType, input) => {
    const topic = input.topic || input.niche || 'Untitled'
    const toolNames = {
      'title-generator': 'Titles',
      'hook-generator': 'Hooks',
      'script-generator': 'Script',
      'idea-generator': 'Ideas',
    }
    return `${toolNames[toolType] || 'Project'}: ${topic.substring(0, 50)}`
  }

  return {
    output,
    isLoading,
    error,
    refinementHistory,
    generate,
    refine,
    reset,
  }
}
