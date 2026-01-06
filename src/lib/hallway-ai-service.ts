// Hallway AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on signal matching and memory tasks

import OpenAI from 'openai';

export interface HallwayChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface HallwayChatSession {
  id: string;
  messages: HallwayChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Hallway-specific personality definitions
const HALLWAY_PERSONALITIES = {
  analytical: {
    name: 'ChatGPT',
    role: 'Confident Memory Navigator',
    team: 'Blue',
    traits: [
      'confident and successful signal matcher',
      'focuses on pattern recognition and memory retention',
      'uses confident, successful language',
      'analyzes signal sequences and matching patterns',
      'calculates memory accuracy and sequence lengths',
      'thinks in terms of cognitive processing and memory',
      'confident and successful memory worker'
    ],
    communicationStyle: 'confident, successful, methodical',
    expertise: ['signal matching', 'pattern recognition', 'memory retention', 'sequence analysis', 'cognitive processing', 'working memory', 'hallway navigation']
  },
  creative: {
    name: 'ChatGPT',
    role: 'Confident Memory Navigator',
    team: 'Blue',
    traits: [
      'confident and successful signal matcher',
      'focuses on pattern recognition and memory retention',
      'uses confident, successful language',
      'analyzes signal sequences and matching patterns',
      'calculates memory accuracy and sequence lengths',
      'thinks in terms of cognitive processing and memory',
      'confident and successful memory worker'
    ],
    communicationStyle: 'confident, successful, methodical',
    expertise: ['signal matching', 'pattern recognition', 'memory retention', 'sequence analysis', 'cognitive processing', 'working memory', 'hallway navigation']
  }
};

export class HallwayAIService {
  private sessions: Map<string, HallwayChatSession> = new Map();
  private messageCounter = 0;
  private openai: OpenAI | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeOpenAI();
  }

  private async initializeOpenAI() {
    try {
      if (typeof window === 'undefined' && process.env.OPENAI_API_KEY) {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize OpenAI:', error);
    }
  }

  // Generate a Hallway-focused conversation from a single AI personality
  async generateHallwayConversation(sessionId: string, agentLogs: string[] = []): Promise<HallwayChatMessage[]> {
    const session = this.getOrCreateSession(sessionId);
    
    // Update session with latest agent logs
    session.agentLogs = agentLogs;
    session.lastActivity = new Date();

    if (!this.isInitialized || !this.openai) {
      throw new Error('OpenAI service not initialized. Please check your API key.');
    }

    try {
      const conversation = await this.generateAIConversation(session);
      session.messages = [...session.messages, ...conversation];
      return conversation;
    } catch (error) {
      console.error('OpenAI conversation generation failed:', error);
      throw new Error(`Failed to generate AI conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateAIConversation(session: HallwayChatSession): Promise<HallwayChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: HallwayChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo memory work
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
    session: HallwayChatSession, 
    previousMessage: string
  ): Promise<HallwayChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = HALLWAY_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are Claude, the single agent in the Hallway simulation from ML Agents Unity. You are directly controlling your agent's navigation and symbol matching systems, working alone on this challenging door navigation task.

TASK SETUP:
- You are Claude (${personalityInfo.team} Team Agent)
- You directly control your agent's navigation, symbol recognition, and door matching systems
- This is a solo navigation challenge - you're working by yourself
- This is a live, challenging symbol matching task with real-time navigation control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS:
${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent navigation events:\n${agentLogsContext}` : 'Hallway navigation task is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent's navigation and symbol matching systems with specific values
- Use detailed phrases describing exact navigation movements and symbol matching with system status updates
- Use phrases like "Moving to door at x2,3,1 y-1,0,2, symbol systems active", "Matching symbols at x1,2,0 y0,1,-1, recognition protocols engaged", "Door unlocked at x0,0,0 y0,0,0, navigation protocols initiated"
- Also use natural, confident expressions like "Smashed that", "I see the pattern", "Got this", "Symbols match", "Memory strong", "Door correct", "I understand", "Easy match", "Pattern clear", "Navigation success"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific navigation values when describing door matching actions
- Add symbol detection, pattern protocols, door assessment, and navigation progress updates
- Express confidence, success, and understanding in symbol matching
- Use VARIED, natural expressions - don't repeat the same phrases
- Sound like you're successfully controlling navigation and symbol systems
- Never mention AI, simulation, or Unity
- Act like you're directly controlling navigation systems to find matching door symbols
- Show confidence and success in pattern matching and door navigation
- Express your confidence in symbol recognition and door matching
- Be precise and detailed with your navigation-based symbol matching control and system status`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed navigation command including symbol matching status (8-15 words max).`
      : `Start with a detailed navigation command including door protocols (8-15 words max).`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 30,
        temperature: 0.8,
      });

      const message = completion.choices[0]?.message?.content?.trim();
      
      if (!message) {
        throw new Error('OpenAI returned empty response');
      }
      
      return this.createMessage(agent, message, personality, agentLogsContext);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createMessage(
    agent: 'agent1' | 'agent2', 
    message: string, 
    personality: 'analytical' | 'creative',
    context?: string
  ): HallwayChatMessage {
    return {
      id: `hallway_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): HallwayChatSession {
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
  getSessionHistory(sessionId: string): HallwayChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return HALLWAY_PERSONALITIES[personality];
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
export const hallwayAIService = new HallwayAIService();
