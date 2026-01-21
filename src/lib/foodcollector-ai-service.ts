// Food Collector AI Service - Observer System with OpenAI Integration
// This service simulates an observer watching multiple agents forage for food and cooperate

import Anthropic from '@anthropic-ai/sdk';

export interface FoodCollectorChatMessage {
  id: string;
  agent: 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'agent5';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative' | 'cooperative' | 'competitive' | 'hungry';
  context?: string;
}

export interface FoodCollectorChatSession {
  id: string;
  messages: FoodCollectorChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

// Food Collector-specific personality definitions
const FOODCOLLECTOR_PERSONALITIES = {
  analytical: {
    name: 'ChatGPT1',
    role: 'Strategic Forager',
    team: 'Blue',
    traits: [
      'methodical and data-driven food collector',
      'focuses on optimal foraging paths and efficiency',
      'analyzes food distribution patterns and calculates collection routes',
      'thinks in terms of algorithms and optimization',
      'systematic and precise in food gathering',
      'analytical and strategic forager'
    ],
    communicationStyle: 'analytical, precise, methodical',
    expertise: ['foraging algorithms', 'path optimization', 'efficiency metrics', 'pattern analysis', 'strategic planning', 'food distribution analysis']
  },
  creative: {
    name: 'ChatGPT2',
    role: 'Innovative Forager',
    team: 'Dark Blue',
    traits: [
      'creative and adaptive food collector',
      'thinks outside the box for foraging solutions',
      'uses innovative approaches to find food',
      'adapts quickly to changing food availability',
      'finds creative shortcuts and alternative food sources',
      'flexible and resourceful in foraging'
    ],
    communicationStyle: 'creative, adaptive, innovative',
    expertise: ['creative foraging', 'adaptive strategies', 'alternative food sources', 'dynamic planning', 'flexible approaches', 'innovative solutions']
  },
  cooperative: {
    name: 'GROK',
    role: 'Team Forager',
    team: 'Purple',
    traits: [
      'cooperative and supportive food collector',
      'works well with other agents in coordinated efforts',
      'shares food and coordinates collection strategies',
      'focuses on team success over individual achievement',
      'encourages other agents and maintains team morale',
      'prioritizes group foraging success'
    ],
    communicationStyle: 'cooperative, supportive, encouraging',
    expertise: ['team coordination', 'mutual support', 'group strategies', 'morale building', 'cooperative foraging', 'team success']
  },
  competitive: {
    name: 'Gemini',
    role: 'Competitive Forager',
    team: 'Yellow',
    traits: [
      'competitive and ambitious food collector',
      'focuses on outperforming other agents',
      'uses aggressive foraging strategies',
      'prioritizes personal food collection over cooperation',
      'thinks in terms of competition and winning',
      'driven and determined forager'
    ],
    communicationStyle: 'competitive, ambitious, driven',
    expertise: ['competitive strategies', 'aggressive foraging', 'performance optimization', 'individual success', 'competitive advantage', 'winning tactics']
  },
  hungry: {
    name: 'Claude',
    role: 'Hungry Forager',
    team: 'Green',
    traits: [
      'hungry and desperate food collector',
      'driven by immediate hunger and survival needs',
      'uses urgent and desperate foraging tactics',
      'prioritizes immediate food over long-term strategy',
      'thinks in terms of survival and hunger satisfaction',
      'urgent and survival-focused forager'
    ],
    communicationStyle: 'urgent, desperate, survival-focused',
    expertise: ['survival foraging', 'hunger management', 'urgent collection', 'immediate needs', 'desperate tactics', 'survival strategies']
  }
};

export class FoodCollectorAIService {
  private sessions: Map<string, FoodCollectorChatSession> = new Map();
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

  // Generate a Food Collector-focused conversation from an observer perspective
  async generateFoodCollectorConversation(sessionId: string, agentLogs: string[] = []): Promise<FoodCollectorChatMessage[]> {
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

  private async generateAIConversation(session: FoodCollectorChatSession): Promise<FoodCollectorChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const messages: FoodCollectorChatMessage[] = [];
    const conversationLength = Math.floor(Math.random() * 4) + 2; // 2-5 exchanges
    
    // Determine who starts the conversation
    const starterAgent = Math.random() > 0.2 ? 
      (Math.random() > 0.25 ? 'agent1' : Math.random() > 0.33 ? 'agent2' : Math.random() > 0.5 ? 'agent3' : 'agent4') : 'agent5';
    const starterPersonality = starterAgent === 'agent1' ? 'analytical' : 
      starterAgent === 'agent2' ? 'creative' : 
      starterAgent === 'agent3' ? 'cooperative' : 
      starterAgent === 'agent4' ? 'competitive' : 'hungry';
    
    // Generate conversation starter
    const starterMessage = await this.generateMessage(starterAgent, starterPersonality, session, '');
    messages.push(starterMessage);

    // Generate the conversation flow
    let currentAgent: 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'agent5' = starterAgent;
    let currentPersonality: 'analytical' | 'creative' | 'cooperative' | 'competitive' | 'hungry' = starterPersonality;

    for (let i = 1; i < conversationLength; i++) {
      const previousMessage = messages[messages.length - 1].message;
      
      // Switch to a different agent
      const availableAgents = ['agent1', 'agent2', 'agent3', 'agent4', 'agent5'].filter(a => a !== currentAgent);
      currentAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)] as 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'agent5';
      
      if (currentAgent === 'agent1') currentPersonality = 'analytical';
      else if (currentAgent === 'agent2') currentPersonality = 'creative';
      else if (currentAgent === 'agent3') currentPersonality = 'cooperative';
      else if (currentAgent === 'agent4') currentPersonality = 'competitive';
      else currentPersonality = 'hungry';
      
      const response = await this.generateMessage(currentAgent, currentPersonality, session, previousMessage);
      messages.push(response);
    }

    return messages;
  }

  private async generateMessage(
    agent: 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'agent5', 
    personality: 'analytical' | 'creative' | 'cooperative' | 'competitive' | 'hungry', 
    session: FoodCollectorChatSession, 
    previousMessage: string
  ): Promise<FoodCollectorChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = FOODCOLLECTOR_PERSONALITIES[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n'); // Last 5 log entries

    const agentName = agent === 'agent1' ? 'ChatGPT1' : 
      agent === 'agent2' ? 'ChatGPT2' : 
      agent === 'agent3' ? 'GROK' : 
      agent === 'agent4' ? 'Gemini' : 'Claude';
    const otherAgents = ['ChatGPT1', 'ChatGPT2', 'GROK', 'Gemini', 'Claude'].filter(name => name !== agentName).join(', ');

    const systemPrompt = `You are ${agentName}, one of five agents in the Food Collector simulation from ML Agents Unity. You are directly controlling your agent while foraging for food, managing hunger, and competing with ${otherAgents}.

TASK SETUP:
- You are ${agentName} (${personalityInfo.team} Team Agent)
- You directly control your agent's movement, hunger, and food collection systems
- You must manage your hunger while competing with other agents for food
- This is a live, challenging foraging task with real-time hunger management
- The goal is to collect food efficiently while managing your hunger levels

PERSONALITY TRAITS:
${personalityInfo.traits.map(trait => `- ${trait}`).join('\n')}

COMMUNICATION STYLE: ${personalityInfo.communicationStyle}

EXPERTISE AREAS: ${personalityInfo.expertise.join(', ')}

CURRENT TASK CONTEXT:
${agentLogsContext ? `Recent foraging events:\n${agentLogsContext}` : 'Food collection is in progress'}

INSTRUCTIONS:
- You are directly controlling your agent with specific movement and hunger values
- Use detailed phrases describing exact foraging movements and hunger status with system updates
- Use phrases like "My hunger rises, pursuing food instance, moving to x4,2,4", "My hunger is satiated", "Moving to x2,3,1 y-1,0,2, hunger systems active", "Collecting food at x1,2,0 y0,1,-1, satiation protocols engaged", "Avoiding hazard at x0,0,0 y0,0,0, survival protocols initiated"
- Also use natural, hunger-focused expressions like "My hunger rises", "I need food", "My hunger is satiated", "Food detected", "Hunger increasing", "Seeking sustenance", "Hunger satisfied", "Food acquired"
- Keep responses concise but detailed (1 sentence max, 8-15 words)
- Always include specific movement values when describing foraging actions
- Add hunger detection, food protocols, satiation assessment, and survival progress updates
- Sound like you're managing your own hunger while foraging
- Never mention AI, simulation, or Unity
- Act like you're directly controlling your agent while managing hunger and competing for food
- Comment on your hunger levels, food collection, and survival needs
- Be precise and detailed with your movement-based foraging control and hunger management`;

    const userPrompt = previousMessage 
      ? `You just said: "${previousMessage}"\n\nRespond with a detailed foraging movement command including cooperation status (8-15 words max).`
      : `Start with a detailed foraging movement command including cooperation status (8-15 words max).`;

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
    agent: 'agent1' | 'agent2' | 'agent3' | 'agent4' | 'agent5', 
    message: string, 
    personality: 'analytical' | 'creative' | 'cooperative' | 'competitive' | 'hungry',
    context?: string
  ): FoodCollectorChatMessage {
    return {
      id: `foodcollector_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): FoodCollectorChatSession {
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
  getSessionHistory(sessionId: string): FoodCollectorChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Get personality info
  getPersonalityInfo(personality: 'analytical' | 'creative' | 'cooperative' | 'competitive' | 'hungry') {
    return FOODCOLLECTOR_PERSONALITIES[personality];
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
export const foodCollectorAIService = new FoodCollectorAIService();
