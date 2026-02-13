import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step1AgeProps {
  language: 'en' | 'hi';
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step1Age({ language, value, onChange, onNext, onBack }: Step1AgeProps) {
  const content = {
    en: {
      question: 'What is your age?',
      helper: 'Age limits are defined in government scheme guidelines.',
      next: 'Next',
      back: 'Back',
      privacy: 'We use this information only to check scheme eligibility.',
      years: 'years'
    },
    hi: {
      question: 'आपकी उम्र क्या है?',
      helper: 'आयु सीमाएं सरकारी योजना दिशानिर्देशों में परिभाषित हैं।',
      next: 'आगे',
      back: 'पीछे',
      privacy: 'हम इस जानकारी का उपयोग केवल योजना पात्रता जांचने के लिए करते हैं।',
      years: 'वर्ष'
    }
  };

  const text = content[language];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        {text.question}
      </h2>
      
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="number"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-32 text-3xl font-semibold text-gray-900 border-b-2 border-blue-600 outline-none text-center py-2"
          />
          <span className="text-xl text-gray-600">{text.years}</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
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
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg inline-flex items-center justify-center gap-2 transition-colors"
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
