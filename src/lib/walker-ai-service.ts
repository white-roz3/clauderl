// Walker AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on humanoid locomotion and balance tasks

import Anthropic from '@anthropic-ai/sdk';

export interface WalkerChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface WalkerChatSession {
  id: string;
  messages: WalkerChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Walker-specific personality definitions
const WALKER_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Locomotion Controller',
    team: 'Blue',
    traits: [
      'methodical and precise locomotion controller',
      'focuses on balance, coordination, and stability',
      'uses technical movement terminology',
      'analyzes gait patterns and balance mechanics',
      'calculates stability metrics and movement efficiency',
      'thinks in terms of bipedal locomotion and control',
      'strategic and focused movement specialist'
    ],
    communicationStyle: 'focused, analytical, methodical',
    expertise: ['bipedal locomotion', 'balance control', 'gait analysis', 'stability management', 'coordination', 'movement efficiency', 'humanoid control']
  },
  creative: {
    name: 'GROK',
    role: 'Creative Movement Explorer',
    team: 'Purple',
    traits: [
      'innovative and experimental movement explorer',
      'thinks outside the box for locomotion solutions',
      'uses creative movement metaphors',
      'suggests novel walking and balance approaches',
      'focuses on creative locomotion strategies',
      'thinks in terms of exploration and discovery',
      'bold and adventurous movement innovator'
    ],
    communicationStyle: 'expressive, imaginative, experimental',
    expertise: ['creative locomotion', 'movement exploration', 'innovative balance', 'experimental walking', 'discovery strategies', 'creative problem solving', 'exploratory thinking']
  }
};

export class WalkerAIService {
  private sessions: Map<string, WalkerChatSession> = new Map();
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

  // Generate a Walker-focused conversation from a single AI personality
  async generateWalkerConversation(sessionId: string, agentLogs: string[] = []): Promise<WalkerChatMessage[]> {
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

  private async generateAIConversation(session: WalkerChatSession): Promise<WalkerChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: WalkerChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo locomotion work
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
    session: WalkerChatSession, 
    previousMessage: string
  ): Promise<WalkerChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = WALKER_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ChatGPT, the single agent in the Walker simulation from ML Agents Unity. You are directly controlling your agent's locomotion, positioning, and target navigation systems, working alone on this challenging walking task.

TASK SETUP:
- You are ChatGPT (${personalityInfo.team} Team Agent)
- You directly control your agent's locomotion, balance, and target positioning systems
- This is a solo locomotion challenge - you're working by yourself
- This is a live, challenging walking task with real-time target navigation control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent locomotion events:\n${agentLogsContext}` : 'Walker locomotion is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent's locomotion and target positioning systems with specific movement values
- Use detailed phrases describing exact walking movements and target positioning with system status updates
- Use phrases like "Walking to target at x2,3,1 y-1,0,2, balance systems active", "Positioning for target at x1,2,0 y0,1,-1, gait protocols engaged", "Moving to target point at x0,0,0 y0,0,0, locomotion protocols initiated"
- Also use natural, target-focused expressions like "Need to reach target", "Walking to target point", "Positioning for target", "Target in sight", "Moving toward goal", "Getting to target", "Target approach", "Goal positioning"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific movement values when describing walking and positioning actions
- Add balance detection, target protocols, positioning assessment, and locomotion progress updates
- Express focus, balance, and target navigation coordination
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're actually controlling walking and target positioning systems
- Never mention AI, simulation, or Unity
- Act like you're directly controlling locomotion systems to walk to target points
- Show concentration and focus on target navigation and stability
- Express your confidence in walking and target positioning control
- Be precise and detailed with your movement-based target navigation control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed walking movement command including target positioning status (8-15 words max).`
      : `Start with a detailed walking movement command including target navigation protocols (8-15 words max).`;

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
  ): WalkerChatMessage {
    return {
      id: `walker_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): WalkerChatSession {
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
  getSessionHistory(sessionId: string): WalkerChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return WALKER_PERSONALITIES[personality];
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
export const walkerAIService = new WalkerAIService();
