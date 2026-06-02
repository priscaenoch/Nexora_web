'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Edit, Eye, EyeOff } from 'lucide-react';

interface CampaignReviewFormProps {
  formData: Record<string, unknown>;
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isPreviewMode?: boolean;
  onTogglePreview?: () => void;
}

interface SectionProps {
  title: string;
  stepIndex: number;
  onEdit: (stepIndex: number) => void;
  children: React.ReactNode;
}

const ReviewSection: React.FC<SectionProps> = ({
  title,
  stepIndex,
  onEdit,
  children,
}) => (
  <div className="border-b pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(stepIndex)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Edit className="w-4 h-4" />
        Edit
      </button>
    </div>
    {children}
  </div>
);

export const CampaignReviewForm: React.FC<CampaignReviewFormProps> = ({
  formData,
  onEdit,
  onSubmit,
  onBack,
  isPreviewMode = false,
  onTogglePreview,
}) => {
  const basicInfo = {
    title: (formData.title as string) || 'N/A',
    category: (formData.category as string) || 'N/A',
    description: (formData.description as string) || 'N/A',
    location: (formData.location as string) || 'N/A',
  };

  const fundingConfig = {
    goalAmount: (formData.goalAmount as number) || 0,
    acceptedAssets: ((formData.acceptedAssets as string[]) || []).join(', '),
    campaignDuration: (formData.campaignDuration as number) || 0,
    minimumDonation: (formData.minimumDonation as number) || 0,
    network: (formData.network as string) || 'Mainnet',
  };

  const details = (formData.details as Record<string, unknown>) || {};

  return (
    <div className="space-y-8">
      {/* Header with Preview Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Your Campaign</h2>
          <p className="text-gray-500 mt-1">
            Check all details before deployment. You can edit any section.
          </p>
        </div>
        {onTogglePreview && (
          <button
            type="button"
            onClick={onTogglePreview}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Show Preview
              </>
            )}
          </button>
        )}
      </div>

      {/* Summary Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        {/* Basic Information Section */}
        <ReviewSection
          title="Campaign Basics"
          stepIndex={0}
          onEdit={onEdit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Title</p>
              <p className="text-gray-900 font-semibold">{basicInfo.title}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Category</p>
              <p className="text-gray-900 font-semibold capitalize">{basicInfo.category}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
              <p className="text-gray-900 whitespace-pre-wrap">{basicInfo.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Target Location</p>
              <p className="text-gray-900 font-semibold">{basicInfo.location}</p>
            </div>
          </div>
        </ReviewSection>

        {/* Funding Configuration Section */}
        <ReviewSection
          title="Funding Configuration"
          stepIndex={2}
          onEdit={onEdit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Goal Amount</p>
              <p className="text-gray-900 font-semibold text-lg">
                {fundingConfig.goalAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Accepted Assets</p>
              <div className="flex gap-2 flex-wrap">
                {(formData.acceptedAssets as string[])?.map((asset) => (
                  <span
                    key={asset}
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Campaign Duration</p>
              <p className="text-gray-900 font-semibold">{fundingConfig.campaignDuration} days</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Blockchain Network</p>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                {fundingConfig.network}
              </div>
            </div>
            {fundingConfig.minimumDonation > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Minimum Donation</p>
                <p className="text-gray-900 font-semibold">
                  {fundingConfig.minimumDonation}
                </p>
              </div>
            )}
          </div>
        </ReviewSection>

        {/* Details Section (if available) */}
        {Object.keys(details).length > 0 && (
          <ReviewSection
            title="Project Details"
            stepIndex={1}
            onEdit={onEdit}
          >
            <div className="space-y-3">
              {Object.entries(details).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm font-medium text-gray-500 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-gray-900">{String(value)}</p>
                </div>
              ))}
            </div>
          </ReviewSection>
        )}

        {/* Summary Stats */}
        <div className="mt-8 pt-8 border-t">
          <h4 className="font-semibold text-gray-900 mb-4">Campaign Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 font-medium mb-1">Funding Goal</p>
              <p className="text-lg font-bold text-blue-600">
                {fundingConfig.goalAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 font-medium mb-1">Active Period</p>
              <p className="text-lg font-bold text-green-600">
                {fundingConfig.campaignDuration}d
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 font-medium mb-1">Assets Accepted</p>
              <p className="text-lg font-bold text-purple-600">
                {(formData.acceptedAssets as string[])?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4 pt-6 border-t">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          Back
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          ✓ Deploy Campaign
        </Button>
      </div>
    </div>
  );
};
