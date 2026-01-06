import { NextRequest, NextResponse } from 'next/server';
import { sorterAIService } from '@/lib/sorter-ai-service';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, agentLogs } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      );
    }

    console.log('Generating sorter AI conversation for session:', sessionId);
    console.log('Agent logs provided:', agentLogs?.length || 0, 'entries');

    const messages = await sorterAIService.generateSorterConversation(
      sessionId,
      agentLogs || []
    );

    console.log('Generated sorter AI messages:', messages.length);

    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Sorter AI chat API error:', error);
    
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
    message: 'Sorter AI Chat API is running',
    status: 'active',
    capabilities: [
      'Multi-criteria sorting analysis',
      'Classification optimization',
      'Organizational efficiency monitoring',
      'Decision-making enhancement'
    ]
  });
}
