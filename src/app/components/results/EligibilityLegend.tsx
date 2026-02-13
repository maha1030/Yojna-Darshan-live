import React from 'react';

interface EligibilityLegendProps {
  language: 'en' | 'hi';
}

export function EligibilityLegend({ language }: EligibilityLegendProps) {
  const content = {
    en: {
      title: 'What do these results mean?',
      highConfidence: 'High Confidence – Meets most eligibility rules',
      conditional: 'Conditional – Some rules are unclear or documents may be missing',
      unlikely: 'Unlikely – Does not meet key eligibility rules'
    },
    hi: {
      title: 'इन परिणामों का क्या मतलब है?',
      highConfidence: 'उच्च विश्वास – अधिकांश पात्रता नियमों को पूरा करता है',
      conditional: 'सशर्त – कुछ नियम अस्पष्ट हैं या दस्तावेज़ गायब हो सकते हैं',
      unlikely: 'संभावना नहीं – प्रमुख पात्रता नियमों को पूरा नहीं करता है'
    }
  };

  const text = content[language];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {text.title}
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">{text.highConfidence}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">{text.conditional}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">{text.unlikely}</p>
        </div>
      </div>
    </div>
  );
}
