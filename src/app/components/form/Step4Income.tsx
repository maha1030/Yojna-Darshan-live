import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step4IncomeProps {
  language: 'en' | 'hi';
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Income({ language, value, onChange, onNext, onBack }: Step4IncomeProps) {
  const content = {
    en: {
      question: 'What is your annual family income range?',
      helper: 'Income limits determine eligibility for many welfare schemes.',
      next: 'Next',
      back: 'Back',
      privacy: 'We use this information only to check scheme eligibility.',
      incomeRanges: [
        { value: 'below-1l', label: 'Below ₹1 Lakh' },
        { value: '1-2.5l', label: '₹1 - ₹2.5 Lakh' },
        { value: '2.5-5l', label: '₹2.5 - ₹5 Lakh' },
        { value: '5-10l', label: '₹5 - ₹10 Lakh' },
        { value: 'above-10l', label: 'Above ₹10 Lakh' }
      ]
    },
    hi: {
      question: 'आपकी वार्षिक पारिवारिक आय सीमा क्या है?',
      helper: 'आय सीमा कई कल्याणकारी योजनाओं के लिए पात्रता निर्धारित करती है।',
      next: 'आगे',
      back: 'पीछे',
      privacy: 'हम इस जानकारी का उपयोग केवल योजना पात्रता जांचने के लिए करते हैं।',
      incomeRanges: [
        { value: 'below-1l', label: '₹1 लाख से कम' },
        { value: '1-2.5l', label: '₹1 - ₹2.5 लाख' },
        { value: '2.5-5l', label: '₹2.5 - ₹5 लाख' },
        { value: '5-10l', label: '₹5 - ₹10 लाख' },
        { value: 'above-10l', label: '₹10 लाख से अधिक' }
      ]
    }
  };

  const text = content[language];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        {text.question}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {text.incomeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`text-center px-6 py-4 text-lg border-2 rounded transition-colors ${
              value === range.value
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
            }`}
          >
            {range.label}
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
