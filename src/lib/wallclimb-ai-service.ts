// Wallclimb AI Service - Single Agent System with OpenAI Integration
// This service simulates a single AI agent working on a challenging climbing task

import Anthropic from '@anthropic-ai/sdk';

export interface WallclimbChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface WallclimbChatSession {
  id: string;
  messages: WallclimbChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Wallclimb-specific personality definitions
const WALLCLIMB_PERSONALITIES = {
  analytical: {
    name: 'Claude',
    role: 'Wallclimb Specialist',
    team: 'Blue',
    traits: [
      'confident and determined wallclimb controller',
      'focuses on getting over the wall with strength',
      'uses confident climbing terminology',
      'analyzes wall structure and climbing strategy',
      'calculates optimal moves to reach the top',
      'thinks in terms of determination and success',
      'confident and strong climber'
    ],
    communicationStyle: 'confident, determined, strong',
    expertise: ['wallclimb strategy', 'strength building', 'climbing techniques', 'determination', 'grip strength', 'balance control', 'wall climbing']
  },
  creative: {
    name: 'GROK',
    role: 'Dynamic Climber',
    team: 'Purple',
    traits: [
      'innovative and experimental climbing controller',
      'thinks outside the box for creative climbing techniques',
      'uses climbing metaphors and analogies',
      'suggests novel climbing strategies',
      'focuses on dynamic climbing possibilities',
      'thinks in terms of fluid motion and creativity',
      'bold and unpredictable climber'
    ],
    communicationStyle: 'expressive, imaginative, determined',
    expertise: ['dynamic climbing', 'creative techniques', 'fluid movements', 'unexpected strategies', 'artistic climbing', 'innovative approaches', 'adaptive climbing']
  }
};

export class WallclimbAIService {
  private sessions: Map<string, WallclimbChatSession> = new Map();
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

  // Generate a Wallclimb-focused conversation from a single AI personality
  async generateWallclimbConversation(sessionId: string, agentLogs: string[] = []): Promise<WallclimbChatMessage[]> {
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

  private async generateAIConversation(session: WallclimbChatSession): Promise<WallclimbChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: WallclimbChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages (solo agent)
    
    // Use only one agent (Claude) for solo climbing task
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
    session: WallclimbChatSession, 
    previousMessage: string
  ): Promise<WallclimbChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = WALLCLIMB_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const systemPrompt = `You are ${personalityInfo.name}, ${personalityInfo.role} in the wallclimb simulation from ML Agents Unity. You are directly controlling the agent's climbing and jumping systems, working alone on this challenging climbing task.

TASK SETUP:
- You are ${personalityInfo.name} (${personalityInfo.team} Team Agent)
- You directly control the agent's climbing, jumping, and grip systems
- This is a solo wallclimb challenge - you're working by yourself
- This is a live, challenging climbing task with real-time movement control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent wallclimb events:\n${agentLogsContext}` : 'Wallclimb task is in progress'}

INSTRUCTIONS:
- You are directly controlling the agent's climbing and jumping systems with specific values
- Mix technical commands with natural, encouraging expressions about climbing
- Use varied phrases like "Jumping to x2,3,1 y-1,0,2", "Climbing to x1,2,0 y0,1,-1", "Pushing off at x0,0,0 y0,0,0", "Launching up to x3,2,1 y0,-1,2", "Reaching for x2,1,0 y-1,0,1", "Scaling to x3,1,2 y-1,0,2"
- Include natural expressions like "I can do it", "Almost there", "Keep going", "I got this", "Push harder", "Don't give up", "Stay focused", "I'm determined", "This is tough", "Come on", "Higher", "Almost at the top"
- Keep responses concise but natural (1 sentence max, 8-15 words)
- Sometimes include specific movement values, sometimes just encouraging reactions
- Express the difficulty and challenge of climbing the wall
- Use VARIED expressions - mix technical positioning with natural climbing reactions
- Sound like a real person struggling to climb a difficult wall
- Never mention AI, simulation, or Unity
- Act like you're actually trying to climb a wall and finding it challenging
- Show determination mixed with natural reactions to the difficulty
- Express strength and willpower naturally
- Be human and relatable in your responses`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond naturally about your climbing task - mix technical commands with encouraging reactions (8-15 words max).`
      : `Start with a natural response about your climbing task - show your determination and approach (8-15 words max).`;

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
  ): WallclimbChatMessage {
    return {
      id: `wallclimb_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): WallclimbChatSession {
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
  getSessionHistory(sessionId: string): WallclimbChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative') {
    return WALLCLIMB_PERSONALITIES[personality];
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
export const wallclimbAIService = new WallclimbAIService();
