import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { EligibilityRule } from '@/app/components/explanation/RuleItem';

interface RuleCitationModalProps {
  rule: EligibilityRule;
  language: 'en' | 'hi';
  onClose: () => void;
}

export function RuleCitationModal({ rule, language, onClose }: RuleCitationModalProps) {
  const content = {
    en: {
      title: 'Rule Citation',
      clauseLabel: 'Clause Text',
      documentLabel: 'Official Document',
      ministryLabel: 'Issuing Authority',
      notificationLabel: 'Notification Number',
      yearLabel: 'Year',
      viewDocument: 'View Original Document',
      close: 'Close'
    },
    hi: {
      title: 'नियम संदर्भ',
      clauseLabel: 'खंड पाठ',
      documentLabel: 'आधिकारिक दस्तावेज़',
      ministryLabel: 'जारी करने वाला प्राधिकरण',
      notificationLabel: 'अधिसूचना संख्या',
      yearLabel: 'वर्ष',
      viewDocument: 'मूल दस्तावेज़ देखें',
      close: 'बंद करें'
    }
  };

  const text = content[language];
  const citation = rule.citation;

  const clauseText = language === 'en' ? citation.clauseText : citation.clauseTextHi;
  const documentName = language === 'en' ? citation.documentName : citation.documentNameHi;
  const ministry = language === 'en' ? citation.ministry : citation.ministryHi;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {text.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={text.close}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Reference Badge */}
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1.5 rounded border border-blue-300 text-sm font-semibold">
            {citation.reference}
          </div>

          {/* Clause Text */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              {text.clauseLabel}
            </h4>
            <p className="text-base text-gray-900 bg-gray-50 border border-gray-200 rounded p-4">
              {clauseText}
            </p>
          </div>

          {/* Document Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                {text.documentLabel}
              </h4>
              <p className="text-base text-gray-900">
                {documentName}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                {text.ministryLabel}
              </h4>
              <p className="text-base text-gray-900">
                {ministry}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  {text.notificationLabel}
                </h4>
                <p className="text-base text-gray-900">
                  {citation.notificationNumber}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">
                  {text.yearLabel}
                </h4>
                <p className="text-base text-gray-900">
                  {citation.year}
                </p>
              </div>
            </div>
          </div>

          {/* View Document Link */}
          <a
            href={citation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink className="w-5 h-5" />
            {text.viewDocument}
          </a>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded text-base font-medium transition-colors"
          >
            {text.close}
          </button>
        </div>
      </div>
    </div>
  );
}
