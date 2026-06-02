import { apiClient } from './interceptors';
import {
  ApiResponse,
  CreateShareRequest,
  CampaignShareStats,
  ShareRecord,
} from '@/types/api';

export const sharesApi = {
  /**
   * Record a share event for a campaign
   */
  recordShare: async (
    campaignId: string,
    data: CreateShareRequest
  ): Promise<ApiResponse<ShareRecord>> => {
    const response = await apiClient.post<ApiResponse<ShareRecord>>(
      `/campaigns/${campaignId}/shares`,
      data
    );
    return response.data;
  },

  /**
   * Get share statistics for a campaign
   */
  getShareStats: async (campaignId: string): Promise<ApiResponse<CampaignShareStats>> => {
    const response = await apiClient.get<ApiResponse<CampaignShareStats>>(
      `/campaigns/${campaignId}/shares/stats`
    );
    return response.data;
  },

  /**
   * Get total share count for a campaign
   */
  getShareCount: async (campaignId: string): Promise<number> => {
    try {
      const response = await apiClient.get<ApiResponse<CampaignShareStats>>(
        `/campaigns/${campaignId}/shares/stats`
      );
      return response.data.data?.totalShares || 0;
    } catch (error) {
      console.error('Error fetching share count:', error);
      return 0;
    }
  },
};
