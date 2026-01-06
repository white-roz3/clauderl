// src/lib/worm-ai-service.ts

export interface WormChatMessage {
  id: string;
  agent: 'Claude';
  message: string;
  timestamp: Date;
  personality: 'analytical' | 'creative';
  context?: string;
}

export interface WormChatRequest {
  message: string;
  sessionId: string;
  context?: {
    currentTask?: string;
    bodySegments?: number;
    obstacles?: string[];
    performance?: {
      length: number;
      speed: number;
      efficiency: number;
    };
  };
}

export interface WormChatResponse {
  message: string;
  sessionId: string;
  suggestions?: {
    strategy?: string;
    optimization?: string;
    nextSteps?: string[];
  };
}

// System prompt for worm AI - return only short, concise responses with position values
const WORM_SYSTEM_PROMPT = `
You are a worm locomotion AI that returns only short, concise responses with position coordinates.
Keep responses to 3-5 words maximum plus position values.
Focus on core actions: wiggling movement, navigating to target point, coordinating body.
Include position coordinates in format: "action to x 1,4,2 y 3,2,4"
NEVER mention obstacles, segments, body parts, or specific numbers beyond coordinates.
NEVER add any additional context or information in parentheses.
Do not provide detailed explanations or technical details.
Examples: "Wiggling forward to x 1,4,2 y 3,2,4", "Navigating to target x 2,5,1 y 4,3,5", "Body coordinated at x 1,3,2 y 2,4,3"
`;

// Mock AI responses for worm simulation - short and concise with position values
const WORM_AI_RESPONSES = [
  "Wiggling forward to x 1,4,2 y 3,2,4",
  "Navigating to target x 2,5,1 y 4,3,5",
  "Body coordinated at x 1,3,2 y 2,4,3",
  "Target reached x 3,2,4 y 1,5,2",
  "Slithering ahead to x 1,4,2 y 3,2,4",
  "Target detected at x 2,3,1 y 4,2,5",
  "Body wiggling to x 1,2,3 y 3,4,1",
  "Path clear to x 2,4,1 y 3,1,4",
  "Worm advancing to x 1,3,2 y 2,4,3",
  "Turning left to x 1,2,3 y 3,4,1",
  "Turning right to x 2,3,1 y 4,2,5",
  "Body undulating at x 1,4,2 y 3,2,4",
  "Speed increased to x 2,5,1 y 4,3,5",
  "Target approaching x 3,2,4 y 1,5,2",
  "Navigation active to x 1,3,2 y 2,4,3",
  "Body synchronized at x 2,4,1 y 3,1,4",
  "Movement optimized to x 1,2,3 y 3,4,1",
  "Path calculated to x 2,3,1 y 4,2,5",
  "Worm progressing to x 1,4,2 y 3,2,4",
  "Locomotion complete at x 3,2,4 y 1,5,2"
];

const WORM_STRATEGIES = [
  "Serpentine movement",
  "Sidewinding motion",
  "Concertina locomotion",
  "Rectilinear crawling",
  "Undulating motion",
  "Body coordination",
  "Target navigation",
  "Path optimization"
];

const WORM_OPTIMIZATIONS = [
  "Increase speed",
  "Reduce friction",
  "Optimize turns",
  "Minimize energy",
  "Improve coordination",
  "Enhance stability",
  "Better targeting",
  "Efficient wiggling"
];

export async function generateWormChatResponse(request: WormChatRequest): Promise<WormChatResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Apply system prompt - focus on core actions, not detailed explanations
  const baseResponse = WORM_AI_RESPONSES[Math.floor(Math.random() * WORM_AI_RESPONSES.length)];
  
  // Keep responses simple and focused on wiggling/navigation - NO obstacle information
  let enhancedResponse = baseResponse;
  
  // Ensure no obstacle information is added to responses
  if (enhancedResponse.includes('obstacle') || enhancedResponse.includes('segment')) {
    enhancedResponse = "Wiggling forward";
  }

  // Generate suggestions
  const strategy = WORM_STRATEGIES[Math.floor(Math.random() * WORM_STRATEGIES.length)];
  const optimization = WORM_OPTIMIZATIONS[Math.floor(Math.random() * WORM_OPTIMIZATIONS.length)];
  
  const nextSteps = [
    "Continue wiggling",
    "Navigate to target",
    "Coordinate body",
    "Optimize path"
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

export async function generateContinuousWormChat(sessionId: string, onMessage: (message: WormChatMessage) => void): Promise<void> {
  const messageCount = 3 + Math.floor(Math.random() * 4); // 3-6 messages
  
  for (let i = 0; i < messageCount; i++) {
    const request: WormChatRequest = {
      message: `Continuous worm locomotion analysis ${i + 1}`,
      sessionId,
      context: {
        currentTask: "Navigate to target point",
        bodySegments: 5 + Math.floor(Math.random() * 10),
        obstacles: [],
        performance: {
          length: 3 + Math.random() * 7,
          speed: 0.5 + Math.random() * 2,
          efficiency: 0.6 + Math.random() * 0.4
        }
      }
    };
    
    const response = await generateWormChatResponse(request);
    
    const message: WormChatMessage = {
      id: `worm_${Date.now()}_${i}`,
      agent: 'Claude',
      message: response.message,
      timestamp: new Date(),
      personality: 'analytical',
      context: 'worm-locomotion'
    };
    
    onMessage(message);
    
    // Wait between messages
    if (i < messageCount - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    }
  }
}

// Service object to match the expected format
export const wormAIService = {
  async generateWormConversation(sessionId: string, agentLogs: string[] = []): Promise<WormChatMessage[]> {
    const messageCount = 1 + Math.floor(Math.random() * 3); // 1-3 messages
    const messages: WormChatMessage[] = [];
    
    // Filter out obstacle-related logs for worm simulation
    const filteredLogs = agentLogs.filter(log => 
      !log.toLowerCase().includes('obstacle') && 
      !log.toLowerCase().includes('segment') &&
      !log.toLowerCase().includes('body part')
    );
    
    for (let i = 0; i < messageCount; i++) {
      const request: WormChatRequest = {
        message: `Worm locomotion analysis ${i + 1}`,
        sessionId,
        context: {
          currentTask: "Navigate to target point",
          bodySegments: 5 + Math.floor(Math.random() * 10),
          obstacles: [],
          performance: {
            length: 3 + Math.random() * 7,
            speed: 0.5 + Math.random() * 2,
            efficiency: 0.6 + Math.random() * 0.4
          }
        }
      };
      
      const response = await generateWormChatResponse(request);
      
      const message: WormChatMessage = {
        id: `worm_${Date.now()}_${i}`,
        agent: 'Claude',
        message: response.message,
        timestamp: new Date(),
        personality: 'analytical',
        context: 'worm-locomotion'
      };
      
      messages.push(message);
    }
    
    return messages;
  }
};
