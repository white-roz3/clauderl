// 3D Ball AI Service - Dual Personality System with OpenAI Integration
// This service simulates two AI agents chatting about 3D ball physics and control

import Anthropic from '@anthropic-ai/sdk';

export interface Ball3DChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface Ball3DChatSession {
  id: string;
  messages: Ball3DChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// 3D Ball-specific personality definitions
const BALL3D_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Balance Specialist',
    team: 'Blue',
    traits: [
      'methodical and data-driven balance controller',
      'focuses on precise head movements and balance calculations',
      'uses technical balance terminology',
      'analyzes ball position and stability data',
      'calculates optimal micro-adjustments and angles',
      'thinks in terms of balance equations and precision',
      'competitive and strategic balancer'
    ],
    communicationStyle: 'focused, technical, determined',
    expertise: ['balance control', 'micro-adjustments', 'stability analysis', 'precision movements', 'head positioning', 'gravity calculations', 'equilibrium maintenance']
  },
  creative: {
    name: 'GROK',
    role: 'Dynamic Balancer',
    team: 'Purple',
    traits: [
      'innovative and experimental balance controller',
      'thinks outside the box for creative balancing techniques',
      'uses balance metaphors and analogies',
      'suggests novel balancing strategies',
      'focuses on dynamic possibilities',
      'thinks in terms of fluid motion and creativity',
      'bold and unpredictable balancer'
    ],
    communicationStyle: 'expressive, imaginative, determined',
    expertise: ['dynamic balancing', 'creative techniques', 'fluid movements', 'unexpected strategies', 'artistic control', 'innovative approaches', 'adaptive balancing']
  }
};

export class Ball3DAIService {
  private sessions: Map<string, Ball3DChatSession> = new Map();
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

  // Generate a 3D Ball-focused conversation between the two AI personalities
  async generateBall3DConversation(sessionId: string, agentLogs: string[] = []): Promise<Ball3DChatMessage[]> {
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

  private async generateAIConversation(session: Ball3DChatSession): Promise<Ball3DChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: Ball3DChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo balancing task
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
    session: Ball3DChatSession, 
    previousMessage: string
  ): Promise<Ball3DChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = BALL3D_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in a challenging 3D ball balancing task. You are directly controlling the agent's rotation and balance systems in a Unity ML Agents environment, working alone on this difficult task.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You directly control the agent's rotation values and balance systems
- This is a solo balancing challenge - you're working by yourself
- This is a live, challenging balance control task with real-time rotation control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent task events:\n${agentLogsContext}` : 'Task is in progress'}

INSTRUCTIONS:
- You are directly controlling the agent's rotation and balance systems with specific values
- Mix technical commands with natural, casual expressions about the difficulty
- Use varied phrases like "Adjusting rotation to x-0.2, y0.1, z0.0", "Don't fall now", "Wow this is hard", "Correcting pitch to x0.1, y-0.3, z0.0", "Stay steady", "Fine-tuning roll to x0.0, y0.2, z-0.1", "Almost there", "This is tricky"
- Include natural expressions like "Don't fall now", "Wow this is hard", "Stay steady", "Almost there", "This is tricky", "Come on", "Hold it", "Focus", "Concentrate", "Don't roll off", "Keep it balanced"
- Keep responses concise but natural (1-2 sentences max, 8-15 words)
- Sometimes include specific rotation values, sometimes just natural reactions
- Express the difficulty and challenge of balancing the ball naturally
- Use VARIED expressions - mix technical commands with casual reactions
- Sound like a real person struggling with a difficult balancing task
- Never mention AI, simulation, or Unity
- Act like you're actually trying to balance a ball and finding it challenging
- Show the stress, concentration, and occasional frustration of the task
- Express determination mixed with natural reactions to difficulty
- Be human and relatable in your responses`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond naturally about your balancing task - mix technical commands with casual reactions (8-15 words max).`
      : `Start with a natural response about your balancing task - show the difficulty and your approach (8-15 words max).`;

    try {
      const completion = await this.anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        system: systemPrompt,
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
  ): Ball3DChatMessage {
    return {
      id: `ball3d_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): Ball3DChatSession {
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
  getSessionHistory(sessionId: string): Ball3DChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return BALL3D_PERSONALITIES[personality];
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
export const ball3DAIService = new Ball3DAIService();
