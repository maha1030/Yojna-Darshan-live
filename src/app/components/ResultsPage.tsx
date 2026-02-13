import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { FormData } from '@/app/components/EligibilityForm';
import { SchemeCard, Scheme } from '@/app/components/results/SchemeCard';
import { EligibilityLegend } from '@/app/components/results/EligibilityLegend';
import { generateSchemeResults } from '@/app/utils/schemeMatching';

interface ResultsPageProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  formData: FormData;
  onBack: () => void;
  onViewExplanation: (scheme: Scheme) => void;
}

export function ResultsPage({ language, setLanguage, formData, onBack, onViewExplanation }: ResultsPageProps) {
  const content = {
    en: {
      appName: 'Udayam',
      title: 'Your Eligibility Results',
      subtitle: 'Based on the information you provided',
      noResults: 'Based on the information provided, no schemes strongly apply right now.',
      reviewButton: 'Review my details',
      changeNote: 'Eligibility may change if your income, age, or status changes'
    },
    hi: {
      appName: 'योजनादर्शन',
      title: 'आपके पात्रता परिणाम',
      subtitle: 'आपके द्वारा प्रदान की गई जानकारी के आधार पर',
      noResults: 'प्रदान की गई जानकारी के आधार पर, कोई योजना अभी मजबूती से लागू नहीं होती है।',
      reviewButton: 'मेरे विवरण की समीक्षा करें',
      changeNote: 'यदि आपकी आय, उम्र या स्थिति बदलती है तो पात्रता बदल सकती है'
    }
  };

  const text = content[language];
  const schemes = generateSchemeResults(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />
      {/* Back Button and Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors mb-4 flex items-center gap-2"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            {text.title}
          </h2>
          <p className="text-lg text-gray-700">
            {text.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Eligibility Legend */}
        <EligibilityLegend language={language} />

        {/* Scheme Results or No Results */}
        {schemes.length > 0 ? (
          <div className="space-y-4">
            {schemes.map((scheme) => (
              <SchemeCard 
                key={scheme.id} 
                scheme={scheme} 
                language={language}
                onViewWhy={() => onViewExplanation(scheme)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              {text.noResults}
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition-colors"
            >
              {text.reviewButton}
            </button>
            <p className="text-sm text-gray-600 mt-4">
              {text.changeNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}