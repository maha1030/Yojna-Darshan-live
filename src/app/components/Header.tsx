import React from 'react';
import { HelpCircle, Languages, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export function Header({ language, setLanguage }: HeaderProps) {
  const content = {
    en: {
      appName: 'Yojna Darshan',
      subtitle: 'Government Scheme Eligibility',
      about: 'How it works'
    },
    hi: {
      appName: 'उदयम',
      subtitle: 'सरकारी योजना पात्रता',
      about: 'यह कैसे काम करता है'
    }
  };

  const text = content[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1463F3] text-white shadow-lg shadow-blue-200">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {text.appName}<span className="text-[#1463F3]">.</span>
              </h1>
              <p className="hidden text-xs font-medium uppercase tracking-wider text-gray-500 sm:block">
                {text.subtitle}
              </p>
            </div>
          </div>
          
          {/* Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-8">
            <nav className="hidden md:flex">
              <a
                href="#how-it-works"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#1463F3]"
              >
                <HelpCircle className="w-4 h-4" />
                {text.about}
              </a>
            </nav>

            <div className="h-6 w-px bg-gray-200 hidden sm:block" />

            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full bg-gray-50 p-1 border border-gray-100">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  language === 'en' 
                    ? 'bg-white text-[#1463F3] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  language === 'hi' 
                    ? 'bg-white text-[#1463F3] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                हिं
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}