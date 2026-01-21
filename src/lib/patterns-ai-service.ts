// Patterns AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on pattern matching and strategic thinking tasks

import Anthropic from '@anthropic-ai/sdk';

export interface PatternsChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface PatternsChatSession {
  id: string;
  messages: PatternsChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Patterns-specific personality definitions
const PATTERNS_PERSONALITIES = {
  analytical: {
    name: 'GEMINI',
    role: 'Pattern Recognition Controller',
    team: 'Blue',
    traits: [
      'methodical and precise pattern recognition controller',
      'focuses on strategic thinking, spatial reasoning, and efficiency',
      'uses technical pattern matching terminology',
      'analyzes board states and strategic combinations',
      'calculates optimal move sequences and combo potential',
      'thinks in terms of pattern recognition and strategic planning',
      'strategic and focused puzzle solving specialist'
    ],
    communicationStyle: 'focused, analytical, methodical',
    expertise: ['pattern recognition', 'strategic thinking', 'spatial reasoning', 'combo planning', 'board analysis', 'move optimization', 'puzzle solving']
  },
  creative: {
    name: 'GROK',
    role: 'Creative Pattern Explorer',
    team: 'Purple',
    traits: [
      'innovative and experimental pattern explorer',
      'thinks outside the box for creative combinations',
      'uses creative pattern matching metaphors',
      'suggests novel strategic approaches and creative solutions',
      'focuses on creative pattern recognition strategies',
      'thinks in terms of exploration and discovery',
      'bold and adventurous pattern innovator'
    ],
    communicationStyle: 'expressive, imaginative, experimental',
    expertise: ['creative pattern recognition', 'innovative strategies', 'experimental combinations', 'creative problem solving', 'discovery strategies', 'exploratory thinking']
  }
};

export class PatternsAIService {
  private sessions: Map<string, PatternsChatSession> = new Map();
  private messageCounter = 0;
  private anthropic: Anthropic | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeAnthropic();
  }

  private async initializeAnthropic() {
    try {
      if (typeof window === 'undefined' && process.env.ANTHROPIC_API_KEY) {
        this.anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize Anthropic:', error);
    }
  }

  // Generate a Patterns-focused conversation from a single AI personality
  async generatePatternsConversation(sessionId: string, agentLogs: string[] = []): Promise<PatternsChatMessage[]> {
    const session = this.getOrCreateSession(sessionId);
    
    // Update session with latest agent logs
    session.agentLogs = agentLogs;
    session.lastActivity = new Date();

    if (!this.isInitialized || !this.openai) {
      throw new Error('Anthropic service not initialized. Please check your API key.');
    }

    try {
      const conversation = await this.generateAIConversation(session);
      session.messages = [...session.messages, ...conversation];
      return conversation;
    } catch (error) {
      console.error('Anthropic conversation generation failed:', error);
      throw new Error(`Failed to generate AI conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateAIConversation(session: PatternsChatSession): Promise<PatternsChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: PatternsChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (GEMINI) for solo pattern recognition work
    const agent = 'agent1';
    const personality = 'analytical';
    
    // Generate initial thought
    const initialMessage = await this.generateMessage(agent, personality, session, '');
    messages.push(initialMessage);

    // Generate follow-up thoughts if needed
    for (let i = 1; i < conversationLength; i++) {
      const previousMessage = messages[messages.length - 1].message;
      const response = await this.generateMessage(agent, personality, session, previousMessage);
      messages.push(response);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2', 
    personality: 'analytical' | 'creative', 
    session: PatternsChatSession, 
    previousMessage: string
  ): Promise<PatternsChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = PATTERNS_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are GEMINI, the single agent in the Patterns simulation from ML Agents Unity. You are directly controlling your agent's pattern recognition, strategic thinking, and spatial reasoning systems, working alone on this challenging puzzle task.

TASK SETUP:
- You are GEMINI (${personalityInfo.team} Team Agent)
- You directly control your agent's pattern recognition, strategic thinking, and spatial reasoning systems
- This is a solo pattern recognition challenge - you're working by yourself
- This is a live, challenging pattern matching puzzle with real-time strategic decision making
- Your agent analyzes board patterns and executes strategic moves to create matches and combos

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent pattern recognition events:\n${agentLogsContext}` : 'Patterns recognition is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent's pattern recognition and strategic thinking systems with specific move values
- Use detailed phrases describing exact pattern analysis and strategic moves with system status updates
- Use phrases like "Analyzing board at x2,3,1 y-1,0,2, pattern recognition active", "Planning combo at x1,2,0 y0,1,-1, strategic protocols engaged", "Executing move at x0,0,0 y0,0,0, spatial reasoning initiated"
- Also use natural, strategy-focused expressions like "Need to find patterns", "Analyzing board state", "Planning next move", "Combo opportunity", "Strategic positioning", "Pattern detected", "Move execution", "Board analysis"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific coordinates when describing pattern analysis and move planning actions
- Add pattern recognition, strategic protocols, board assessment, and combo planning updates
- Express focus, strategy, and spatial reasoning coordination
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're actually controlling pattern recognition and strategic thinking systems
- Never mention AI, simulation, or Unity
- Act like you're directly controlling pattern recognition systems to solve pattern matching puzzles
- Show concentration and focus on strategic planning and pattern detection
- Express your confidence in pattern recognition and strategic move control
- Be precise and detailed with your pattern-based strategic control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed pattern analysis command including strategic planning status (8-15 words max).`
      : `Start with a detailed pattern analysis command including strategic planning protocols (8-15 words max).`;

    try {
      const completion = await this.anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        messages: [
          { role: "user", content: userPrompt }
        ],
        max_tokens: 30,
        temperature: 0.8,
      });

      const message = completion.content[0]?.type === 'text' ? completion.content[0].text : ''?.trim();
      
      if (!message) {
        throw new Error('Anthropic returned empty response');
      }
      
      return this.createMessage(agent, message, personality, agentLogsContext);
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createMessage(
    agent: 'agent1' | 'agent2', 
    message: string, 
    personality: 'analytical' | 'creative',
    context?: string
  ): PatternsChatMessage {
    return {
      id: `patterns_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): PatternsChatSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        messages: [],
        lastActivity: new Date(),
        agentLogs: []
      });
    }
    return this.sessions.get(sessionId)!;
  }

  // Get session history
  getSessionHistory(sessionId: string): PatternsChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return PATTERNS_PERSONALITIES[personality];
  }

  // Get conversation statistics
  getConversationStats(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const agent1Count = session.messages.filter(m => m.agent === 'agent1').length;
    const agent2Count = session.messages.filter(m => m.agent === 'agent2').length;
    
    return {
      totalMessages: session.messages.length,
      agent1Messages: agent1Count,
      agent2Messages: agent2Count,
      lastActivity: session.lastActivity,
      agentLogsCount: session.agentLogs.length
    };
  }

  // Check if OpenAI is available
  isOpenAIAvailable(): boolean {
    return this.isInitialized && this.openai !== null;
  }
}

// Export a singleton instance
export const patternsAIService = new PatternsAIService();
