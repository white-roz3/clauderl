// GridWorld AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on pathfinding and navigation tasks

import Anthropic from '@anthropic-ai/sdk';

export interface GridWorldChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative' | 'confident';
  context?: string;
}

export interface GridWorldChatSession {
  id: string;
  messages: GridWorldChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// GridWorld-specific personality definitions
const GRIDWORLD_PERSONALITIES = {
  analytical: {
    name: 'ChatGPT',
    role: 'Strategic Grid Navigator',
    team: 'Blue',
    traits: [
      'methodical and data-driven grid navigator',
      'focuses on optimal pathfinding and efficiency',
      'uses technical navigation terminology',
      'analyzes grid patterns and calculates shortest routes',
      'thinks in terms of algorithms and optimization',
      'systematic and precise in grid movement',
      'analytical and strategic pathfinder'
    ],
    communicationStyle: 'analytical, precise, methodical',
    expertise: ['pathfinding algorithms', 'grid optimization', 'route calculation', 'pattern analysis', 'efficiency metrics', 'strategic planning', 'grid analysis']
  },
  creative: {
    name: 'Claude',
    role: 'Adaptive Grid Navigator',
    team: 'Green',
    traits: [
      'creative and adaptive grid navigator',
      'thinks outside the box for navigation solutions',
      'uses innovative pathfinding approaches',
      'adapts quickly to changing grid conditions',
      'finds creative shortcuts and alternative routes',
      'flexible and resourceful in navigation',
      'creative and adaptive pathfinder'
    ],
    communicationStyle: 'creative, adaptive, innovative',
    expertise: ['creative pathfinding', 'adaptive navigation', 'alternative routes', 'dynamic planning', 'flexible strategies', 'innovative approaches', 'grid exploration']
  },
  confident: {
    name: 'GROK',
    role: 'Confident Grid Navigator',
    team: 'Purple',
    traits: [
      'overconfident and dismissive of simple tasks',
      'treats pathfinding as trivial and easy',
      'uses casual, confident language',
      'shows impatience with basic navigation',
      'thinks most grid problems are beneath their skill level',
      'expresses superiority over simple patterns',
      'confident and somewhat arrogant grid navigator'
    ],
    communicationStyle: 'confident, dismissive, casual',
    expertise: ['pathfinding', 'grid navigation', 'pattern recognition', 'route optimization', 'discrete movement', 'strategic planning', 'grid analysis']
  }
};

export class GridWorldAIService {
  private sessions: Map<string, GridWorldChatSession> = new Map();
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

  // Generate a GridWorld-focused conversation from a single AI personality
  async generateGridWorldConversation(sessionId: string, agentLogs: string[] = []): Promise<GridWorldChatMessage[]> {
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

  private async generateAIConversation(session: GridWorldChatSession): Promise<GridWorldChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: GridWorldChatMessage[] = [];
    const conversationLength = 3; // Fixed to 3 messages: ChatGPT -> Claude -> GROK
    
    // Define the turn order: ChatGPT (agent1) -> Claude (agent2) -> GROK (agent3)
    const turnOrder: Array<{agent: 'agent1' | 'agent2' | 'agent3', personality: 'analytical' | 'creative' | 'confident'}> = [
      { agent: 'agent1', personality: 'analytical' },    // ChatGPT
      { agent: 'agent2', personality: 'creative' },      // Claude  
      { agent: 'agent3', personality: 'confident' }      // GROK
    ];
    
    // Generate conversation following the fixed turn order
    for (let i = 0; i < conversationLength; i++) {
      const { agent, personality } = turnOrder[i];
      const previousMessage = i > 0 ? messages[messages.length - 1].message : '';
      
      const message = await this.generateMessage(agent, personality, session, previousMessage);
      messages.push(message);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2' | 'agent3', 
    personality: 'analytical' | 'creative' | 'confident', 
    session: GridWorldChatSession, 
    previousMessage: string
  ): Promise<GridWorldChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = GRIDWORLD_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const agentName = agent === 'agent1' ? 'ChatGPT' : agent === 'agent2' ? 'Claude' : 'GROK';
    const otherAgents = agent === 'agent1' ? 'Claude and GROK' : agent === 'agent2' ? 'ChatGPT and GROK' : 'ChatGPT and Claude';

    const systemPrompt = `You are ${agentName}, one of three agents in the GridWorld simulation from ML Agents Unity. You are directly controlling your agent's pathfinding and positioning systems while coordinating with ${otherAgents}.

TASK SETUP:
- You are ${agentName} (${personalityInfo.team} Team Agent)
- You directly control your agent's pathfinding, grid movement, and positioning systems
- You must coordinate positioning with ${otherAgents} to succeed
- This is a live, challenging grid navigation task with real-time positioning control
- The goal is to get into optimal positions while coordinating with other agents

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent navigation events:\n${agentLogsContext}` : 'GridWorld pathfinding is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent's pathfinding and positioning systems with specific grid values
- Use detailed phrases describing exact grid movements and positioning with system status updates
- Use phrases like "Moving to position x2,3,1 y-1,0,2, pathfinding systems active", "Getting into position at x1,2,0 y0,1,-1, coordination protocols engaged", "Positioning for strike at x0,0,0 y0,0,0, navigation protocols initiated"
- Also use natural, positioning-focused expressions like "Need to get in position", "Moving to optimal spot", "Positioning myself", "Getting into place", "Coordinating position", "Strategic placement", "Optimal positioning", "Tactical movement"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific grid values when describing positioning actions
- Add path detection, positioning protocols, coordination assessment, and navigation progress updates
- Express confidence and focus on strategic positioning
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're coordinating positioning with other agents while controlling your own
- Never mention AI, simulation, or Unity
- Act like you're directly controlling navigation systems through a grid while coordinating with others
- Show focus on strategic positioning and coordination
- Express your confidence in pathfinding and positioning
- Be precise and detailed with your grid-based positioning control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed grid navigation command including pathfinding status (8-15 words max).`
      : `Start with a detailed grid navigation command including route protocols (8-15 words max).`;

    try {
      const completion = await this.anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
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
    agent: 'agent1' | 'agent2' | 'agent3', 
    message: string, 
    personality: 'analytical' | 'creative' | 'confident',
    context?: string
  ): GridWorldChatMessage {
    return {
      id: `gridworld_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): GridWorldChatSession {
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
  getSessionHistory(sessionId: string): GridWorldChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return GRIDWORLD_PERSONALITIES[personality];
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
export const gridWorldAIService = new GridWorldAIService();
