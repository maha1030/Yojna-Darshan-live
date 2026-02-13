import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step2LocationProps {
  language: 'en' | 'hi';
  state: string;
  district: string;
  onStateChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Location({ 
  language, 
  state, 
  district, 
  onStateChange, 
  onDistrictChange, 
  onNext, 
  onBack 
}: Step2LocationProps) {
  const content = {
    en: {
      question: 'Which state and district do you live in?',
      stateLabel: 'State',
      districtLabel: 'District',
      statePlaceholder: 'Select your state',
      districtPlaceholder: 'Select your district',
      helper: 'Many schemes are specific to states and districts.',
      next: 'Next',
      back: 'Back',
      privacy: 'We use this information only to check scheme eligibility.'
    },
    hi: {
      question: 'आप किस राज्य और जिले में रहते हैं?',
      stateLabel: 'राज्य',
      districtLabel: 'जिला',
      statePlaceholder: 'अपना राज्य चुनें',
      districtPlaceholder: 'अपना जिला चुनें',
      helper: 'कई योजनाएं राज्यों और जिलों के लिए विशिष्ट हैं।',
      next: 'आगे',
      back: 'पीछे',
      privacy: 'हम इस जानकारी का उपयोग केवल योजना पात्रता जांचने के लिए करते हैं।'
    }
  };

  const text = content[language];

  // Sample states - in production would be comprehensive list
  const states = [
    'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  // Sample districts - in production would be dynamic based on state
  const districts = state ? [
    'District 1', 'District 2', 'District 3', 'District 4', 'District 5'
  ] : [];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        {text.question}
      </h2>
      
      <div className="space-y-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {text.stateLabel}
          </label>
          <select
            value={state}
            onChange={(e) => {
              onStateChange(e.target.value);
              onDistrictChange(''); // Reset district when state changes
            }}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="">{text.statePlaceholder}</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {text.districtLabel}
          </label>
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            disabled={!state}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="">{text.districtPlaceholder}</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-8">
        {text.helper}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded text-lg inline-flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {text.back}
        </button>
        <button
          onClick={onNext}
          disabled={!state || !district}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg inline-flex items-center justify-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {text.next}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-6">
        {text.privacy}
      </p>
    </div>
  );
}
