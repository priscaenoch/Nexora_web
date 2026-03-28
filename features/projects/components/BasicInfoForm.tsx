'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Input } from '@/components/ui';
import { HelpCircle } from 'lucide-react';

const schema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  category: z.string().min(1, 'Please select a category'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(200, 'Description cannot exceed 200 characters'),
  location: z.string().min(1, 'Please select a location'),
});

type BasicInfoData = z.infer<typeof schema>;

interface BasicInfoFormProps {
  initialData?: Partial<BasicInfoData>;
  onNext: (data: BasicInfoData) => void;
}

const categories = [
  { id: 'health', name: 'Health' },
  { id: 'education', name: 'Education' },
  { id: 'disaster_relief', name: 'Disaster Relief' },
  { id: 'environment', name: 'Environment' },
  { id: 'community', name: 'Community' },
  { id: 'technology', name: 'Technology' },
  { id: 'arts', name: 'Arts' },
  { id: 'other', name: 'Other' },
];

const countries = [
  'Global',
  'Nigeria',
  'Ghana',
  'Kenya',
  'South Africa',
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
];

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  initialData,
  onNext,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      category: '',
      description: '',
      location: '',
    },
    mode: 'onChange',
  });

  const titleValue = watch('title', '');
  const descriptionValue = watch('description', '');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-6">
        <div className="relative">
          <Input
            label="Project Title"
            {...register('title')}
            placeholder="e.g. Help Build a New School in Rural Ghana"
            error={errors.title?.message}
            inputState={errors.title ? 'error' : 'default'}
            required
          />
          <span className="absolute top-0 right-0 text-xs text-gray-400 mt-1">
            {titleValue.length}/100
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register('category')}
            className={`w-full h-12 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
              errors.category ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="relative">
          <div className="flex items-center gap-1 mb-1">
            <label className="text-sm font-medium text-gray-700">Short Description</label>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
            <span className="text-red-500 text-sm">*</span>
            <span className="ml-auto text-xs text-gray-400">
              {descriptionValue.length}/200
            </span>
          </div>
          <textarea
            {...register('description')}
            rows={3}
            className={`w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none ${
              errors.description ? 'border-red-500 border-2' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="A brief overview of your campaign to catch donor's attention..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Location <span className="text-red-500">*</span>
          </label>
          <select
            {...register('location')}
            className={`w-full h-12 px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
              errors.location ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            }`}
          >
            <option value="">Select a location</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={!isValid} 
          className="px-10 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95 transition-transform"
        >
          Continue to Step 2
        </Button>
      </div>
    </form>
  );
};
