import React from 'react';
import { Shield } from 'lucide-react';

interface TransparencySectionProps {
  language: 'en' | 'hi';
}

export function TransparencySection({ language }: TransparencySectionProps) {
  const content = {
    en: {
      title: 'Transparency & Trust',
      points: [
        'We do not decide eligibility — authorities do',
        'Based only on published government guidelines',
        'No agents or middlemen involved',
        'Your data is used only with consent'
      ]
    },
    hi: {
      title: 'पारदर्शिता और विश्वास',
      points: [
        'हम पात्रता का निर्णय नहीं लेते - अधिकारी करते हैं',
        'केवल प्रकाशित सरकारी दिशानिर्देशों पर आधारित',
        'कोई एजेंट या बिचौलिए शामिल नहीं',
        'आपका डेटा केवल सहमति से उपयोग किया जाता है'
      ]
    }
  };

  const text = content[language];

  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {text.title}
          </h2>
        </div>
        
        <ul className="space-y-4">
          {text.points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
              <span className="text-lg text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
