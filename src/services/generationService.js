// src/services/generationService.js
import { titleEngine } from '@ai/engines/titleEngine'
import { hookEngine } from '@ai/engines/hookEngine'
import { scriptEngine } from '@ai/engines/scriptEngine'
import { ideaEngine } from '@ai/engines/ideaEngine'

class GenerationService {
  constructor() {
    this.engines = {
      'title-generator': titleEngine,
      'hook-generator': hookEngine,
      'script-generator': scriptEngine,
      'idea-generator': ideaEngine,
    }
  }

  async generate(toolType, input, options = {}) {
    const engine = this.engines[toolType]
    
    if (!engine) {
      throw new Error(`Unknown tool type: ${toolType}`)
    }

    try {
      const result = await engine.process(input, options)
      return result
    } catch (error) {
      console.error(`Generation failed for ${toolType}:`, error)
      throw new Error(`Failed to generate content: ${error.message}`)
    }
  }

  async refine(toolType, originalOutput, refinementType) {
    const engine = this.engines[toolType]
    
    if (!engine) {
      throw new Error(`Unknown tool type: ${toolType}`)
    }

    try {
      const refined = await engine.refine(originalOutput, refinementType)
      return refined
    } catch (error) {
      console.error(`Refinement failed:`, error)
      throw new Error(`Failed to refine content: ${error.message}`)
    }
  }

  getEngine(toolType) {
    return this.engines[toolType] || null
  }
}

export const generationService = new GenerationService()
