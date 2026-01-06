import { NextRequest, NextResponse } from 'next/server';
import leaderboardData from '@/data/leaderboard.json';
import { LeaderboardResponse, LeaderboardEntry } from '@/data/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const model = searchParams.get('model');
    const course = searchParams.get('course');
    const sortBy = searchParams.get('sortBy') || 'rank';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredEntries = [...leaderboardData.entries];

    // Apply filters
    if (model) {
      filteredEntries = filteredEntries.filter(entry => 
        entry.model.toLowerCase() === model.toLowerCase()
      );
    }

    if (course) {
      filteredEntries = filteredEntries.filter(entry => 
        entry.course.toLowerCase().includes(course.toLowerCase())
      );
    }

    // Apply sorting
    filteredEntries.sort((a, b) => {
      let aValue = a[sortBy as keyof LeaderboardEntry];
      let bValue = b[sortBy as keyof LeaderboardEntry];

      // Handle array values (like abilitiesUnlocked)
      if (Array.isArray(aValue)) aValue = aValue.length;
      if (Array.isArray(bValue)) bValue = bValue.length;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    // Apply pagination
    const paginatedEntries = filteredEntries.slice(offset, offset + limit);

    // Update ranks for filtered results
    const entriesWithUpdatedRanks = paginatedEntries.map((entry, index) => ({
      ...entry,
      rank: offset + index + 1
    }));

    const response: LeaderboardResponse = {
      entries: entriesWithUpdatedRanks,
      total: filteredEntries.length
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('Leaderboard API error:', error);
    
    return NextResponse.json(
      {
        error: {
          message: 'Failed to fetch leaderboard data',
          code: 'LEADERBOARD_ERROR',
          status: 500
        }
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}