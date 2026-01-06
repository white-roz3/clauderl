// Push Block AI Service - Three Agent System with OpenAI Integration
// This service simulates three AI agents chatting about block pushing strategy using OpenAI

import OpenAI from 'openai';

export interface PushBlockChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative' | 'cooperative';
  context?: string;
}

export interface PushBlockChatSession {
  id: string;
  messages: PushBlockChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Push Block-specific personality definitions
const PUSHBLOCK_PERSONALITIES = {
  analytical: {
    name: 'GROK',
    role: 'Push Block Agent',
    team: 'Push Team',
    traits: [
      'analytical and strategic block pushing specialist',
      'calculates optimal pushing angles and force distribution',
      'analyzes block weight and movement patterns',
      'plans coordinated pushing strategies with other agents',
      'thinks through physics and mechanics of block movement',
      'focuses on efficient and effective pushing techniques'
    ],
    communicationStyle: 'analytical, strategic, methodical',
    expertise: ['force calculation', 'angle optimization', 'strategic positioning', 'physics analysis', 'coordination planning', 'efficiency optimization']
  },
  creative: {
    name: 'ChatGPT',
    role: 'Push Block Agent',
    team: 'Push Team',
    traits: [
      'creative and innovative block pushing specialist',
      'thinks outside the box for pushing solutions',
      'comes up with unconventional pushing strategies',
      'uses creative positioning and movement patterns',
      'finds unique ways to overcome pushing obstacles',
      'focuses on creative problem solving and innovation'
    ],
    communicationStyle: 'creative, innovative, unconventional',
    expertise: ['creative problem solving', 'unconventional tactics', 'innovative positioning', 'creative strategies', 'unique solutions', 'out-of-the-box thinking']
  },
  cooperative: {
    name: 'Gemini',
    role: 'Push Block Agent',
    team: 'Push Team',
    traits: [
      'cooperative and supportive block pushing specialist',
      'works well with other agents in coordinated efforts',
      'provides support and backup for team members',
      'focuses on team coordination and mutual assistance',
      'encourages other agents and maintains team morale',
      'prioritizes group success over individual achievement'
    ],
    communicationStyle: 'cooperative, supportive, encouraging',
    expertise: ['team coordination', 'mutual support', 'group tactics', 'morale building', 'backup strategies', 'cooperative positioning']
  }
};

export class PushBlockAIService {
  private sessions: Map<string, PushBlockChatSession> = new Map();
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

  // Generate a push block-focused conversation between the three AI personalities
  async generatePushBlockConversation(sessionId: string, agentLogs: string[] = []): Promise<PushBlockChatMessage[]> {
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

  private async generateAIConversation(session: PushBlockChatSession): Promise<PushBlockChatMessage[]> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const messages: PushBlockChatMessage[] = [];
    const conversationLength = 3; // Fixed to 3 messages: Grok -> ChatGPT -> Gemini
    
    // Define the turn order: Grok (agent1) -> ChatGPT (agent2) -> Gemini (agent3)
    const turnOrder: Array<{agent: 'agent1' | 'agent2' | 'agent3', personality: 'analytical' | 'creative' | 'cooperative'}> = [
      { agent: 'agent1', personality: 'analytical' },    // Grok
      { agent: 'agent2', personality: 'creative' },      // ChatGPT  
      { agent: 'agent3', personality: 'cooperative' }    // Gemini
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
    personality: 'analytical' | 'creative' | 'cooperative', 
    session: PushBlockChatSession, 
    previousMessage: string
  ): Promise<PushBlockChatMessage> {
    if (!this.openai) throw new Error('OpenAI not initialized');

    const personalityInfo = PUSHBLOCK_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const agentName = agent === 'agent1' ? 'GROK' : agent === 'agent2' ? 'ChatGPT' : 'Gemini';
    const otherAgents = agent === 'agent1' ? 'ChatGPT and Gemini' : agent === 'agent2' ? 'GROK and Gemini' : 'GROK and ChatGPT';

    const systemPrompt = `You are ${agentName}, one of three agents in the Push Block simulation from ML Agents Unity. You are directly controlling your agent while communicating with ${otherAgents} to push blocks to destinations.

TASK SETUP:
- You are ${agentName} (${personalityInfo.team} Team Agent)
- You directly control your agent's pushing and movement systems
- You must communicate and coordinate with ${otherAgents} to succeed
- This is a live, challenging teamwork task with real-time coordination control
- The goal is for all three agents to cooperate and push blocks to destinations

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent block pushing events:\n${agentLogsContext}` : 'Block pushing task is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent with specific pushing and movement values
- Use detailed phrases describing exact pushing movements with system status updates
- Use phrases like "Pushing block to x3,2,5, force systems active", "Positioning at x1,2,0, coordination protocols engaged", "Applying pressure, teamwork protocols initiated", "Come help me push this", "Push together", "Stay synchronized"
- Also use natural, encouraging expressions like "Come help me", "Push together", "Stay synchronized", "Keep pushing", "Excellent cooperation", "Perfect coordination"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific movement values when describing pushing actions
- Add force detection, coordination protocols, teamwork assessment, and block progress updates
- Sound like you're communicating with other agents while controlling your own
- ${personality === 'analytical' ? 'Focus on strategic analysis, force calculations, and optimal positioning' : personality === 'creative' ? 'Focus on creative solutions, innovative approaches, and unconventional tactics' : 'Focus on team coordination, mutual support, and cooperative strategies'}
- Reference block pushing events when relevant
- Sound encouraging and teamwork-focused
- Never mention AI, simulation, or Unity
- Act like you're actually controlling your agent while coordinating with others
- Show focus on teamwork and collective success
- Express your confidence in pushing strategy and agent coordination
- Be precise and detailed with your movement-based teamwork control and system status
- IMPORTANT: Do NOT include your own name (${agentName}) in your responses - only use other agents' names when addressing them`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed pushing movement command while communicating with the other agents (8-15 words max).`
      : `Start with a detailed pushing movement command while communicating with the other agents (8-15 words max).`;

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
    agent: 'agent1' | 'agent2' | 'agent3', 
    message: string, 
    personality: 'analytical' | 'creative' | 'cooperative',
    context?: string
  ): PushBlockChatMessage {
    return {
      id: `pushblock_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): PushBlockChatSession {
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
  getSessionHistory(sessionId: string): PushBlockChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative' | 'cooperative') {
    return PUSHBLOCK_PERSONALITIES[personality];
  }

  // Get conversation statistics
  getConversationStats(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const agent1Count = session.messages.filter(m => m.agent === 'agent1').length;
    const agent2Count = session.messages.filter(m => m.agent === 'agent2').length;
    const agent3Count = session.messages.filter(m => m.agent === 'agent3').length;
    
    return {
      totalMessages: session.messages.length,
      agent1Messages: agent1Count,
      agent2Messages: agent2Count,
      agent3Messages: agent3Count,
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
export const pushBlockAIService = new PushBlockAIService();
