// src/utils/mockAI.js
const viralTitleTemplates = [
  "The TRUTH About {topic} Nobody Talks About",
  "I Tried {topic} for 30 Days (Here's What Happened)",
  "Why {topic} Will Change Everything in 2024",
  "The Dark Side of {topic} Exposed",
  "How to Master {topic} in Just 7 Days",
  "I Spent $10,000 Testing {topic} - Here's the Result",
  "{topic} Secrets the Pros Don't Want You to Know",
  "The Ultimate {topic} Guide for Beginners",
  "Stop Doing {topic} Wrong (Do This Instead)",
  "This {topic} Hack Will Blow Your Mind"
]

const hookTemplates = [
  "Stop scrolling. This {topic} tip will save you hours.",
  "I discovered something crazy about {topic} and had to share...",
  "99% of people don't know this {topic} secret...",
  "Here's why your {topic} strategy isn't working...",
  "The {topic} mistake that's costing you views..."
]

export function generateTitles(topic) {
  return viralTitleTemplates.map(template => template.replace('{topic}', topic))
}

export function generateHooks(topic) {
  return hookTemplates.map(template => template.replace('{topic}', topic))
}

export function generateScript(topic, tone) {
  const toneIntros = {
    funny: "Alright, buckle up because today we're diving into {topic} and it's absolutely ridiculous...",
    luxury: "Welcome to the premium guide on {topic}. Excellence isn't an option, it's the standard...",
    storytelling: "Let me tell you a story about {topic} that changed everything for me...",
    educational: "Today, I'm breaking down {topic} in a way that actually makes sense..."
  }

  const intro = (toneIntros[tone] || toneIntros.educational).replace('{topic}', topic)
  
  return `HOOK (0-3 seconds):
${intro}

INTRODUCTION (3-15 seconds):
What's going on everyone, welcome back to the channel. Today we're covering {topic} and I promise by the end of this video, you'll have a complete understanding of how to crush it.

MAIN CONTENT (15-45 seconds):
[Scene 1: The Problem]
Here's the thing about {topic} - most people are doing it completely wrong. They focus on the wrong metrics and wonder why they're not seeing results.

[Scene 2: The Solution]
But here's what actually works:
• Strategy 1: The framework approach
• Strategy 2: Consistency over intensity
• Strategy 3: Data-driven decisions

[Scene 3: Real Examples]
Let me show you real examples of {topic} done right. Take a look at these results...

ENGAGEMENT PROMPT (45-50 seconds):
Quick question - drop in the comments what's your biggest struggle with {topic}? I read every single comment.

CALL TO ACTION (50-60 seconds):
If you found this valuable, smash that like button and subscribe for more {topic} content. Hit the bell so you don't miss the next one.

ESTIMATED DURATION: 60 seconds`.replace(/{topic}/g, topic)
}

export function generateIdeas(niche) {
  const formats = ['Tutorial', 'Challenge', 'Review', 'Comparison', 'Day in Life', 'Tips & Tricks', 'Behind Scenes', 'Reaction', 'Storytime', 'Prediction']
  const platforms = ['YouTube', 'TikTok', 'Instagram Reels', 'YouTube Shorts']
  
  const ideas = []
  for (let i = 0; i < 20; i++) {
    const format = formats[Math.floor(Math.random() * formats.length)]
    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    ideas.push({
      id: i + 1,
      title: `${format}: The Ultimate ${niche} Guide for ${platform}`,
      platform,
      format,
      viralScore: Math.floor(Math.random() * 4) + 7, // 7-10
      engagement: `${Math.floor(Math.random() * 50) + 10}K views est.`
    })
  }
  return ideas
}
