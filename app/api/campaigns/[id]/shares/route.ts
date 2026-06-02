import { NextRequest, NextResponse } from 'next/server';
import type { CreateShareRequest, ShareRecord, ApiResponse } from '@/types/api';

// In-memory storage for shares (in production, this would be a database)
const shareRecords: ShareRecord[] = [];
const shareStats: Record<string, Record<string, number>> = {};

/**
 * POST /api/campaigns/[id]/shares
 * Records a share event for a campaign
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignId = params.id;
    const body = (await request.json()) as CreateShareRequest;

    if (!body.platform || !['twitter', 'linkedin', 'whatsapp', 'copy'].includes(body.platform)) {
      return NextResponse.json(
        { message: 'Invalid platform' },
        { status: 400 }
      );
    }

    // Create share record
    const shareRecord: ShareRecord = {
      id: `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      campaignId,
      platform: body.platform,
      createdAt: new Date().toISOString(),
    };

    // Store in memory (would be DB in production)
    shareRecords.push(shareRecord);

    // Update share stats
    if (!shareStats[campaignId]) {
      shareStats[campaignId] = {
        twitter: 0,
        linkedin: 0,
        whatsapp: 0,
        copy: 0,
      };
    }
    shareStats[campaignId][body.platform]++;

    return NextResponse.json<ApiResponse<ShareRecord>>(
      {
        data: shareRecord,
        status: 201,
        message: 'Share recorded successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording share:', error);
    return NextResponse.json(
      { message: 'Failed to record share' },
      { status: 500 }
    );
  }
}
