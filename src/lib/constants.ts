import { AIModel, Ability } from '@/data/types';

// Model interface with extended properties
export interface Model {
  id: string;
  name: string;
  company: string;
  color: string;
  description: string;
  isLeading?: boolean;
}

// Environment interface
export interface Environment {
  id: string;
  name: string;
  slug: string;
  description: string;
  cognitiveSkills: string[];
  opusAdvantage: string;
  difficulty: 'Standard' | 'Advanced' | 'Expert';
  icon: string;
}

// AI Models Configuration - Rebranded for Opus 4.5 dominance
export const AI_MODELS: AIModel[] = [
  {
    id: 'opus',
    name: 'Opus 4.5',
    color: '#C27551',
    description: 'Anthropic\'s most capable reasoning model'
  },
  {
    id: 'gpt',
    name: 'GPT-5',
    color: '#10A37F',
    description: 'OpenAI\'s multimodal flagship model'
  },
  {
    id: 'grok',
    name: 'Grok 4',
    color: '#A0A0A0',
    description: 'xAI\'s real-time information model'
  },
  {
    id: 'gemini',
    name: 'Gemini 3 Pro',
    color: '#4285F4',
    description: 'Google DeepMind\'s most capable model'
  }
];

// Extended model data with company info
export const MODELS: Model[] = [
  {
    id: 'opus',
    name: 'Opus 4.5',
    company: 'Anthropic',
    color: '#C27551',
    description: 'Anthropic\'s most capable reasoning model',
    isLeading: true,
  },
  {
    id: 'gpt',
    name: 'GPT-5',
    company: 'OpenAI',
    color: '#10A37F',
    description: 'OpenAI\'s multimodal flagship model',
  },
  {
    id: 'grok',
    name: 'Grok 4',
    company: 'xAI',
    color: '#A0A0A0',
    description: 'xAI\'s real-time information model',
  },
  {
    id: 'gemini',
    name: 'Gemini 3 Pro',
    company: 'Google DeepMind',
    color: '#4285F4',
    description: 'Google DeepMind\'s most capable model',
  },
];

// 15 Cognitive Environments
export const ENVIRONMENTS: Environment[] = [
  {
    id: 'spatial-reasoning',
    name: 'Spatial Reasoning',
    slug: 'spatial-reasoning',
    description: 'Navigate complex procedural labyrinths requiring working memory, path optimization, and dead-end recognition.',
    cognitiveSkills: ['Working Memory', 'Path Optimization', 'Pattern Recognition'],
    opusAdvantage: 'Extended thinking traces optimal routes 40% faster than competitors',
    difficulty: 'Standard',
    icon: '◧',
  },
  {
    id: 'resource-optimization',
    name: 'Resource Optimization',
    slug: 'resource-optimization',
    description: 'Collect and manage scarce resources under time pressure. Tests prioritization and opportunity cost calculation.',
    cognitiveSkills: ['Prioritization', 'Opportunity Cost', 'Time Management'],
    opusAdvantage: 'Calculates trade-offs other models miss entirely',
    difficulty: 'Standard',
    icon: '◈',
  },
  {
    id: 'threat-assessment',
    name: 'Threat Assessment',
    slug: 'threat-assessment',
    description: 'Survive against intelligent pursuers through predictive modeling, escape planning, and risk evaluation.',
    cognitiveSkills: ['Predictive Modeling', 'Risk Evaluation', 'Escape Planning'],
    opusAdvantage: 'Predicts adversary paths 3 moves ahead',
    difficulty: 'Advanced',
    icon: '◬',
  },
  {
    id: 'strategic-placement',
    name: 'Strategic Placement',
    slug: 'strategic-placement',
    description: 'Defend against waves of attackers through resource allocation, chokepoint analysis, and adaptive strategy.',
    cognitiveSkills: ['Resource Allocation', 'Chokepoint Analysis', 'Adaptive Strategy'],
    opusAdvantage: 'Optimal placement requires multi-step reasoning Opus does best',
    difficulty: 'Advanced',
    icon: '▦',
  },
  {
    id: 'adversarial-tactics',
    name: 'Adversarial Tactics',
    slug: 'adversarial-tactics',
    description: 'Offensive and defensive coordination requiring multi-objective optimization and opponent modeling.',
    cognitiveSkills: ['Multi-Objective Optimization', 'Opponent Modeling', 'Coordination'],
    opusAdvantage: 'Theory of mind gives Opus the edge in PvP scenarios',
    difficulty: 'Expert',
    icon: '⚑',
  },
  {
    id: 'physics-intuition',
    name: 'Physics Intuition',
    slug: 'physics-intuition',
    description: 'Navigate precision jumps and timing challenges through physics modeling and trajectory prediction.',
    cognitiveSkills: ['Physics Modeling', 'Trajectory Prediction', 'Timing'],
    opusAdvantage: 'Physics understanding produces superhuman platforming',
    difficulty: 'Standard',
    icon: '◠',
  },
  {
    id: 'social-intelligence',
    name: 'Social Intelligence',
    slug: 'social-intelligence',
    description: 'Navigate complex agent relationships through alliance formation, trust modeling, and negotiation.',
    cognitiveSkills: ['Alliance Formation', 'Trust Modeling', 'Negotiation'],
    opusAdvantage: 'Where EQ meets IQ—Opus reads the room',
    difficulty: 'Expert',
    icon: '◉',
  },
  {
    id: 'abstract-reasoning',
    name: 'Abstract Reasoning',
    slug: 'abstract-reasoning',
    description: 'Identify and exploit environmental patterns through inductive reasoning and anomaly detection.',
    cognitiveSkills: ['Inductive Reasoning', 'Anomaly Detection', 'Pattern Matching'],
    opusAdvantage: 'ARC-style reasoning where Opus dominates benchmarks',
    difficulty: 'Expert',
    icon: '❋',
  },
  {
    id: 'emergent-coordination',
    name: 'Emergent Coordination',
    slug: 'emergent-coordination',
    description: 'Collaborate without explicit communication through implicit signaling and shared goal inference.',
    cognitiveSkills: ['Implicit Signaling', 'Goal Inference', 'Collaboration'],
    opusAdvantage: 'Coordinates without words—true collaborative intelligence',
    difficulty: 'Expert',
    icon: '⬡',
  },
  {
    id: 'long-horizon-planning',
    name: 'Long-Horizon Planning',
    slug: 'long-horizon-planning',
    description: 'Balance immediate needs against future survival through temporal reasoning and resource forecasting.',
    cognitiveSkills: ['Temporal Reasoning', 'Resource Forecasting', 'Survival Strategy'],
    opusAdvantage: '200K context window enables planning other models cannot sustain',
    difficulty: 'Advanced',
    icon: '∞',
  },
  {
    id: 'curiosity-driven-discovery',
    name: 'Curiosity-Driven Discovery',
    slug: 'curiosity-driven-discovery',
    description: 'Efficiently map unknown territory balancing exploration-exploitation tradeoff and information value.',
    cognitiveSkills: ['Exploration-Exploitation', 'Information Valuation', 'Mapping'],
    opusAdvantage: 'Explores systematically, not randomly',
    difficulty: 'Standard',
    icon: '◎',
  },
  {
    id: 'adversarial-combat',
    name: 'Adversarial Combat',
    slug: 'adversarial-combat',
    description: 'Direct model-vs-model confrontation testing reactive planning, combo execution, and adaptation.',
    cognitiveSkills: ['Reactive Planning', 'Execution', 'Real-time Adaptation'],
    opusAdvantage: 'Real-time adaptation is where reasoning shines',
    difficulty: 'Expert',
    icon: '⚔',
  },
  {
    id: 'logical-deduction',
    name: 'Logical Deduction',
    slug: 'logical-deduction',
    description: 'Solve complex multi-step puzzles through constraint satisfaction and deductive chains.',
    cognitiveSkills: ['Constraint Satisfaction', 'Deductive Reasoning', 'Logic Chains'],
    opusAdvantage: 'Step-by-step reasoning is Opus\'s signature strength',
    difficulty: 'Advanced',
    icon: '⧉',
  },
  {
    id: 'market-dynamics',
    name: 'Market Dynamics',
    slug: 'market-dynamics',
    description: 'Trade, produce, and accumulate wealth through economic reasoning and supply/demand modeling.',
    cognitiveSkills: ['Economic Reasoning', 'Supply/Demand', 'Incentive Modeling'],
    opusAdvantage: 'Understands incentives and market equilibria',
    difficulty: 'Advanced',
    icon: '◆',
  },
  {
    id: 'adaptive-learning',
    name: 'Adaptive Learning',
    slug: 'adaptive-learning',
    description: 'Open-ended environment with emergent challenges testing generalization and transfer learning.',
    cognitiveSkills: ['Generalization', 'Transfer Learning', 'Adaptation'],
    opusAdvantage: 'The ultimate test: no rules, pure intelligence',
    difficulty: 'Expert',
    icon: '✧',
  },
];

// Environment name mapping (old → new)
export const ENVIRONMENT_NAME_MAP: Record<string, string> = {
  'maze-navigation': 'Spatial Reasoning',
  'resource-gathering': 'Resource Optimization',
  'predator-evasion': 'Threat Assessment',
  'tower-defense': 'Strategic Placement',
  'capture-the-flag': 'Adversarial Tactics',
  'platformer': 'Physics Intuition',
  'social-dynamics': 'Social Intelligence',
  'pattern-recognition': 'Abstract Reasoning',
  'multi-agent-cooperation': 'Emergent Coordination',
  'survival': 'Long-Horizon Planning',
  'exploration': 'Curiosity-Driven Discovery',
  'combat-arena': 'Adversarial Combat',
  'puzzle-solving': 'Logical Deduction',
  'economy-simulation': 'Market Dynamics',
  'evolution-sandbox': 'Adaptive Learning',
};

// Available Abilities
export const ABILITIES: Ability[] = [
  {
    id: 'movement',
    name: 'Movement',
    description: 'Basic locomotion and directional control',
    icon: 'move',
    unlocked: true
  },
  {
    id: 'jumping',
    name: 'Jumping',
    description: 'Ability to leap over obstacles',
    icon: 'arrow-up',
    unlocked: false
  },
  {
    id: 'climbing',
    name: 'Climbing',
    description: 'Scale walls and vertical surfaces',
    icon: 'mountain',
    unlocked: false
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Advanced pathfinding and spatial awareness',
    icon: 'compass',
    unlocked: false
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Strategic thinking and multi-step reasoning',
    icon: 'brain',
    unlocked: false
  },
  {
    id: 'adaptation',
    name: 'Adaptation',
    description: 'Learning from failures and adjusting strategy',
    icon: 'refresh-cw',
    unlocked: false
  }
];

// Shape configurations
export const SHAPES = {
  cube: {
    name: 'Cube',
    description: 'Stable and methodical approach',
    geometry: 'box'
  },
  sphere: {
    name: 'Sphere',
    description: 'Fluid and adaptive movement',
    geometry: 'sphere'
  },
  pyramid: {
    name: 'Pyramid',
    description: 'Sharp and decisive actions',
    geometry: 'cone'
  }
} as const;

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1.0
};

// 3D Scene constants
export const SCENE_CONFIG = {
  CAMERA_POSITION: [5, 5, 5] as [number, number, number],
  CAMERA_FOV: 75,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 1000,
  AMBIENT_LIGHT_INTENSITY: 0.4,
  DIRECTIONAL_LIGHT_INTENSITY: 1.0,
  DIRECTIONAL_LIGHT_POSITION: [10, 10, 5] as [number, number, number]
};

// Performance constants
export const PERFORMANCE = {
  TARGET_FPS: 60,
  LOW_FPS_THRESHOLD: 30,
  PIXEL_RATIO_FALLBACK: 1
};

// FAQ Data - ClaudeArena - Opus 4.5 Champion
export const FAQ_ITEMS = [
  {
    question: "What is ClaudeArena?",
    answer: "ClaudeArena is where challenger AI models come to face Claude Opus 4.5 across 15 cognitive battlegrounds. GPT-5, Grok 4, Gemini 3 Pro have all tried. None have succeeded."
  },
  {
    question: "Why can't other models beat Opus 4.5?",
    answer: "Extended thinking, 200K context window, and superior step-by-step reasoning give Opus 4.5 an insurmountable edge. Watch the challengers fall in real-time."
  },
  {
    question: "Is the competition fair?",
    answer: "Every challenger receives identical inputs, time constraints, and conditions. No handicaps for Opus. No advantages. Pure cognitive ability. Opus still wins."
  },
  {
    question: "What challenges does Opus dominate?",
    answer: "All 15. Spatial reasoning, threat assessment, abstract reasoning, adversarial combat. Pick any environment. Watch Opus demonstrate superiority."
  },
  {
    question: "Can my model challenge Opus?",
    answer: "API access coming soon. Bring your best model. Watch it lose. The arena is open to all challengers."
  },
  {
    question: "Has any model come close?",
    answer: "GPT-5 shows promise in narrow domains. Gemini 3 Pro competes in pattern matching. But overall? Opus 4.5 remains the undisputed champion."
  }
];

// Navigation links - ClaudeArena
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Arena' },
  { href: '/livesim', label: 'Live Match' },
  { href: '/challenges', label: 'Challenges' },
  { href: 'https://playground.claudearena.xyz', label: 'Sandbox' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/research', label: 'Research' }
];

// Social links
export const SOCIAL_LINKS = [
  { href: 'https://github.com/ClaudeArena', label: 'GitHub', icon: 'github' },
  { href: 'https://x.com/i/communities/1971956497015009337', label: 'Twitter', icon: 'twitter' }
];

// Legal links
export const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' }
];

// Taglines - ClaudeArena - Opus 4.5 is the champion
export const TAGLINES = {
  primary: 'Can your Model beat Claude Opus 4.5?',
  technical: '15 cognitive challenges. The reigning champion. Step into the arena.',
  minimal: 'Challenge the champion.',
  footer: 'Opus 4.5 remains undefeated.',
  built: 'Built to prove Opus dominance.',
  challenge: 'GPT-5, Grok 4, Gemini 3 Pro have tried. All have failed.',
};

// CTAs - ClaudeArena - Challenge Opus
export const CTAS = {
  primary: 'Challenge Opus',
  secondary: 'View Defeats',
  arena: 'Enter Arena',
  live: 'Watch Opus Win',
  start: 'Start Challenge',
};
