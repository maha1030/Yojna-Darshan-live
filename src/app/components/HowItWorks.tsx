import React from 'react';
import { FileText, CheckCircle2, List } from 'lucide-react';

interface HowItWorksProps {
  language: 'en' | 'hi';
}

export function HowItWorks({ language }: HowItWorksProps) {
  const content = {
    en: {
      title: 'How It Works',
      steps: [
        {
          icon: FileText,
          title: 'Step 1',
          description: 'Enter basic details like age, income range, occupation, and state'
        },
        {
          icon: CheckCircle2,
          title: 'Step 2',
          description: 'Official central and state scheme rules are matched'
        },
        {
          icon: List,
          title: 'Step 3',
          description: 'View eligible, conditional, or unlikely schemes with explanations'
        }
      ]
    },
    hi: {
      title: 'कैसे काम करता है',
      steps: [
        {
          icon: FileText,
          title: 'चरण 1',
          description: 'उम्र, आय सीमा, व्यवसाय और राज्य जैसे बुनियादी विवरण दर्ज करें'
        },
        {
          icon: CheckCircle2,
          title: 'चरण 2',
          description: 'आधिकारिक केंद्रीय और राज्य योजना नियमों का मिलान किया जाता है'
        },
        {
          icon: List,
          title: 'चरण 3',
          description: 'स्पष्टीकरण के साथ पात्र, सशर्त या असंभावित योजनाएं देखें'
        }
      ]
    }
  };

  const text = content[language];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-12">
          {text.title}
        </h2>
        
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
          {text.steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
