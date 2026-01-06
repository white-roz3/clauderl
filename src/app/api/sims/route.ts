import { NextRequest, NextResponse } from 'next/server';
import { SIM_CATALOG } from '@/data/sims';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');
    const difficulty = searchParams.get('difficulty');

    let filteredSims = [...SIM_CATALOG];

    // Filter by status
    if (status) {
      filteredSims = filteredSims.filter(sim => sim.status === status);
    }

    // Filter by tag
    if (tag) {
      filteredSims = filteredSims.filter(sim => 
        sim.tags && sim.tags.includes(tag)
      );
    }

    // Filter by difficulty
    if (difficulty) {
      filteredSims = filteredSims.filter(sim => 
        sim.difficulty.includes(difficulty as "medium" | "hard" | "expert")
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredSims,
      total: filteredSims.length,
      filters: {
        status,
        tag,
        difficulty
      }
    });
  } catch (error) {
    console.error('Error fetching simulations:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch simulations' 
      },
      { status: 500 }
    );
  }
}
