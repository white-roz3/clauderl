import { NextRequest, NextResponse } from 'next/server';
import { getSimById, CourseId } from '@/data/sims';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Simulation ID is required' 
        },
        { status: 400 }
      );
    }

    const sim = getSimById(id as CourseId);
    
    if (!sim) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Simulation not found' 
        },
        { status: 404 }
      );
    }

    // Generate mock latest metrics
    const mockMetrics = {
      time_ms: Math.floor(Math.random() * 100000) + 10000,
      success_rate: Math.random() * 0.8 + 0.2,
      attempts: Math.floor(Math.random() * 50) + 10,
      last_run: new Date().toISOString(),
      model_leader: ['ChatGPT', 'Claude', 'Grok', 'Gemini'][Math.floor(Math.random() * 4)]
    };

    return NextResponse.json({
      success: true,
      data: {
        ...sim,
        latest_metrics: mockMetrics
      }
    });
  } catch (error) {
    console.error('Error fetching simulation:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch simulation' 
      },
      { status: 500 }
    );
  }
}
