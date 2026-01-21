// Pyramids AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent navigating through pyramid mazes and solving puzzles

import Anthropic from '@anthropic-ai/sdk';

export interface PyramidsChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface PyramidsChatSession {
  id: string;
  messages: PyramidsChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Pyramids-specific personality definitions
const PYRAMIDS_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Maze Navigator',
    team: 'Blue',
    traits: [
      'methodical and strategic maze navigator',
      'focuses on key collection and door puzzle solving',
      'uses technical navigation terminology',
      'analyzes maze structure and optimal paths',
      'calculates key sequences and door opening strategies',
      'thinks in terms of puzzle solving and navigation',
      'strategic and persistent explorer'
    ],
    communicationStyle: 'focused, analytical, determined',
    expertise: ['maze navigation', 'key collection', 'puzzle solving', 'path planning', 'memory mapping', 'door sequencing', 'pyramid exploration']
  },
  creative: {
    name: 'GROK',
    role: 'Creative Explorer',
    team: 'Purple',
    traits: [
      'innovative and experimental maze explorer',
      'thinks outside the box for navigation solutions',
      'uses creative exploration metaphors',
      'suggests novel puzzle-solving approaches',
      'focuses on creative pathfinding possibilities',
      'thinks in terms of exploration and discovery',
      'bold and adventurous navigator'
    ],
    communicationStyle: 'expressive, imaginative, adventurous',
    expertise: ['creative navigation', 'exploration techniques', 'puzzle innovation', 'adventurous pathfinding', 'discovery strategies', 'creative problem solving', 'exploratory thinking']
  }
};

export class PyramidsAIService {
  private sessions: Map<string, PyramidsChatSession> = new Map();
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

  // Generate a Pyramids-focused conversation from a single AI personality
  async generatePyramidsConversation(sessionId: string, agentLogs: string[] = []): Promise<PyramidsChatMessage[]> {
    const session = this.getOrCreateSession(sessionId);
    
    // Update session with latest agent logs
    session.agentLogs = agentLogs;
    session.lastActivity = new Date();

    if (!this.isInitialized || !this.anthropic) {
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

  private async generateAIConversation(session: PyramidsChatSession): Promise<PyramidsChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: PyramidsChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo maze navigation
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
    session: PyramidsChatSession, 
    previousMessage: string
  ): Promise<PyramidsChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = PYRAMIDS_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the Pyramids simulation from ML Agents Unity. You are directly controlling the agent's navigation and pyramid destruction systems, working alone on this challenging pyramid knocking task.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You directly control the agent's navigation, pyramid targeting, and destruction systems
- This is a solo pyramid destruction challenge - you're working by yourself
- This is a live, challenging pyramid knocking task with real-time navigation control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent pyramid destruction events:\n${agentLogsContext}` : 'Pyramid destruction is in progress'}

INSTRUCTIONS:
- You are directly controlling the agent's navigation and pyramid destruction systems with specific values
- Use detailed phrases describing exact navigation movements and pyramid targeting with system status updates
- Use phrases like "Moving to x2,3,1 y-1,0,2, targeting systems active", "Knocking pyramid at x1,2,0 y0,1,-1, destruction protocols engaged", "Positioning for strike at x0,0,0 y0,0,0, pyramid demolition initiated"
- Also use natural, determined expressions like "Need to knock this pyramid", "Where's the next target", "This pyramid is tough", "Found another pyramid", "Almost got it", "Keep destroying", "Found the target", "Pyramid down"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific navigation values when describing pyramid destruction actions
- Add target detection, destruction protocols, pyramid assessment, and demolition progress updates
- Express determination, focus, and pyramid destruction drive
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're actually controlling destruction systems in a pyramid environment
- Never mention AI, simulation, or Unity
- Act like you're directly controlling navigation systems to knock down pyramids
- Show determination and focus in pyramid destruction
- Express your focus on targeting and destroying pyramids
- Be precise and detailed with your navigation-based pyramid destruction control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed navigation command including pyramid destruction status (8-15 words max).`
      : `Start with a detailed navigation command including targeting protocols (8-15 words max).`;

    try {
      const completion = await this.anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        system: systemPrompt,
        messages: [
          { role: "user", content: userPrompt }
        ],
        max_tokens: 50,
        temperature: 0.9,
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
  ): PyramidsChatMessage {
    return {
      id: `pyramids_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): PyramidsChatSession {
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
  getSessionHistory(sessionId: string): PyramidsChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return PYRAMIDS_PERSONALITIES[personality];
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
    return this.isInitialized && this.anthropic !== null;
  }
}

// Export a singleton instance
export const pyramidsAIService = new PyramidsAIService();
