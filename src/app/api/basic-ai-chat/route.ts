import { NextRequest, NextResponse } from 'next/server';
import { basicAIService } from '@/lib/basic-ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, agentLogs = [] } = body;

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        error: 'Session ID is required'
      }, { status: 400 });
    }

    const messages = await basicAIService.generateBasicConversation(sessionId, agentLogs);
    return NextResponse.json({
      success: true,
      messages,
      sessionId,
      openaiAvailable: basicAIService.isOpenAIAvailable()
    });

  } catch (error) {
    console.error('Basic AI Chat API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId') || 'default';
    const action = searchParams.get('action') || 'history';

    switch (action) {
      case 'history':
        const history = basicAIService.getSessionHistory(sessionId);
        return NextResponse.json({ success: true, messages: history, sessionId });

      case 'clear':
        basicAIService.clearSession(sessionId);
        return NextResponse.json({ success: true, message: 'Session cleared', sessionId });

      case 'status':
        return NextResponse.json({ success: true, openaiAvailable: basicAIService.isOpenAIAvailable() });

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Basic AI Chat API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
