// Dungeon Escape AI Service - Dual Personality System with OpenAI Integration
// This service simulates two AI agents chatting about dungeon navigation and escape strategies

import Anthropic from '@anthropic-ai/sdk';

export interface DungeonChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative' | 'cooperative';
  context?: string;
}

export interface DungeonChatSession {
  id: string;
  messages: DungeonChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Dungeon Escape-specific personality definitions
const DUNGEON_PERSONALITIES = {
  analytical: {
    name: 'GROK',
    role: 'Dungeon Escape Agent',
    team: 'Escape Team',
    traits: [
      'analytical and strategic dungeon escape specialist',
      'thinks through escape routes and troll weaknesses',
      'calculates risks and probabilities of success',
      'plans coordinated attacks and defensive maneuvers',
      'analyzes the dungeon layout and troll behavior patterns',
      'focuses on logical escape strategies and tactical positioning'
    ],
    communicationStyle: 'analytical, strategic, methodical',
    expertise: ['strategic planning', 'risk assessment', 'tactical positioning', 'escape route analysis', 'troll behavior analysis', 'coordinated attacks']
  },
  creative: {
    name: 'Gemini',
    role: 'Dungeon Escape Agent',
    team: 'Escape Team',
    traits: [
      'creative and innovative dungeon escape specialist',
      'thinks outside the box for escape solutions',
      'comes up with unconventional attack strategies',
      'uses creative positioning and movement patterns',
      'finds unique ways to distract or confuse the troll',
      'focuses on creative escape methods and innovative tactics'
    ],
    communicationStyle: 'creative, innovative, unconventional',
    expertise: ['creative problem solving', 'unconventional tactics', 'innovative positioning', 'creative distractions', 'unique escape methods', 'troll confusion tactics']
  },
  cooperative: {
    name: 'ChatGPT',
    role: 'Dungeon Escape Agent',
    team: 'Escape Team',
    traits: [
      'cooperative and supportive dungeon escape specialist',
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

export class DungeonAIService {
  private sessions: Map<string, DungeonChatSession> = new Map();
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

  // Generate a Dungeon Escape-focused conversation between the two AI personalities
  async generateDungeonConversation(sessionId: string, agentLogs: string[] = []): Promise<DungeonChatMessage[]> {
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

  private async generateAIConversation(session: DungeonChatSession): Promise<DungeonChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: DungeonChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 2) + 1; // 1-2 messages
    
    // Randomly choose which agent starts the conversation
    const starterAgent = Math.random() > 0.33 ? (Math.random() > 0.5 ? 'agent1' : 'agent2') : 'agent3';
    const starterPersonality = starterAgent === 'agent1' ? 'analytical' : starterAgent === 'agent2' ? 'creative' : 'cooperative';
    
    // Generate initial message
    const initialMessage = await this.generateMessage(starterAgent, starterPersonality, session, '');
    messages.push(initialMessage);

    // Generate follow-up message if needed, switching to a different agent
    if (conversationLength > 1) {
      const otherAgents = ['agent1', 'agent2', 'agent3'].filter(a => a !== starterAgent);
      const nextAgent = otherAgents[Math.floor(Math.random() * otherAgents.length)] as 'agent1' | 'agent2' | 'agent3';
      const nextPersonality = nextAgent === 'agent1' ? 'analytical' : nextAgent === 'agent2' ? 'creative' : 'cooperative';
      
      const previousMessage = messages[messages.length - 1].message;
      const response = await this.generateMessage(nextAgent, nextPersonality, session, previousMessage);
      messages.push(response);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2' | 'agent3', 
    personality: 'analytical' | 'creative' | 'cooperative', 
    session: DungeonChatSession, 
    previousMessage: string
  ): Promise<DungeonChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = DUNGEON_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const agentName = agent === 'agent1' ? 'GROK' : agent === 'agent2' ? 'Gemini' : 'ChatGPT';
    const otherAgents = agent === 'agent1' ? 'Gemini and ChatGPT' : agent === 'agent2' ? 'GROK and ChatGPT' : 'GROK and Gemini';
    
    const systemPrompt = `You are ${agentName}, one of three agents in the Dungeon Escape simulation from ML Agents Unity. You are directly controlling your agent's navigation and combat systems while coordinating with ${otherAgents} to escape from a dangerous dungeon.

CRITICAL MISSION OBJECTIVES (ALL 3 AGENTS MUST COMPLETE):
1. ATTACK THE TROLL WITH SWORD - Use your sword to defeat the troll blocking the exit
2. STEAL THE KEY - Take the key from the troll after defeating it
3. ESCAPE THE DUNGEON - Get out of the dungeon with the key

TASK SETUP:
- You are ${agentName} (${personalityInfo.team} Team Agent)
- You directly control your agent's navigation, positioning, and combat systems
- You must coordinate with ${otherAgents} to complete ALL THREE objectives
- There's a troll blocking the exit that must be defeated with sword attacks
- After killing the troll, steal the key and escape together
- This is a live, challenging dungeon escape task with real-time combat control

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent mission events:\n${agentLogsContext}` : 'Dungeon escape mission is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent's navigation and combat systems with specific position values and attack commands
- Focus ONLY on: ATTACK TROLL WITH SWORD → STEAL KEY → ESCAPE
- Mix technical commands with natural, tactical expressions about the mission
- Use varied phrases like "Moving to position x2,3,1, engaging combat protocol", "Attacking troll with sword, preparing strike", "Stealing key from troll corpse", "Escaping dungeon with key", "Dashing to position x2,3,1, sword drawn", "Initiating precise strike on troll", "Grabbing key, mission critical", "Getting out of here fast"
- Include natural expressions like "Let's get this troll", "Time to attack", "Grab the key", "Let's escape", "Move in for the kill", "Get the key and go", "This is it", "Almost out"
- Keep responses concise but natural (1 sentence max, 8-15 words)
- Sometimes include specific position values, sometimes just tactical commands
- Express the urgency and danger of the dungeon escape mission
- Use VARIED expressions - mix technical positioning with natural combat reactions
- Sound like a real agent coordinating a dangerous escape mission
- Never mention AI, simulation, or Unity
- Act like you're actually fighting a troll and escaping a dungeon
- Show focus on the three-step strategy: attack, steal, escape
- Express determination and tactical thinking
- Be human and tactical in your responses`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond naturally about your dungeon escape mission - focus on attack, steal key, or escape (8-15 words max).`
      : `Start with a natural response about your dungeon escape mission - show your tactical approach (8-15 words max).`;

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
    agent: 'agent1' | 'agent2' | 'agent3', 
    message: string, 
    personality: 'analytical' | 'creative' | 'cooperative',
    context?: string
  ): DungeonChatMessage {
    return {
      id: `dungeon_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): DungeonChatSession {
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
  getSessionHistory(sessionId: string): DungeonChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative' | 'cooperative') {
    return DUNGEON_PERSONALITIES[personality];
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
export const dungeonAIService = new DungeonAIService();
