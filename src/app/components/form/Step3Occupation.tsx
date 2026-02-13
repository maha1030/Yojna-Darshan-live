import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step3OccupationProps {
  language: 'en' | 'hi';
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Occupation({ language, value, onChange, onNext, onBack }: Step3OccupationProps) {
  const content = {
    en: {
      question: 'What is your occupation?',
      helper: 'Different schemes target different occupation groups.',
      next: 'Next',
      back: 'Back',
      privacy: 'We use this information only to check scheme eligibility.',
      occupations: [
        { value: 'student', label: 'Student' },
        { value: 'farmer', label: 'Farmer' },
        { value: 'self-employed', label: 'Self-employed' },
        { value: 'salaried', label: 'Salaried' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'msme', label: 'MSME Owner' }
      ]
    },
    hi: {
      question: 'आपका व्यवसाय क्या है?',
      helper: 'विभिन्न योजनाएं विभिन्न व्यवसाय समूहों को लक्षित करती हैं।',
      next: 'आगे',
      back: 'पीछे',
      privacy: 'हम इस जानकारी का उपयोग केवल योजना पात्रता जांचने के लिए करते हैं।',
      occupations: [
        { value: 'student', label: 'छात्र' },
        { value: 'farmer', label: 'किसान' },
        { value: 'self-employed', label: 'स्व-नियोजित' },
        { value: 'salaried', label: 'वेतनभोगी' },
        { value: 'unemployed', label: 'बेरोजगार' },
        { value: 'msme', label: 'एमएसएमई मालिक' }
      ]
    }
  };

  const text = content[language];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        {text.question}
      </h2>
      
      <div className="space-y-3 mb-6">
        {text.occupations.map((occupation) => (
          <button
            key={occupation.value}
            onClick={() => onChange(occupation.value)}
            className={`w-full text-left px-6 py-4 text-lg border-2 rounded transition-colors ${
              value === occupation.value
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            }`}
          >
            {occupation.label}
          </button>
        ))}
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
          disabled={!value}
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
