// src/ai/engines/hookEngine.js
import { BaseAIEngine } from './baseEngine'

export class HookEngine extends BaseAIEngine {
  constructor() {
    super()
    this.temperature = 0.85
    this.maxTokens = 400
  }

  generate(input, options = {}) {
    const { topic, audience } = input
    const count = options.count || 5

    const hooks = []
    const hookTypes = this._getHookTypes(audience)

    for (let i = 0; i < count; i++) {
      const hookType = hookTypes[i % hookTypes.length]
      const hook = this._generateHook(hookType, topic, audience)
      hooks.push({
        id: i + 1,
        text: hook,
        type: hookType.type,
        duration: hookType.duration,
        retentionRate: `${Math.floor(Math.random() * 20) + 75}%`, // 75-95%
        bestFor: hookType.bestFor,
      })
    }

    return {
      hooks,
      metadata: {
        engine: this.model,
        generated: new Date().toISOString(),
        topic,
        audience,
        count,
      }
    }
  }

  _getHookTypes(audience) {
    const allTypes = [
      {
        type: 'Curiosity Gap',
        duration: '3-5 seconds',
        bestFor: 'YouTube & TikTok',
        template: "I discovered something about {topic} that changes everything...",
      },
      {
        type: 'Pattern Interrupt',
        duration: '2-4 seconds',
        bestFor: 'TikTok & Shorts',
        template: "STOP scrolling. This {topic} secret will blow your mind.",
      },
      {
        type: 'Emotional Trigger',
        duration: '4-6 seconds',
        bestFor: 'YouTube',
        template: "I was shocked when I learned this about {topic}...",
      },
      {
        type: 'Controversial Statement',
        duration: '3-5 seconds',
        bestFor: 'All platforms',
        template: "Everything you know about {topic} is WRONG.",
      },
      {
        type: 'Quick Win Promise',
        duration: '5-7 seconds',
        bestFor: 'Educational content',
        template: "Here's how to master {topic} in just 5 minutes...",
      },
    ]

    // Filter based on audience if specified
    if (audience === 'beginners') {
      return allTypes.filter(t => ['Quick Win Promise', 'Curiosity Gap'].includes(t.type))
    } else if (audience === 'experts') {
      return allTypes.filter(t => ['Controversial Statement', 'Pattern Interrupt'].includes(t.type))
    }
    
    return allTypes
  }

  _generateHook(hookType, topic, audience) {
    return hookType.template.replace('{topic}', topic)
  }
}

export const hookEngine = new HookEngine()
