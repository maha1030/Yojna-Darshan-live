import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Highly recommended
import { Header } from '@/app/components/Header';
import { ProgressBar } from '@/app/components/form/ProgressBar';
import { Step1Age } from '@/app/components/form/Step1Age';
import { Step2Location } from '@/app/components/form/Step2Location';
import { Step3Occupation } from '@/app/components/form/Step3Occupation';
import { Step4Income } from '@/app/components/form/Step4Income';
import { Step5Categories } from '@/app/components/form/Step5Categories';

// ... interface definitions stay the same

export function EligibilityForm({ language, setLanguage, onBack, onComplete }: EligibilityFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0); // For slide animations
  const [formData, setFormData] = useState<FormData>({
    age: 25,
    state: '',
    district: '',
    occupation: '',
    income: '',
    categories: []
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (currentStep < 5) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const previous = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  // 1. Cleaner Component Mapping
  const StepComponents: Record<number, React.ReactNode> = {
    1: <Step1Age language={language} value={formData.age} onChange={(v) => updateFormData('age', v)} onNext={next} onBack={previous} />,
    2: <Step2Location language={language} state={formData.state} district={formData.district} onStateChange={(v) => updateFormData('state', v)} onDistrictChange={(v) => updateFormData('district', v)} onNext={next} onBack={previous} />,
    3: <Step3Occupation language={language} value={formData.occupation} onChange={(v) => updateFormData('occupation', v)} onNext={next} onBack={previous} />,
    4: <Step4Income language={language} value={formData.income} onChange={(v) => updateFormData('income', v)} onNext={next} onBack={previous} />,
    5: <Step5Categories language={language} values={formData.categories} onChange={(v) => updateFormData('categories', v)} onNext={next} onBack={previous} />,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header language={language} setLanguage={setLanguage} />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-sm">
          <ProgressBar currentStep={currentStep} totalSteps={5} language={language} />
        </div>
        
        <main className="flex-1 flex items-center justify-center px-4 py-12 relative">
          <div className="w-full max-w-xl">
            {/* 2. Added Animation Container */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100"
              >
                {StepComponents[currentStep]}
              </motion.div>
            </AnimatePresence>

            {/* Step Counter for accessibility */}
            <p className="text-center mt-8 text-slate-400 text-sm font-medium uppercase tracking-widest">
              Step {currentStep} of 5
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}