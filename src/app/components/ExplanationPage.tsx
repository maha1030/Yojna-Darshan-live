import React, { useState } from 'react';
import { ChevronLeft, FileText } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { FormData } from '@/app/components/EligibilityForm';
import { Scheme } from '@/app/components/results/SchemeCard';
import { RuleItem, EligibilityRule } from '@/app/components/explanation/RuleItem';
import { RuleCitationModal } from '@/app/components/explanation/RuleCitationModal';
import { evaluateSchemeRules } from '@/app/utils/ruleEvaluation';

interface ExplanationPageProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  formData: FormData;
  scheme: Scheme;
  onBack: () => void;
}

export function ExplanationPage({ language, setLanguage, formData, scheme, onBack }: ExplanationPageProps) {
  const [selectedRule, setSelectedRule] = useState<EligibilityRule | null>(null);

  const content = {
    en: {
      appName: 'Udayam',
      sectionTitle: 'How this eligibility was decided',
      sectionSubtitle: 'Based on official government rules matched against your information.',
      confidenceTitle: 'Eligibility Confidence Explanation',
      disclaimer: 'Final eligibility is determined by the approving authority after document verification.',
      checkDocuments: 'Check Required Documents',
      status: {
        high: 'High Confidence',
        conditional: 'Conditional',
        unlikely: 'Unlikely'
      }
    },
    hi: {
      appName: 'योजनादर्शन',
      sectionTitle: 'यह पात्रता कैसे तय की गई',
      sectionSubtitle: 'आपकी जानकारी के खिलाफ मिलान किए गए आधिकारिक सरकारी नियमों के आधार पर।',
      confidenceTitle: 'पात्रता विश्वास स्पष्टीकरण',
      disclaimer: 'अंतिम पात्रता दस्तावेज़ सत्यापन के बाद अनुमोदन प्राधिकारी द्वारा निर्धारित की जाती है।',
      checkDocuments: 'आवश्यक दस्तावेज़ जांचें',
      status: {
        high: 'उच्च विश्वास',
        conditional: 'सशर्त',
        unlikely: 'संभावना नहीं'
      }
    }
  };

  const text = content[language];
  
  const statusConfig = {
    high: { color: 'bg-green-100 text-green-800 border-green-300' },
    conditional: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    unlikely: { color: 'bg-red-100 text-red-800 border-red-300' }
  };

  const config = statusConfig[scheme.status];
  const schemeName = language === 'en' ? scheme.name : scheme.nameHi;
  const ministryName = language === 'en' ? scheme.ministry : scheme.ministryHi;
  
  const { rules, confidenceExplanation } = evaluateSchemeRules(scheme, formData, language);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setLanguage={setLanguage} />
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      {/* Scheme Context Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                {schemeName}
              </h2>
              <p className="text-base text-gray-600">
                {ministryName}
              </p>
            </div>
            
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className={`px-3 py-1.5 rounded border text-sm font-medium ${config.color} whitespace-nowrap`}>
                {text.status[scheme.status]}
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {scheme.confidence}%
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {text.sectionTitle}
          </h3>
          <p className="text-base text-gray-700">
            {text.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Rule-by-Rule Breakdown */}
        <div className="space-y-3 mb-8">
          {rules.map((rule, index) => (
            <RuleItem
              key={index}
              rule={rule}
              language={language}
              onViewCitation={() => setSelectedRule(rule)}
            />
          ))}
        </div>

        {/* Eligibility Confidence Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {text.confidenceTitle}
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl font-semibold text-blue-600">
              {scheme.confidence}%
            </div>
            <p className="text-base text-gray-700 flex-1">
              {confidenceExplanation}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6">
          <p className="text-base text-gray-700">
            {text.disclaimer}
          </p>
        </div>

        {/* Primary Action */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              // Would navigate to document checklist
              console.log('Check documents for:', scheme.id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded text-lg inline-flex items-center gap-2 transition-colors"
          >
            <FileText className="w-5 h-5" />
            {text.checkDocuments}
          </button>
        </div>
      </div>

      {/* Rule Citation Modal */}
      {selectedRule && (
        <RuleCitationModal
          rule={selectedRule}
          language={language}
          onClose={() => setSelectedRule(null)}
        />
      )}
    </div>
  );
}
