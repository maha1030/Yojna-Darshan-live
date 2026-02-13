import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  language: 'en' | 'hi';
  onStartForm: () => void;
}

export function HeroSection({ language, onStartForm }: HeroSectionProps) {
  const content = {
    en: {
      headline: 'Check which government schemes you may be eligible for',
      subtext: 'Based on official government rules. Results shown with reasons.',
      cta: 'Check My Eligibility',
      note: 'Takes about 2 minutes'
    },
    hi: {
      headline: 'जांचें कि आप किन सरकारी योजनाओं के लिए पात्र हो सकते हैं',
      subtext: 'आधिकारिक सरकारी नियमों पर आधारित। कारणों के साथ परिणाम दिखाए गए।',
      cta: 'मेरी पात्रता जांचें',
      note: 'लगभग 2 मिनट लगते हैं'
    }
  };

  const text = content[language];

  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4">
          {text.headline}
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          {text.subtext}
        </p>
        <button 
          onClick={onStartForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded text-lg inline-flex items-center gap-2 transition-colors"
        >
          {text.cta}
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-gray-600 mt-4">{text.note}</p>
      </div>
    </section>
  );
}