import React from 'react';
import { GraduationCap, Sprout, Users, Building2, Heart, Accessibility } from 'lucide-react';

interface WhoThisIsForProps {
  language: 'en' | 'hi';
}

export function WhoThisIsFor({ language }: WhoThisIsForProps) {
  const content = {
    en: {
      title: 'Who This Is For',
      categories: [
        { icon: GraduationCap, label: 'Students' },
        { icon: Sprout, label: 'Farmers' },
        { icon: Users, label: 'Women' },
        { icon: Building2, label: 'MSMEs' },
        { icon: Heart, label: 'Senior Citizens' },
        { icon: Accessibility, label: 'Persons with Disabilities' }
      ]
    },
    hi: {
      title: 'यह किसके लिए है',
      categories: [
        { icon: GraduationCap, label: 'छात्र' },
        { icon: Sprout, label: 'किसान' },
        { icon: Users, label: 'महिलाएं' },
        { icon: Building2, label: 'एमएसएमई' },
        { icon: Heart, label: 'वरिष्ठ नागरिक' },
        { icon: Accessibility, label: 'दिव्यांग व्यक्ति' }
      ]
    }
  };

  const text = content[language];

  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-12">
          {text.title}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {text.categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded">
                <Icon className="w-10 h-10 text-gray-700" />
                <span className="text-gray-900 text-center">{category.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
