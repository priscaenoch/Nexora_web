'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '@/components/ui';
import { ArrowLeft, HelpCircle, Check } from 'lucide-react';

const ASSET_OPTIONS = ['XLM', 'USDC', 'AQUA'] as const;
const DURATION_PRESETS = [7, 14, 30, 60, 90] as const;
const NETWORKS = ['Testnet', 'Mainnet'] as const;

const schema = z.object({
  goalAmount: z
    .number()
    .positive('Goal amount must be greater than 0')
    .min(1, 'Goal amount must be at least 1'),
  acceptedAssets: z
    .array(z.enum(ASSET_OPTIONS))
    .min(1, 'Select at least one asset'),
  campaignDuration: z
    .number()
    .positive('Duration must be greater than 0')
    .max(365, 'Duration cannot exceed 365 days'),
  isCustomDuration: z.boolean().optional(),
  minimumDonation: z
    .number()
    .positive('Minimum donation must be greater than 0')
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: 'Minimum donation must be greater than 0',
    }),
  network: z.enum(NETWORKS),
});

type FundingConfigData = z.infer<typeof schema>;

interface FundingConfigFormProps {
  initialData?: Partial<FundingConfigData>;
  onNext: (data: FundingConfigData) => void;
  onBack: () => void;
}

export const FundingConfigForm: React.FC<FundingConfigFormProps> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [isCustomDuration, setIsCustomDuration] = useState(
    initialData?.isCustomDuration ?? false
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FundingConfigData>({
    resolver: zodResolver(schema),
    defaultValues: {
      goalAmount: initialData?.goalAmount,
      acceptedAssets: initialData?.acceptedAssets ?? ['XLM'],
      campaignDuration: initialData?.campaignDuration ?? 30,
      isCustomDuration: initialData?.isCustomDuration ?? false,
      minimumDonation: initialData?.minimumDonation,
      network: initialData?.network ?? 'Mainnet',
    },
    mode: 'onChange',
  });

  const acceptedAssets = watch('acceptedAssets');
  const campaignDuration = watch('campaignDuration');
  const network = watch('network');

  const toggleAsset = (asset: typeof ASSET_OPTIONS[number]) => {
    const current = acceptedAssets || [];
    if (current.includes(asset)) {
      // Don't allow unchecking if it's the last one
      if (current.length > 1) {
        setValue('acceptedAssets', current.filter((a) => a !== asset));
      }
    } else {
      setValue('acceptedAssets', [...current, asset]);
    }
  };

  const handleDurationPreset = (duration: typeof DURATION_PRESETS[number]) => {
    setIsCustomDuration(false);
    setValue('isCustomDuration', false);
    setValue('campaignDuration', duration);
  };

  const handleNetworkToggle = (selectedNetwork: typeof NETWORKS[number]) => {
    setValue('network', selectedNetwork);
  };

  const onValidSubmit = (data: FundingConfigData) => onNext(data);

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Goal Amount */}
        <div className="relative">
          <Input
            label="Fundraising Goal Amount"
            type="number"
            {...register('goalAmount', { valueAsNumber: true })}
            placeholder="e.g. 50000"
            error={errors.goalAmount?.message}
            inputState={errors.goalAmount ? 'error' : 'default'}
            required
            helperText="The total amount you want to raise in your selected asset"
          />
        </div>

        {/* Accepted Assets */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Accepted Assets <span className="text-red-500">*</span>
            </label>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" aria-label="Donors can contribute in any of these assets" />
          </div>
          <div className="space-y-2">
            {ASSET_OPTIONS.map((asset) => (
              <label
                key={asset}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={(acceptedAssets || []).includes(asset)}
                  onChange={() => toggleAsset(asset)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-gray-900">{asset}</span>
                  <p className="text-xs text-gray-500">
                    {asset === 'XLM' && 'Stellar Lumens - native asset'}
                    {asset === 'USDC' && 'USD Coin - stablecoin'}
                    {asset === 'AQUA' && 'Aquarius Protocol token'}
                  </p>
                </div>
                {(acceptedAssets || []).includes(asset) && (
                  <Check className="w-4 h-4 text-blue-600 ml-auto" />
                )}
              </label>
            ))}
          </div>
          {errors.acceptedAssets && (
            <p className="mt-2 text-sm text-red-600">{errors.acceptedAssets.message}</p>
          )}
        </div>

        {/* Campaign Duration */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Campaign Duration <span className="text-red-500">*</span>
            </label>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" aria-label="How long the campaign will remain active" />
          </div>

          {/* Preset durations */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {DURATION_PRESETS.map((duration) => (
              <button
                key={duration}
                type="button"
                onClick={() => handleDurationPreset(duration)}
                className={`py-2 px-2 text-sm font-medium rounded-lg border transition-all ${
                  !isCustomDuration && campaignDuration === duration
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {duration}d
              </button>
            ))}
          </div>

          {/* Custom duration toggle */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={isCustomDuration}
              onChange={(e) => {
                setIsCustomDuration(e.target.checked);
                setValue('isCustomDuration', e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">Custom duration</label>
          </div>

          {/* Custom duration input */}
          {isCustomDuration && (
            <Input
              type="number"
              {...register('campaignDuration', { valueAsNumber: true })}
              placeholder="Enter duration in days (1-365)"
              error={errors.campaignDuration?.message}
              inputState={errors.campaignDuration ? 'error' : 'default'}
            />
          )}
        </div>

        {/* Minimum Donation */}
        <div className="relative">
          <Input
            label="Minimum Donation Amount (Optional)"
            type="number"
            step="0.01"
            {...register('minimumDonation', { valueAsNumber: true })}
            placeholder="e.g. 10"
            error={errors.minimumDonation?.message}
            inputState={errors.minimumDonation ? 'error' : 'default'}
            helperText="Set a minimum amount per donation. Leave empty for no minimum."
          />
        </div>

        {/* Network Selector */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Blockchain Network <span className="text-red-500">*</span>
            </label>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" aria-label="Choose which Stellar network to use" />
          </div>
          <div className="space-y-2">
            {NETWORKS.map((net) => (
              <label
                key={net}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  checked={network === net}
                  onChange={() => handleNetworkToggle(net)}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  name="network"
                />
                <div className="ml-3 flex-1">
                  <span className="text-sm font-medium text-gray-900">{net}</span>
                  <p className="text-xs text-gray-500">
                    {net === 'Testnet' && 'Test environment - use for testing with fake assets'}
                    {net === 'Mainnet' && 'Production network - real assets and transactions'}
                  </p>
                </div>
                {network === net && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between pt-6 border-t">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Campaign
        </Button>
      </div>
    </form>
  );
};
