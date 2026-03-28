'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '@/components/ui';
import { BasicInfoForm } from '@/features/projects/components/BasicInfoForm';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Layout, 
  ListTodo, 
  Wallet, 
  Eye, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'basics', title: 'Basics', icon: Layout },
  { id: 'details', title: 'Details', icon: ListTodo },
  { id: 'funding', title: 'Funding', icon: Wallet },
  { id: 'review', title: 'Review', icon: Eye },
];

export default function CreateProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isSaved, setIsSaved] = useState(true);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('project_draft');
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('project_draft', JSON.stringify(formData));
      setIsSaved(true);
    }
  }, [formData]);

  const handleNext = (stepData: any) => {
    const newData = { ...formData, ...stepData };
    setFormData(newData);
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    setIsSaved(false);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleExit = () => {
    if (!isSaved) {
      if (window.confirm('You have unsaved changes. Are you sure you want to exit?')) {
        router.push('/dashboard');
      }
    } else {
      router.push('/dashboard');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoForm 
            initialData={formData} 
            onNext={handleNext} 
          />
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Project Details</h2>
            <p className="text-gray-500">More details about your project go here.</p>
            <div className="flex justify-between pt-6">
              <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={() => handleNext({ details: 'Mock details' })} className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue to Funding
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Funding Goal</h2>
            <p className="text-gray-500">Define your funding target and duration.</p>
            <div className="flex justify-between pt-6">
              <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={() => handleNext({ funding: 'Mock funding' })} className="bg-blue-600 hover:bg-blue-700 text-white">
                Review Project
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center mb-4">Review Your Project</h2>
            <Card className="p-6 bg-gray-50 border-dashed border-2">
              <div className="space-y-4">
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Location:</strong> {formData.location}</p>
              </div>
            </Card>
            <div className="flex justify-between pt-6">
              <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button 
                onClick={() => alert('Project Submitted!')} 
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Campaign
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-500 mt-1">Get started with your social impact project on StellarAid.</p>
        </div>
        <button 
          onClick={handleExit}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          title="Exit Wizard"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Stepper */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between z-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? 'bg-blue-600 text-white' : 
                    isActive ? 'bg-white border-2 border-blue-600 text-blue-600 ring-4 ring-blue-50' : 
                    'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 shadow-sm border border-gray-100">
            {renderStep()}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center text-sm text-gray-400 font-light">
        Step {currentStep + 1} of {STEPS.length} • All progress is automatically saved as a draft.
      </div>
    </div>
  );
}
