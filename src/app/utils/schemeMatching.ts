import { FormData } from '@/app/components/EligibilityForm';
import { Scheme } from '@/app/components/results/SchemeCard';

// Mock scheme matching logic - in production this would use actual eligibility rules
export function generateSchemeResults(formData: FormData): Scheme[] {
  const schemes: Scheme[] = [];

  // Student schemes
  if (formData.categories.includes('student') || formData.occupation === 'student') {
    schemes.push({
      id: 'pm-scholarship',
      name: 'Prime Minister\'s Scholarship Scheme',
      nameHi: 'प्रधानमंत्री छात्रवृत्ति योजना',
      ministry: 'Ministry of Home Affairs',
      ministryHi: 'गृह मंत्रालय',
      status: formData.age <= 25 && formData.income === 'below-1l' ? 'high' : 'conditional',
      confidence: formData.age <= 25 && formData.income === 'below-1l' ? 92 : 68
    });
  }

  // Farmer schemes
  if (formData.categories.includes('farmer') || formData.occupation === 'farmer') {
    schemes.push({
      id: 'pm-kisan',
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      nameHi: 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)',
      ministry: 'Ministry of Agriculture & Farmers Welfare',
      ministryHi: 'कृषि एवं किसान कल्याण मंत्रालय',
      status: formData.income === 'below-1l' || formData.income === '1-2.5l' ? 'high' : 'conditional',
      confidence: formData.income === 'below-1l' || formData.income === '1-2.5l' ? 88 : 72
    });
  }

  // Women schemes
  if (formData.categories.includes('woman')) {
    schemes.push({
      id: 'sukanya-samriddhi',
      name: 'Sukanya Samriddhi Yojana',
      nameHi: 'सुकन्या समृद्धि योजना',
      ministry: 'Ministry of Finance',
      ministryHi: 'वित्त मंत्रालय',
      status: formData.age <= 10 ? 'high' : 'unlikely',
      confidence: formData.age <= 10 ? 95 : 35
    });
  }

  // Senior citizen schemes
  if (formData.categories.includes('senior-citizen') || formData.age >= 60) {
    schemes.push({
      id: 'senior-pension',
      name: 'Indira Gandhi National Old Age Pension Scheme',
      nameHi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
      ministry: 'Ministry of Rural Development',
      ministryHi: 'ग्रामीण विकास मंत्रालय',
      status: formData.age >= 60 && (formData.income === 'below-1l' || formData.income === '1-2.5l') ? 'high' : 'conditional',
      confidence: formData.age >= 60 && (formData.income === 'below-1l' || formData.income === '1-2.5l') ? 94 : 65
    });
  }

  // Person with disability schemes
  if (formData.categories.includes('person-with-disability')) {
    schemes.push({
      id: 'disability-pension',
      name: 'Indira Gandhi National Disability Pension Scheme',
      nameHi: 'इंदिरा गांधी राष्ट्रीय विकलांगता पेंशन योजना',
      ministry: 'Ministry of Rural Development',
      ministryHi: 'ग्रामीण विकास मंत्रालय',
      status: formData.age >= 18 && (formData.income === 'below-1l' || formData.income === '1-2.5l') ? 'high' : 'conditional',
      confidence: formData.age >= 18 && (formData.income === 'below-1l' || formData.income === '1-2.5l') ? 90 : 70
    });
  }

  // MSME schemes
  if (formData.occupation === 'msme') {
    schemes.push({
      id: 'mudra-yojana',
      name: 'Pradhan Mantri MUDRA Yojana',
      nameHi: 'प्रधानमंत्री मुद्रा योजना',
      ministry: 'Ministry of Finance',
      ministryHi: 'वित्त मंत्रालय',
      status: 'high',
      confidence: 85
    });
  }

  // Unemployed schemes
  if (formData.occupation === 'unemployed') {
    schemes.push({
      id: 'skill-india',
      name: 'Pradhan Mantri Kaushal Vikas Yojana',
      nameHi: 'प्रधानमंत्री कौशल विकास योजना',
      ministry: 'Ministry of Skill Development & Entrepreneurship',
      ministryHi: 'कौशल विकास और उद्यमिता मंत्रालय',
      status: formData.age >= 18 && formData.age <= 35 ? 'high' : 'conditional',
      confidence: formData.age >= 18 && formData.age <= 35 ? 87 : 62
    });
  }

  // Health insurance (for all low-income)
  if (formData.income === 'below-1l' || formData.income === '1-2.5l') {
    schemes.push({
      id: 'ayushman-bharat',
      name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
      nameHi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      ministry: 'Ministry of Health & Family Welfare',
      ministryHi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
      status: 'high',
      confidence: 91
    });
  }

  // Sort by confidence (highest first)
  return schemes.sort((a, b) => b.confidence - a.confidence);
}
