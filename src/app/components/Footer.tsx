import React from 'react';

interface FooterProps {
  language: 'en' | 'hi';
}

export function Footer({ language }: FooterProps) {
  const content = {
    en: {
      dataSources: 'Data sources: India.gov.in, Ministry portals',
      disclaimer: 'This platform provides information based on publicly available government guidelines. Final eligibility decisions are made by respective government authorities. We are not affiliated with any government department.',
      feedback: 'Feedback / Contact'
    },
    hi: {
      dataSources: 'डेटा स्रोत: India.gov.in, मंत्रालय पोर्टल',
      disclaimer: 'यह प्लेटफॉर्म सार्वजनिक रूप से उपलब्ध सरकारी दिशानिर्देशों के आधार पर जानकारी प्रदान करता है। अंतिम पात्रता निर्णय संबंधित सरकारी अधिकारियों द्वारा लिए जाते हैं। हम किसी भी सरकारी विभाग से संबद्ध नहीं हैं।',
      feedback: 'प्रतिक्रिया / संपर्क'
    }
  };

  const text = content[language];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <p className="text-sm">
            <strong className="text-gray-200">{text.dataSources}</strong>
          </p>
          
          <p className="text-sm leading-relaxed max-w-3xl">
            {text.disclaimer}
          </p>
          
          <div className="pt-4 border-t border-gray-800">
            <a
              href="#contact"
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              {text.feedback}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
