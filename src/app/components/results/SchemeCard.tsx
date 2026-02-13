import React from 'react';
import { FileText, Info } from 'lucide-react';

export interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  ministry: string;
  ministryHi: string;
  status: 'high' | 'conditional' | 'unlikely';
  confidence: number;
}

interface SchemeCardProps {
  scheme: Scheme;
  language: 'en' | 'hi';
  onViewWhy?: () => void;
}

export function SchemeCard({ scheme, language, onViewWhy }: SchemeCardProps) {
  const content = {
    en: {
      viewWhy: 'View Why',
      viewDocs: 'View Documents',
      confidence: 'Confidence',
      status: {
        high: 'High Confidence',
        conditional: 'Conditional',
        unlikely: 'Unlikely'
      }
    },
    hi: {
      viewWhy: 'कारण देखें',
      viewDocs: 'दस्तावेज़ देखें',
      confidence: 'विश्वास',
      status: {
        high: 'उच्च विश्वास',
        conditional: 'सशर्त',
        unlikely: 'संभावना नहीं'
      }
    }
  };

  const text = content[language];
  
  const statusConfig = {
    high: { color: 'bg-green-100 text-green-800 border-green-300', badge: 'bg-green-500' },
    conditional: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', badge: 'bg-yellow-500' },
    unlikely: { color: 'bg-red-100 text-red-800 border-red-300', badge: 'bg-red-500' }
  };

  const config = statusConfig[scheme.status];
  const schemeName = language === 'en' ? scheme.name : scheme.nameHi;
  const ministryName = language === 'en' ? scheme.ministry : scheme.ministryHi;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {schemeName}
          </h3>
          <p className="text-sm text-gray-600">
            {ministryName}
          </p>
        </div>
        
        <div className={`px-3 py-1.5 rounded border text-sm font-medium ${config.color} whitespace-nowrap self-start`}>
          {text.status[scheme.status]}
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{text.confidence}</span>
          <span className="text-sm font-semibold text-gray-900">{scheme.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${config.badge} h-2 rounded-full transition-all`}
            style={{ width: `${scheme.confidence}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onViewWhy}
          className="flex-1 border-2 border-blue-600 text-blue-600 px-4 py-2.5 rounded text-base font-medium inline-flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
        >
          <Info className="w-5 h-5" />
          {text.viewWhy}
        </button>
        
        <button
          onClick={() => {
            // Would navigate to document checklist page
            console.log('View Documents clicked for:', scheme.id);
          }}
          className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded text-base font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-5 h-5" />
          {text.viewDocs}
        </button>
      </div>
    </div>
  );
}