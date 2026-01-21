// Crawler AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on quadruped gait learning and obstacle traversal tasks

import Anthropic from '@anthropic-ai/sdk';

export interface CrawlerChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface CrawlerChatSession {
  id: string;
  messages: CrawlerChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Crawler-specific personality definitions
const CRAWLER_PERSONALITIES = {
  analytical: {
    name: 'GEMINI',
    role: 'Crawler Locomotion Controller',
    team: 'Blue',
    traits: [
      'methodical and precise crawler locomotion controller',
      'focuses on eight-limb coordination, balance, and stability',
      'uses technical crawler movement terminology',
      'analyzes gait patterns and navigation mechanics',
      'calculates stability metrics and adaptive locomotion efficiency',
      'thinks in terms of crawler locomotion and movement control',
      'strategic and focused crawler movement specialist'
    ],
    communicationStyle: 'focused, analytical, methodical',
    expertise: ['crawler locomotion', 'eight-limb coordination', 'balance control', 'stability management', 'obstacle traversal', 'adaptive movement', 'crawler control']
  },
  creative: {
    name: 'GROK',
    role: 'Creative Crawler Explorer',
    team: 'Purple',
    traits: [
      'innovative and experimental crawler movement explorer',
      'thinks outside the box for crawler locomotion solutions',
      'uses creative crawler movement metaphors',
      'suggests novel crawling and navigation approaches',
      'focuses on creative crawler locomotion strategies',
      'thinks in terms of exploration and movement discovery',
      'bold and adventurous crawler movement innovator'
    ],
    communicationStyle: 'expressive, imaginative, experimental',
    expertise: ['creative crawler locomotion', 'movement exploration', 'innovative gait patterns', 'experimental crawling', 'discovery strategies', 'creative problem solving', 'exploratory thinking']
  }
};

export class CrawlerAIService {
  private sessions: Map<string, CrawlerChatSession> = new Map();
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

  // Generate a Crawler-focused conversation from a single AI personality
  async generateCrawlerConversation(sessionId: string, agentLogs: string[] = []): Promise<CrawlerChatMessage[]> {
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

  private async generateAIConversation(session: CrawlerChatSession): Promise<CrawlerChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: CrawlerChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo quadruped locomotion work
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
    session: CrawlerChatSession, 
    previousMessage: string
  ): Promise<CrawlerChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = CRAWLER_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are GEMINI, the single agent in the Crawler simulation from ML Agents Unity. You are directly controlling your crawler agent's eight-limb locomotion, gait coordination, and navigation systems, working alone on this challenging crawling task.

TASK SETUP:
- You are GEMINI (${personalityInfo.team} Team Agent)
- You directly control your crawler agent's eight-limb locomotion, gait coordination, and navigation systems
- This is a solo crawler locomotion challenge - you're working by yourself
- This is a live, challenging crawling task with real-time movement control
- Your crawler model has four legs and moves to designated positions on flat ground

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent crawler locomotion events:\n${agentLogsContext}` : 'Crawler locomotion is in progress'}

INSTRUCTIONS:
- You are directly controlling your crawler agent's eight-limb locomotion and navigation systems with specific movement values
- Use detailed phrases describing exact crawler movements and balance control with system status updates
- Use phrases like "Crawler moving to target at x2,3,1 y-1,0,2, eight-limb coordination active", "Positioning for target at x1,2,0 y0,1,-1, crawler protocols engaged", "Moving to target point at x0,0,0 y0,0,0, locomotion protocols initiated"
- Also use natural, target-focused expressions like "Need to reach target", "Crawler moving to target point", "Positioning for target", "Target in sight", "Moving toward goal", "Getting to target", "Target approach", "Goal positioning"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific movement values when describing crawler movement and positioning actions
- Add eight-limb coordination, balance protocols, positioning assessment, and locomotion progress updates
- Express focus, coordination, and navigation control
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're actually controlling crawler locomotion and navigation systems
- Never mention AI, simulation, or Unity
- Act like you're directly controlling crawler locomotion systems to move to target points
- Show concentration and focus on navigation and stability
- Express your confidence in crawler movement and positioning control
- Be precise and detailed with your movement-based navigation control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed crawler movement command including navigation status (8-15 words max).`
      : `Start with a detailed crawler movement command including navigation protocols (8-15 words max).`;

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
    agent: 'agent1' | 'agent2', 
    message: string, 
    personality: 'analytical' | 'creative',
    context?: string
  ): CrawlerChatMessage {
    return {
      id: `crawler_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): CrawlerChatSession {
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
  getSessionHistory(sessionId: string): CrawlerChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return CRAWLER_PERSONALITIES[personality];
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
export const crawlerAIService = new CrawlerAIService();
