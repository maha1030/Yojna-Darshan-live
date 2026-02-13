import React from 'react';
import { ListChecks, FileCheck, FileText, ExternalLink, Bell } from 'lucide-react';

interface WhatYouGetProps {
  language: 'en' | 'hi';
}

export function WhatYouGet({ language }: WhatYouGetProps) {
  const content = {
    en: {
      title: 'What You Get',
      items: [
        {
          icon: ListChecks,
          text: 'Personalized list of applicable schemes'
        },
        {
          icon: FileCheck,
          text: 'Clear eligibility reasons with rule references'
        },
        {
          icon: FileText,
          text: 'Required documents checklist'
        },
        {
          icon: ExternalLink,
          text: 'Official application links'
        },
        {
          icon: Bell,
          text: 'Scheme update alerts'
        }
      ]
    },
    hi: {
      title: 'आपको क्या मिलता है',
      items: [
        {
          icon: ListChecks,
          text: 'लागू योजनाओं की व्यक्तिगत सूची'
        },
        {
          icon: FileCheck,
          text: 'नियम संदर्भों के साथ स्पष्ट पात्रता कारण'
        },
        {
          icon: FileText,
          text: 'आवश्यक दस्तावेजों की जांच सूची'
        },
        {
          icon: ExternalLink,
          text: 'आधिकारिक आवेदन लिंक'
        },
        {
          icon: Bell,
          text: 'योजना अपडेट अलर्ट'
        }
      ]
    }
  };

  const text = content[language];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-12">
          {text.title}
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {text.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded">
                <Icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
