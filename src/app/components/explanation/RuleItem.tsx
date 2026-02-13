import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

export interface EligibilityRule {
  condition: string;
  conditionHi: string;
  userValue?: string;
  userValueHi?: string;
  status: 'pass' | 'fail' | 'unclear';
  citation: {
    reference: string;
    clauseText: string;
    clauseTextHi: string;
    documentName: string;
    documentNameHi: string;
    ministry: string;
    ministryHi: string;
    notificationNumber: string;
    year: string;
    link: string;
  };
}

interface RuleItemProps {
  rule: EligibilityRule;
  language: 'en' | 'hi';
  onViewCitation: () => void;
}

export function RuleItem({ rule, language, onViewCitation }: RuleItemProps) {
  const content = {
    en: {
      yourValue: 'Your value',
      viewReference: 'View Reference'
    },
    hi: {
      yourValue: 'आपका मान',
      viewReference: 'संदर्भ देखें'
    }
  };

  const text = content[language];

  const statusConfig = {
    pass: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: language === 'en' ? 'Pass' : 'पास'
    },
    fail: {
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: language === 'en' ? 'Fail' : 'असफल'
    },
    unclear: {
      icon: AlertCircle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      label: language === 'en' ? 'Unclear' : 'अस्पष्ट'
    }
  };

  const config = statusConfig[rule.status];
  const Icon = config.icon;
  const condition = language === 'en' ? rule.condition : rule.conditionHi;
  const userValue = language === 'en' ? rule.userValue : rule.userValueHi;

  return (
    <div className={`${config.bg} border ${config.border} rounded-lg p-5`}>
      <div className="flex items-start gap-4">
        <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-1`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <p className="text-base text-gray-900 font-medium flex-1">
              {condition}
            </p>
            <span className={`text-sm font-semibold ${config.color} whitespace-nowrap`}>
              {config.label}
            </span>
          </div>
          
          {userValue && (
            <p className="text-sm text-gray-700 mb-3">
              <span className="font-medium">{text.yourValue}:</span> {userValue}
            </p>
          )}
          
          <button
            onClick={onViewCitation}
            className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 font-medium"
          >
            {rule.citation.reference}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
