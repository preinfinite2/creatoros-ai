// src/ai/data/triggers.js
export const POWER_WORDS = [
  'Ultimate', 'Secret', 'Proven', 'Instant', 'Guaranteed',
  'Exclusive', 'Shocking', 'Revolutionary', 'Powerful', 'Essential',
  'Breakthrough', 'Hidden', 'Insider', 'Advanced', 'Complete',
  'Definitive', 'Master', 'Expert', 'Professional', 'Elite'
]

export const CURIOSITY_TRIGGERS = [
  'Nobody Talks About', 'They Don\'t Want You to Know',
  'Changed Everything', 'Blew My Mind', 'Game Changer',
  'Life Changing', 'Industry Secret', 'What Actually Works',
  'The Truth About', 'Why Nobody Tells You'
]

export const VIRAL_PATTERNS = [
  {
    template: 'The {power_word} Guide to {topic} in 2024',
    niches: ['all'],
    category: 'Guide'
  },
  {
    template: 'I Tried {topic} for 30 Days (Here\'s What Happened)',
    niches: ['all'],
    category: 'Challenge'
  },
  {
    template: 'Why {topic} {curiosity}',
    niches: ['all'],
    category: 'Curiosity'
  },
  {
    template: '{number} {niche} Secrets {curiosity}',
    niches: ['all'],
    category: 'Listicle'
  },
  {
    template: 'Stop Doing {topic} Wrong (Do This Instead)',
    niches: ['all'],
    category: 'Correction'
  },
  {
    template: 'The {power_word} {topic} Strategy for Beginners',
    niches: ['all'],
    category: 'Strategy'
  },
  {
    template: 'How to Master {topic} in {number} Days',
    niches: ['all'],
    category: 'Challenge'
  },
  {
    template: '{topic} Expert Reveals {curiosity}',
    niches: ['all'],
    category: 'Expert'
  },
  {
    template: 'This {topic} Hack {curiosity}',
    niches: ['all'],
    category: 'Hack'
  },
  {
    template: 'The {power_word} Truth About {topic}',
    niches: ['all'],
    category: 'Truth'
  },
]
