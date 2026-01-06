import { NextRequest, NextResponse } from 'next/server';
import { wormAIService } from '@/lib/worm-ai-service';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, agentLogs } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log('Generating worm AI conversation for session:', sessionId);
    console.log('Agent logs provided:', agentLogs?.length || 0, 'entries');

    const messages = await wormAIService.generateWormConversation(
      sessionId,
      agentLogs || []
    );

    console.log('Generated worm AI messages:', messages.length);

    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Worm AI chat API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Worm AI Chat API is running',
    status: 'active',
    capabilities: [
      'Snake-like locomotion analysis',
      'Body coordination monitoring',
      'Target navigation tracking',
      'Navigation optimization'
    ]
  });
}
