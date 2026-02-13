import React from 'react';

interface FormTopBarProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export function FormTopBar({ language, setLanguage }: FormTopBarProps) {
  const appName = language === 'en' ? 'Udayam' : 'योजनादर्शन';

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">{appName}</h1>
        
        <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5">
          <button
            onClick={() => setLanguage('en')}
            className={`text-sm ${language === 'en' ? 'font-semibold text-gray-900' : 'text-gray-600'}`}
          >
            English
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => setLanguage('hi')}
            className={`text-sm ${language === 'hi' ? 'font-semibold text-gray-900' : 'text-gray-600'}`}
          >
            हिंदी
          </button>
        </div>
      </div>
    </div>
  );
}
