// src/ai/engines/scriptEngine.js
import { BaseAIEngine } from './baseEngine'

export class ScriptEngine extends BaseAIEngine {
  constructor() {
    super()
    this.temperature = 0.75
    this.maxTokens = 2000
  }

  generate(input, options = {}) {
    const { topic, tone = 'professional', platform = 'youtube' } = input
    
    const script = this._buildScript(topic, tone, platform)
    
    return {
      script,
      metadata: {
        engine: this.model,
        generated: new Date().toISOString(),
        topic,
        tone,
        platform,
        estimatedDuration: this._estimateDuration(platform),
        wordCount: script.split(' ').length,
      }
    }
  }

  _buildScript(topic, tone, platform) {
    const intro = this._getIntro(topic, tone, platform)
    const hook = this._getHook(topic, tone)
    const mainContent = this._getMainContent(topic, tone, platform)
    const cta = this._getCTA(topic, platform)
    const outro = this._getOutro(topic)

    return `╔══════════════════════════════════════╗
║     VIRAL ${platform.toUpperCase()} SCRIPT      ║
╚══════════════════════════════════════╝

🎯 HOOK (0-5 seconds)
${hook}

📢 INTRODUCTION (5-15 seconds)
${intro}

📝 MAIN CONTENT (15-${platform === 'shorts' ? '45' : '120'} seconds)
${mainContent}

🎬 CALL TO ACTION
${cta}

👋 OUTRO
${outro}

═══════════════════════════════════════
⏱️  Estimated Duration: ${this._estimateDuration(platform)}
📊 Target Platform: ${platform.toUpperCase()}
🎨 Tone: ${tone.toUpperCase()}
═══════════════════════════════════════`
  }

  _getHook(topic, tone) {
    const hooks = {
      professional: `"In the next 60 seconds, I'm going to show you exactly how to ${topic} like a pro."`,
      casual: `"Okay real talk - ${topic} is way easier than you think..."`,
      energetic: `"WHAT'S GOOD! Today we're breaking down ${topic} and it's going to be insane! 🔥"`,
      educational: `"Let me show you the science behind ${topic} that nobody talks about."`,
      storytelling: `"Three months ago, I was terrible at ${topic}. Then I discovered this..."`,
    }
    return hooks[tone] || hooks.professional
  }

  _getIntro(topic, tone, platform) {
    const intros = {
      professional: `Welcome back to the channel. Today we're diving deep into ${topic}, and I promise by the end of this video, you'll have a complete framework to implement immediately.`,
      casual: `What's up everyone! Quick video today on ${topic} because I've been getting so many questions about this.`,
      energetic: `YOOOO welcome back to the channel! Today's video on ${topic} is going to be absolutely FIRE! Let's get into it!`,
      educational: `Today's topic is ${topic}, and I've spent weeks researching this to bring you the most comprehensive breakdown possible.`,
      storytelling: `I want to share a story about ${topic} that completely changed my perspective...`,
    }
    return intros[tone] || intros.professional
  }

  _getMainContent(topic, tone, platform) {
    const sections = [
      `[KEY POINT 1]: The Foundation
Most people approach ${topic} completely wrong. Here's what actually matters:
• Strategy over tactics
• Consistency over perfection
• Data-driven decisions over gut feelings`,

      `[KEY POINT 2]: The Framework
Here's my exact framework for ${topic}:
Step 1: Research and understand your audience
Step 2: Create a repeatable process
Step 3: Test, measure, and iterate
Step 4: Scale what works`,

      `[KEY POINT 3]: Real Examples
Let me show you how I applied these principles to ${topic}:
→ Before: Struggling with engagement
→ After: 3x increase in performance
→ Key insight: The small tweaks matter most`,

      `[BONUS TIP]: Advanced Strategy
Here's something most creators miss about ${topic}:
The real secret isn't in the tools or techniques - it's in understanding the psychology behind why certain approaches work and others fail.`,
    ]

    if (platform === 'shorts' || platform === 'tiktok') {
      return sections.slice(0, 2).join('\n\n')
    }

    return sections.join('\n\n')
  }

  _getCTA(topic, platform) {
    const ctas = {
      youtube: `If you found this valuable, drop a like and subscribe for more content on ${topic}. Hit the notification bell so you don't miss the next one. Comment below - what's your biggest struggle with ${topic}?`,
      tiktok: `Follow for more ${topic} tips! Save this for later 📌 Share with someone who needs this!`,
      shorts: `Like and subscribe for daily ${topic} tips! Comment your questions below!`,
    }
    return ctas[platform] || ctas.youtube
  }

  _getOutro(topic) {
    return `Thanks for watching! Remember - mastery of ${topic} is a journey, not a destination. Keep creating, keep improving, and I'll see you in the next one. Peace! ✌️`
  }

  _estimateDuration(platform) {
    const durations = {
      tiktok: '15-60 seconds',
      shorts: '15-60 seconds',
      youtube: '3-8 minutes',
    }
    return durations[platform] || '2-5 minutes'
  }
}

export const scriptEngine = new ScriptEngine()
