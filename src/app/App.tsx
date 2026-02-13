import React, { useState } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { HowItWorks } from '@/app/components/HowItWorks';
import { TransparencySection } from '@/app/components/TransparencySection';
import { WhatYouGet } from '@/app/components/WhatYouGet';
import { WhoThisIsFor } from '@/app/components/WhoThisIsFor';
import { Footer } from '@/app/components/Footer';
import { EligibilityForm, FormData } from '@/app/components/EligibilityForm';
import { ResultsPage } from '@/app/components/ResultsPage';
import { ExplanationPage } from '@/app/components/ExplanationPage';
import { Scheme } from '@/app/components/results/SchemeCard';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [page, setPage] = useState<'home' | 'form' | 'results' | 'explanation'>('home');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  if (page === 'form') {
    return (
      <EligibilityForm 
        language={language} 
        setLanguage={setLanguage} 
        onBack={() => setPage('home')}
        onComplete={(data) => {
          setFormData(data);
          setPage('results');
        }}
      />
    );
  }

  if (page === 'results' && formData) {
    return (
      <ResultsPage
        language={language}
        setLanguage={setLanguage}
        formData={formData}
        onBack={() => setPage('form')}
        onViewExplanation={(scheme) => {
          setSelectedScheme(scheme);
          setPage('explanation');
        }}
      />
    );
  }

  if (page === 'explanation' && formData && selectedScheme) {
    return (
      <ExplanationPage
        language={language}
        setLanguage={setLanguage}
        formData={formData}
        scheme={selectedScheme}
        onBack={() => setPage('results')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} setLanguage={setLanguage} />
      <main>
        <HeroSection language={language} onStartForm={() => setPage('form')} />
        <HowItWorks language={language} />
        <TransparencySection language={language} />
        <WhatYouGet language={language} />
        <WhoThisIsFor language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}