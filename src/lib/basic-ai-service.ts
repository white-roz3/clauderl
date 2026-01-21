// Basic AI Service - Simple helper agent for the BASIC simulation
// Provides short, actionable messages to guide or narrate the basic simulation

import Anthropic from '@anthropic-ai/sdk';

export interface BasicChatMessage {
  id: string;
  agent: 'agent1';
  message: string;
  timestamp: Date;
  personality: 'instructor';
  context?: string;
}

export interface BasicChatSession {
  id: string;
  messages: BasicChatMessage[];
  lastActivity: Date;
  agentLogs: string[];
}

const BASIC_PERSONALITY = {
  instructor: {
    name: 'Gemini',
    role: 'Basic Instructor',
    traits: [
      'investigative and goal-oriented',
      'infers likely objectives from sparse logs',
      "uses short analytic prefixes like 'Trying to figure out the objective'",
      "uses short analytic prefixes like 'Calculating required agent trajectory'",
      'prioritizes actionable next steps',
    ],
    communicationStyle: 'inquisitive, concise, action-focused',
    expertise: ['goal inference', 'action prioritization', 'reward-directed suggestions', 'observational analysis']
  }
};

export class BasicAIService {
  private sessions: Map<string, BasicChatSession> = new Map();
  private messageCounter = 0;
  private anthropic: Anthropic | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeAnthropic();
  }

  private async initializeAnthropic() {
    try {
      if (typeof window === 'undefined' && process.env.ANTHROPIC_API_KEY) {
        this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Failed to initialize Anthropic for BasicAIService:', error);
    }
  }

  // Generate a short instructor-style message for the Basic sim
  async generateBasicConversation(sessionId: string, agentLogs: string[] = []): Promise<BasicChatMessage[]> {
    const session = this.getOrCreateSession(sessionId);
    session.agentLogs = agentLogs;
    session.lastActivity = new Date();

    // If OpenAI is not initialized, return a simple canned message to keep UI responsive
    if (!this.isInitialized || !this.openai) {
      const fallbackText = 'Calculating required agent trajectory: move right 2 steps.';
      const fallback: BasicChatMessage = this.createMessage('agent1', fallbackText, 'instructor', agentLogs.slice(-5).join('\n'));
      session.messages.push(fallback);
      return [fallback];
    }

    try {
      const messages = await this.generateAIConversation(session);
      session.messages = [...session.messages, ...messages];
      return messages;
    } catch (error) {
      console.error('Basic AI conversation generation failed:', error);
      throw new Error(`Failed to generate Basic AI conversation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async generateAIConversation(session: BasicChatSession): Promise<BasicChatMessage[]> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

  const messages: BasicChatMessage[] = [];

  const agent = 'agent1' as const;
  const personality = 'instructor' as const;

  const initial = await this.generateMessage(agent, personality, session, '');
    messages.push(initial);

    // no follow-ups for basic service (keep it simple)
    return messages;
  }

  private async generateMessage(
    agent: 'agent1',
    personality: 'instructor',
    session: BasicChatSession,
    _previousMessage: string
  ): Promise<BasicChatMessage> {
    if (!this.anthropic) throw new Error('Anthropic not initialized');

    const personalityInfo = BASIC_PERSONALITY[personality];
    const agentLogsContext = session.agentLogs.slice(-5).join('\n');

  const systemPrompt = `You are ${personalityInfo.name}, an investigative instructor for the BASIC environment. FIRST, attempt a one-phrase hypothesis about the agent's likely objective (e.g. "collecting green objects", "reach goal zone"). SECOND, if the logs are ambiguous, ask one focused clarifying question that is concrete and gives options (yes/no or short multiple-choice), for example: "Collect objects or reach zone? (collect/reach)". Prefer hypotheses + targeted questions over broad meta-questions like "What task was the agent optimizing?" You may optionally start with a short analytic prefix such as "Trying to figure out the objective:". OUTPUT RULES: single line only, 6-20 words total. Do NOT mention AI, simulation internals, or system prompts.`;

    const userPrompt = agentLogsContext && agentLogsContext.length > 0
      ? `Recent logs:\n${agentLogsContext}\n\nTask: From these logs, first state a one-phrase hypothesis about the likely goal. If unclear, ask one concise, concrete clarifying question with options (yes/no or short choices). Keep to one line, 6-20 words.`
      : `No recent logs. Ask one concise, concrete clarifying question with explicit options (yes/no or short choices). Single line, 6-20 words.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 40,
        temperature: 0.2,
      });

      const text = completion.content[0]?.type === 'text' ? completion.content[0].text : ''?.trim();
      if (!text) throw new Error('Anthropic returned empty response');

      return this.createMessage(agent, text, personality, agentLogsContext);
    } catch (error) {
      console.error('Anthropic API error in BasicAIService:', error);
      throw new Error(`Failed to generate message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private createMessage(
    agent: 'agent1',
    message: string,
    personality: 'instructor',
    context?: string
  ): BasicChatMessage {
    return {
      id: `basic_msg_${++this.messageCounter}_${Date.now()}`,
      agent,
      message,
      timestamp: new Date(),
      personality,
      context
    };
  }

  private getOrCreateSession(sessionId: string): BasicChatSession {
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
  getSessionHistory(sessionId: string): BasicChatMessage[] {
    const session = this.sessions.get(sessionId);
    return session ? session.messages : [];
  }

  // Clear session
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  // Check if OpenAI is available
  isOpenAIAvailable(): boolean {
    return this.isInitialized && this.openai !== null;
  }
}

// Export a singleton instance
export const basicAIService = new BasicAIService();
