import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  language: 'en' | 'hi';
}

export function ProgressBar({ currentStep, totalSteps, language }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const stepLabels = {
    en: ['Basic Details', 'Location', 'Occupation', 'Income', 'Categories'],
    hi: ['बुनियादी विवरण', 'स्थान', 'व्यवसाय', 'आय', 'श्रेणियां']
  };

  const stepText = language === 'en' 
    ? `Step ${currentStep} of ${totalSteps} — ${stepLabels.en[currentStep - 1]}`
    : `चरण ${currentStep} में से ${totalSteps} — ${stepLabels.hi[currentStep - 1]}`;

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <p className="text-sm text-gray-600 mb-2">{stepText}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
