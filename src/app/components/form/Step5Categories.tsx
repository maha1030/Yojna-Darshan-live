import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step5CategoriesProps {
  language: 'en' | 'hi';
  values: string[];
  onChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Categories({ language, values, onChange, onNext, onBack }: Step5CategoriesProps) {
  const content = {
    en: {
      question: 'Do any of the following apply to you?',
      helper: 'Select all that apply. Special schemes exist for these categories.',
      next: 'View Results',
      back: 'Back',
      privacy: 'We use this information only to check scheme eligibility.',
      skipText: 'You can skip this if none apply.',
      categories: [
        { value: 'student', label: 'Student' },
        { value: 'farmer', label: 'Farmer' },
        { value: 'woman', label: 'Woman' },
        { value: 'senior-citizen', label: 'Senior Citizen' },
        { value: 'person-with-disability', label: 'Person with Disability' }
      ]
    },
    hi: {
      question: 'क्या निम्नलिखित में से कोई आप पर लागू होता है?',
      helper: 'सभी लागू होने वाले चुनें। इन श्रेणियों के लिए विशेष योजनाएं मौजूद हैं।',
      next: 'परिणाम देखें',
      back: 'पीछे',
      privacy: 'हम इस जानकारी का उपयोग केवल योजना पात्रता जांचने के लिए करते हैं।',
      skipText: 'यदि कोई लागू नहीं होता है तो आप इसे छोड़ सकते हैं।',
      categories: [
        { value: 'student', label: 'छात्र' },
        { value: 'farmer', label: 'किसान' },
        { value: 'woman', label: 'महिला' },
        { value: 'senior-citizen', label: 'वरिष्ठ नागरिक' },
        { value: 'person-with-disability', label: 'दिव्यांग व्यक्ति' }
      ]
    }
  };

  const text = content[language];

  const toggleCategory = (category: string) => {
    if (values.includes(category)) {
      onChange(values.filter(v => v !== category));
    } else {
      onChange([...values, category]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
        {text.question}
      </h2>
      
      <div className="space-y-3 mb-4">
        {text.categories.map((category) => {
          const isSelected = values.includes(category.value);
          return (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value)}
              className={`w-full text-left px-6 py-4 text-lg border-2 rounded transition-colors flex items-center gap-3 ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-400'
              }`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {category.label}
            </button>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-600 mb-2">
        {text.helper}
      </p>
      <p className="text-sm text-gray-500 mb-8">
        {text.skipText}
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
