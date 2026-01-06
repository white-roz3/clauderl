// src/lib/sorter-ai-service.ts

export interface SorterChatMessage {
  id: string;
  agent: 'agent1' | 'agent2';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface SorterChatRequest {
  message: string;
  sessionId: string;
  context?: {
    currentSortingTask?: string;
    categories?: string[];
    items?: string[];
    performance?: {
      accuracy: number;
      speed: number;
      efficiency: number;
    };
  };
}

export interface SorterChatResponse {
  message: string;
  sessionId: string;
  suggestions?: {
    strategy?: string;
    optimization?: string;
    nextSteps?: string[];
  };
}

// System prompt for classifier AI - return only short, concise responses
const SORTER_SYSTEM_PROMPT = `
You are a classifier AI that returns only short, concise responses.
Keep responses to 3-5 words maximum.
Focus on core actions: calculating order, order calculated, navigating agent.
Do not provide detailed explanations or technical details.
Examples: "Calculating order", "Order calculated", "Navigating agent", "Sort complete"
`;

// Mock AI responses for classifier - short and concise
const SORTER_AI_RESPONSES = [
  "Calculating order",
  "Order calculated",
  "Navigating agent",
  "Sort complete",
  "Processing data",
  "Order verified",
  "Agent moving",
  "Task complete",
  "Calculating sequence",
  "Sequence ready",
  "Agent positioned",
  "Order confirmed",
  "Processing complete",
  "Navigation ready",
  "Calculating path",
  "Path calculated",
  "Agent navigating",
  "Mission complete",
  "Order processing",
  "Processing finished"
];

const SORTER_STRATEGIES = [
  "Quick sort",
  "Merge sort",
  "Bubble sort",
  "Insertion sort",
  "Heap sort",
  "Radix sort",
  "Counting sort",
  "Hybrid approach"
];

const SORTER_OPTIMIZATIONS = [
  "Reduce comparisons",
  "Minimize memory",
  "Optimize pivot",
  "Adaptive sorting",
  "Parallel processing",
  "Cache optimization",
  "Early termination",
  "Efficient algorithms"
];

export async function generateSorterChatResponse(request: SorterChatRequest): Promise<SorterChatResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Apply system prompt - focus on algorithm process, not specific numbers
  const baseResponse = SORTER_AI_RESPONSES[Math.floor(Math.random() * SORTER_AI_RESPONSES.length)];
  
  // Add context-specific information if available
  let enhancedResponse = baseResponse;
  
  if (request.context?.performance) {
    const { accuracy, speed, efficiency } = request.context.performance;
    enhancedResponse += ` Current metrics: ${(accuracy * 100).toFixed(1)}% accuracy, ${speed.toFixed(2)}s avg speed, ${(efficiency * 100).toFixed(1)}% efficiency.`;
  }
  
  if (request.context?.categories && request.context.categories.length > 0) {
    enhancedResponse += ` Working with ${request.context.categories.length} number ranges: ${request.context.categories.slice(0, 3).join(', ')}${request.context.categories.length > 3 ? '...' : ''}.`;
  }
  
  if (request.context?.items && request.context.items.length > 0) {
    enhancedResponse += ` Processing ${request.context.items.length} numbers for sorting.`;
  }

  // Generate suggestions
  const strategy = SORTER_STRATEGIES[Math.floor(Math.random() * SORTER_STRATEGIES.length)];
  const optimization = SORTER_OPTIMIZATIONS[Math.floor(Math.random() * SORTER_OPTIMIZATIONS.length)];
  
  const nextSteps = [
    "Continue number sorting process",
    "Monitor comparison count and swap operations",
    "Optimize sorting algorithm selection",
    "Validate final sorted sequence"
  ];

  return {
    message: enhancedResponse,
    sessionId: request.sessionId,
    suggestions: {
      strategy,
      optimization,
      nextSteps: nextSteps.slice(0, 2 + Math.floor(Math.random() * 2))
    }
  };
}

export async function generateContinuousSorterChat(sessionId: string, onMessage: (message: SorterChatMessage) => void): Promise<void> {
  const messageCount = 3 + Math.floor(Math.random() * 4); // 3-6 messages
  
  for (let i = 0; i < messageCount; i++) {
    const request: SorterChatRequest = {
      message: `Continuous number sorting analysis ${i + 1}`,
      sessionId,
      context: {
        currentSortingTask: "Ascending number order (0-99)",
        categories: ["0-24", "25-49", "50-74", "75-99"],
        items: Array.from({ length: 10 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 100).toString()),
        performance: {
          accuracy: 0.7 + Math.random() * 0.3,
          speed: 0.5 + Math.random() * 2,
          efficiency: 0.6 + Math.random() * 0.4
        }
      }
    };
    
    const response = await generateSorterChatResponse(request);
    
    const message: SorterChatMessage = {
      id: `sorter_${Date.now()}_${i}`,
      agent: 'agent1',
      message: response.message,
      timestamp: new Date(),
      personality: 'analytical',
      context: 'number-sorting'
    };
    
    onMessage(message);
    
    // Wait between messages
    if (i < messageCount - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    }
  }
}

// Service object to match the expected format
export const sorterAIService = {
  async generateSorterConversation(sessionId: string, agentLogs: string[] = []): Promise<SorterChatMessage[]> {
    const messageCount = 1 + Math.floor(Math.random() * 3); // 1-3 messages
    const messages: SorterChatMessage[] = [];
    
    for (let i = 0; i < messageCount; i++) {
      const request: SorterChatRequest = {
        message: `Number sorting analysis ${i + 1}`,
        sessionId,
        context: {
          currentSortingTask: "Ascending number order (0-99)",
          categories: ["0-24", "25-49", "50-74", "75-99"],
          items: Array.from({ length: 10 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 100).toString()),
          performance: {
            accuracy: 0.7 + Math.random() * 0.3,
            speed: 0.5 + Math.random() * 2,
            efficiency: 0.6 + Math.random() * 0.4
          }
        }
      };
      
      const response = await generateSorterChatResponse(request);
      
      const message: SorterChatMessage = {
        id: `sorter_${Date.now()}_${i}`,
        agent: 'agent1',
        message: response.message,
        timestamp: new Date(),
        personality: 'analytical',
        context: 'number-sorting'
      };
      
      messages.push(message);
    }
    
    return messages;
  }
};
