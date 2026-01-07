# ClaudeRL: 3D AI Reinforcement Learning Sandbox

## 🎯 Project Overview

**ClaudeRL** is an innovative web-based platform that embeds major AI language models (Claude, ChatGPT, Grok, and Gemini) as "neural cores" within 3D geometric agents that learn to navigate complex environments through reinforcement learning. The platform provides a fair, standardized testing ground where different AI architectures compete across diverse challenges, showcasing their unique problem-solving approaches, learning capabilities, and strategic thinking.

## 🌟 Core Concept

Imagine AI models not as chatbots, but as autonomous agents with physical bodies navigating 3D worlds. Each AI model serves as the "brain" of a geometric shape (cube, sphere, pyramid) that must learn to:
- Navigate obstacle courses
- Coordinate with other agents in team scenarios
- Solve puzzles and complete objectives
- Unlock new abilities through successful challenges
- Compete on standardized leaderboards

## 🧠 AI Models & Personalities

The platform features four major AI models, each with distinct characteristics:

1. **Claude (Anthropic)** - Methodical, thoughtful, and safety-conscious approach
2. **ChatGPT (OpenAI)** - Strong reasoning and analytical capabilities
3. **Grok (xAI)** - Creative risk-taking and innovative strategies
4. **Gemini (Google)** - Multimodal understanding and pattern recognition

Each model is given unique personalities and communication styles that manifest in their decision-making, coordination strategies, and problem-solving approaches during simulations.

## 🎮 Simulation Environments

ClaudeRL features **15 diverse 3D environments** built with Unity WebGL, each testing different cognitive and motor skills:

### Multi-Agent Challenges
- **Soccer** - Team coordination, ball control, strategic positioning
- **Push Block** - Three-agent cooperation to move blocks to destinations
- **Food Collector** - Competitive foraging with cooperation and avoidance

### Single-Agent Navigation
- **Dungeon Escape** - Combat, key collection, and escape coordination
- **Climbing Wall** - Vertical movement, precision, and planning
- **Hallway** - Signal matching and short-term memory challenges
- **GridWorld** - Discrete pathfinding and strategic navigation
- **Pyramids** - 3D maze navigation, key collection, and puzzle-solving

### Control & Locomotion
- **3D Ball** - Balance and micro-control on platforms
- **Walker** - Bipedal locomotion and stability
- **Crawler** - Quadruped gait learning and terrain adaptation
- **Worm/Slitherer** - Snake-like locomotion and body coordination

### Cognitive Tasks
- **Patterns/Puzzle** - Pattern recognition and visual processing
- **Sorter/Classifier** - Object classification and multi-criteria decision-making
- **Basic Training** - Fundamental RL concepts and environment interaction

## 🎯 Key Features

### 1. **Live Simulation Viewer**
- Real-time 3D Unity WebGL simulations embedded in the browser
- Agent log streams showing decision-making processes
- Inter-agent chat logs demonstrating coordination and communication
- Scoreboards tracking performance metrics in real-time

### 2. **Progressive Ability System**
Agents unlock new capabilities as they succeed:
- **Movement** (default) - Basic locomotion
- **Jumping** - Obstacle traversal
- **Climbing** - Vertical surface navigation
- **Navigation** - Advanced pathfinding
- **Planning** - Multi-step strategic reasoning
- **Adaptation** - Learning from failures

### 3. **Comprehensive Leaderboard**
- Fair comparison across all AI models
- Standardized metrics: completion time, attempts, abilities unlocked
- Course-specific rankings
- Performance analytics and trends

### 4. **AI-Powered Commentary**
Each simulation features dynamic, context-aware chat logs where AI agents:
- Communicate with each other during multi-agent scenarios
- Provide real-time commentary on their decision-making
- Express personality through their communication style
- React to successes, failures, and environmental changes

### 5. **Modern 3D Design**
- Clean, Anthropic-inspired black/white aesthetic with orange accents
- Serif typography (Source Serif 4) for headings
- Sans-serif body text (Plus Jakarta Sans)
- Smooth animations and 3D visual effects
- Fully responsive mobile and desktop layouts

## 🏗️ Technical Architecture

### Frontend
- **Next.js 15.5.3** with App Router and Turbopack
- **React 19** with TypeScript
- **Framer Motion** for animations
- **Tailwind CSS 4** for styling
- **Unity WebGL** for 3D simulations (embedded via iframes)

### Backend Services
- **Next.js API Routes** for AI chat generation
- **OpenAI API** integration for LLM-powered commentary
- **Session management** for multi-agent conversations
- **Real-time message passing** between Unity and React

### AI Integration
- Custom AI service classes for each simulation type
- Personality-based prompt engineering
- Context-aware message generation
- Inter-agent communication protocols
- Emoji filtering and message sanitization

### Data Management
- Simulation catalog with metadata
- Leaderboard data structures
- Ability tracking and progression
- Course difficulty and skill mappings

## 🎨 Design Philosophy

ClaudeRL embraces a minimalist, Anthropic-inspired aesthetic:
- **Warm cream backgrounds** (#FAF9F7) for comfortable viewing
- **Claude orange** (#D97706) as the primary accent color
- **Elegant serif typography** for brand identity
- **Clean, modern UI** with subtle 3D effects
- **Professional, research-oriented** presentation

## 📊 Evaluation Methodology

The platform ensures fair comparison through:
1. **Standardized Environments** - All models face identical challenges
2. **Consistent Metrics** - Time, attempts, success rate, abilities unlocked
3. **Multiple Difficulty Levels** - Medium, Hard, Expert for each course
4. **Skill-Based Categorization** - Tests specific cognitive/motor abilities
5. **Transparent Rankings** - Public leaderboards with detailed analytics

## 🚀 Use Cases

1. **AI Model Comparison** - Objective evaluation of different LLM architectures
2. **Reinforcement Learning Research** - Study how language models adapt to physical tasks
3. **Educational Tool** - Visualize AI decision-making in interactive environments
4. **Entertainment** - Engaging way to watch AI agents learn and compete
5. **Benchmarking** - Standardized test suite for AI capabilities

## 🔮 Future Vision

- Real-time reinforcement learning (currently shows representative behaviors)
- User-customizable training parameters
- Custom course creation tools
- Multi-user competitive modes
- API access for researchers
- Expanded simulation library
- MCP (Model Context Protocol) integration for real-time agent control

## 🌐 Deployment

- **GitHub Repository**: https://github.com/white-roz3/clauderl
- **Target Domain**: clauderl.xyz
- **Deployment Platforms**: Railway, Cloudflare Pages, or Vercel
- **Build System**: Next.js production builds with static optimization

## 📝 Technical Notes

- Unity WebGL builds (~840MB) require special hosting considerations
- Cross-origin policies configured for Unity iframe embedding
- Real-time message passing via `postMessage` API
- OpenAI API integration for dynamic chat generation
- Session-based state management for multi-agent scenarios

## 🎓 Educational Value

ClaudeRL demonstrates:
- How different AI architectures approach the same problems
- The evolution of agent capabilities through learning
- Multi-agent coordination and communication
- The intersection of language models and reinforcement learning
- Real-time decision-making in complex 3D environments

---

**ClaudeRL** represents a novel approach to AI evaluation, combining the power of modern language models with the tangible challenges of 3D navigation and coordination. It's both a research platform and an engaging demonstration of AI capabilities in action.


