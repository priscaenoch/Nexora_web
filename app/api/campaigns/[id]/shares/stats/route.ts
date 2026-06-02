import { NextRequest, NextResponse } from 'next/server';
import type { CampaignShareStats, ApiResponse } from '@/types/api';

// Shared storage reference (would be from database in production)
// For demo, we'll store stats in-memory
const shareStats: Record<string, Record<string, number>> = {};

/**
 * GET /api/campaigns/[id]/shares/stats
 * Gets share statistics for a campaign
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignId = params.id;

    // Get stats for this campaign or return defaults
    const stats = shareStats[campaignId] || {
      twitter: 0,
      linkedin: 0,
      whatsapp: 0,
      copy: 0,
    };

    const totalShares = Object.values(stats).reduce((sum, count) => sum + count, 0);

    const response: CampaignShareStats = {
      campaignId,
      totalShares,
      shares: stats,
    };

    return NextResponse.json<ApiResponse<CampaignShareStats>>(
      {
        data: response,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching share stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch share stats' },
      { status: 500 }
    );
  }
}
