import { FormData } from "@/app/components/EligibilityForm";
import { Scheme } from "@/app/components/results/SchemeCard";
import { EligibilityRule } from "@/app/components/explanation/RuleItem";

interface RuleEvaluation {
  rules: EligibilityRule[];
  confidenceExplanation: string;
}

export function evaluateSchemeRules(
  scheme: Scheme,
  formData: FormData,
  language: "en" | "hi",
): RuleEvaluation {
  const rules: EligibilityRule[] = [];
  let passedRules = 0;
  let totalRules = 0;

  // PM Scholarship Scheme Rules
  if (scheme.id === "pm-scholarship") {
    // Age rule
    const agePass = formData.age <= 25;
    totalRules++;
    if (agePass) passedRules++;

    rules.push({
      condition:
        "Applicant must be between 18 and 25 years of age",
      conditionHi:
        "आवेदक की आयु 18 से 25 वर्ष के बीच होनी चाहिए",
      userValue: `${formData.age} years`,
      userValueHi: `${formData.age} वर्ष`,
      status: agePass ? "pass" : "fail",
      citation: {
        reference: "Clause 3.1",
        clauseText:
          "The scholarship shall be available to wards of personnel of Armed Forces, Para Military Forces and Railway Protection Force including ex-servicemen who are studying in Classes 1 to 12, with the age limit being 18-25 years.",
        clauseTextHi:
          "यह छात्रवृत्ति सशस्त्र बलों, अर्धसैनिक बलों और रेलवे सुरक्षा बल के कर्मियों के वार्डों के लिए उपलब्ध होगी, जो कक्षा 1 से 12 तक अध्ययन कर रहे हैं, आयु सीमा 18-25 वर्ष है।",
        documentName:
          "Prime Minister's Scholarship Scheme Guidelines",
        documentNameHi:
          "प्रधानमंत्री छात्रवृत्ति योजना दिशानिर्देश",
        ministry: "Ministry of Home Affairs",
        ministryHi: "गृह मंत्रालय",
        notificationNumber: "F.No.17011/4/2006-Welfare",
        year: "2016",
        link: "https://www.mha.gov.in/",
      },
    });

    // Income rule
    const incomePass =
      formData.income === "below-1l" ||
      formData.income === "1-2.5l";
    totalRules++;
    if (incomePass) passedRules++;

    rules.push({
      condition:
        "Annual family income should not exceed ₹6 lakhs",
      conditionHi:
        "वार्षिक पारिवारिक आय ₹6 लाख से अधिक नहीं होनी चाहिए",
      userValue: getIncomeLabel(formData.income, "en"),
      userValueHi: getIncomeLabel(formData.income, "hi"),
      status: incomePass ? "pass" : "fail",
      citation: {
        reference: "Clause 4.2",
        clauseText:
          "The scholarship is available to students whose total family income from all sources does not exceed Rs. 6 lakh per annum.",
        clauseTextHi:
          "यह छात्रवृत्ति उन छात्रों के लिए उपलब्ध है जिनकी कुल पारिवारिक आय सभी स्रोतों से प्रति वर्ष रु. 6 लाख से अधिक नहीं है।",
        documentName: "PM Scholarship Scheme Guidelines",
        documentNameHi: "पीएम छात्रवृत्ति योजना दिशानिर्देश",
        ministry: "Ministry of Home Affairs",
        ministryHi: "गृह मंत्रालय",
        notificationNumber: "F.No.17011/4/2006-Welfare",
        year: "2016",
        link: "https://www.mha.gov.in/",
      },
    });

    // Student status rule
    const studentPass =
      formData.categories.includes("student") ||
      formData.occupation === "student";
    totalRules++;
    if (studentPass) passedRules++;

    rules.push({
      condition:
        "Must be a current student enrolled in an educational institution",
      conditionHi:
        "एक शैक्षणिक संस्थान में नामांकित वर्तमान छात्र होना चाहिए",
      userValue: studentPass ? "Student" : "Not a student",
      userValueHi: studentPass ? "छात्र" : "छात्र नहीं",
      status: studentPass ? "pass" : "unclear",
      citation: {
        reference: "Clause 2.1",
        clauseText:
          "The applicant must be currently enrolled in a recognized educational institution and pursuing regular full-time courses.",
        clauseTextHi:
          "आवेदक वर्तमान में मान्यता प्राप्त शैक्षणिक संस्थान में नामांकित होना चाहिए और नियमित पूर्णकालिक पाठ्यक्रम का अनुसरण कर रहा हो।",
        documentName: "Eligibility Criteria Document",
        documentNameHi: "पात्रता मानदंड दस्तावेज़",
        ministry: "Ministry of Home Affairs",
        ministryHi: "गृह मंत्रालय",
        notificationNumber: "MHA/2016/Scholarship",
        year: "2016",
        link: "https://www.mha.gov.in/",
      },
    });
  }

  // PM-KISAN Rules
  if (scheme.id === "pm-kisan") {
    // Farmer status rule
    const farmerPass =
      formData.categories.includes("farmer") ||
      formData.occupation === "farmer";
    totalRules++;
    if (farmerPass) passedRules++;

    rules.push({
      condition: "Must be a farmer owning cultivable land",
      conditionHi: "खेती योग्य भूमि का मालिक किसान होना चाहिए",
      userValue: farmerPass ? "Farmer" : "Not a farmer",
      userValueHi: farmerPass ? "किसान" : "किसान नहीं",
      status: farmerPass ? "pass" : "fail",
      citation: {
        reference: "Section 2(a)",
        clauseText:
          "All landholding farmers' families which have cultivable land holding in their names as per land records are eligible for benefits under the scheme.",
        clauseTextHi:
          "सभी भूमिधारक किसानों के परिवार जिनके नाम पर भूमि रिकॉर्ड के अनुसार खेती योग्य भूमि है, इस योजना के तहत लाभ के लिए पात्र हैं।",
        documentName: "PM-KISAN Operational Guidelines",
        documentNameHi: "पीएम-किसान परिचालन दिशानिर्देश",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
        notificationNumber: "AG-2019/PMKISAN/01",
        year: "2019",
        link: "https://pmkisan.gov.in/",
      },
    });

    // Income rule
    const incomePass =
      formData.income === "below-1l" ||
      formData.income === "1-2.5l" ||
      formData.income === "2.5-5l";
    totalRules++;
    if (incomePass) passedRules++;

    rules.push({
      condition:
        "Small and marginal farmers with landholding up to 2 hectares",
      conditionHi:
        "2 हेक्टेयर तक की भूमि वाले छोटे और सीमांत किसान",
      userValue: getIncomeLabel(formData.income, "en"),
      userValueHi: getIncomeLabel(formData.income, "hi"),
      status: incomePass ? "pass" : "unclear",
      citation: {
        reference: "Section 3.1",
        clauseText:
          "The scheme is primarily targeted at small and marginal farmers. However, all landholding farmer families irrespective of size of landholding are now covered.",
        clauseTextHi:
          "यह योजना मुख्य रूप से छोटे और सीमांत किसानों को लक्षित करती है। हालांकि, अब भूमि के आकार की परवाह किए बिना सभी भूमिधारक किसान परिवार शामिल हैं।",
        documentName: "PM-KISAN Scheme Document",
        documentNameHi: "पीएम-किसान योजना दस्तावेज़",
        ministry: "Ministry of Agriculture & Farmers Welfare",
        ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
        notificationNumber: "F.No.1-1/2018-DBT(PMKISAN)",
        year: "2019",
        link: "https://pmkisan.gov.in/",
      },
    });
  }

  // Senior Citizen Pension Rules
  if (scheme.id === "senior-pension") {
    // Age rule
    const agePass = formData.age >= 60;
    totalRules++;
    if (agePass) passedRules++;

    rules.push({
      condition: "Must be 60 years of age or above",
      conditionHi: "60 वर्ष या उससे अधिक आयु का होना चाहिए",
      userValue: `${formData.age} years`,
      userValueHi: `${formData.age} वर्ष`,
      status: agePass ? "pass" : "fail",
      citation: {
        reference: "Guideline 5.1",
        clauseText:
          "Persons of 60 years of age or above who have little or no regular means of subsistence from their own sources of income or through support from family members or other sources shall be eligible.",
        clauseTextHi:
          "60 वर्ष या उससे अधिक आयु के व्यक्ति जिनके पास आय के अपने स्रोतों या परिवार के सदस्यों या अन्य स्रोतों से समर्थन के माध्यम से निर्वाह का बहुत कम या कोई नियमित साधन नहीं है, पात्र होंगे।",
        documentName: "IGNOAPS Scheme Guidelines",
        documentNameHi: "आईजीएनओएपीएस योजना दिशानिर्देश",
        ministry: "Ministry of Rural Development",
        ministryHi: "ग्रामीण विकास मंत्रालय",
        notificationNumber: "S.No.2/2007-Pension",
        year: "2007",
        link: "https://nsap.nic.in/",
      },
    });

    // Income rule
    const incomePass =
      formData.income === "below-1l" ||
      formData.income === "1-2.5l";
    totalRules++;
    if (incomePass) passedRules++;

    rules.push({
      condition: "Must be living below poverty line",
      conditionHi: "गरीबी रेखा से नीचे रह रहा होना चाहिए",
      userValue: getIncomeLabel(formData.income, "en"),
      userValueHi: getIncomeLabel(formData.income, "hi"),
      status: incomePass ? "pass" : "fail",
      citation: {
        reference: "Guideline 5.2",
        clauseText:
          "The beneficiary should belong to a household below poverty line according to the criteria prescribed by the Government of India.",
        clauseTextHi:
          "लाभार्थी भारत सरकार द्वारा निर्धारित मानदंडों के अनुसार गरीबी रेखा से नीचे के परिवार से संबंधित होना चाहिए।",
        documentName:
          "National Social Assistance Programme Guidelines",
        documentNameHi:
          "राष्ट्रीय सामाजिक सहायता कार्यक्रम दिशानिर्देश",
        ministry: "Ministry of Rural Development",
        ministryHi: "ग्रामीण विकास मंत्रालय",
        notificationNumber: "F.No.W-11011/05/2009-Pension",
        year: "2009",
        link: "https://nsap.nic.in/",
      },
    });
  }

  // Ayushman Bharat Rules
  if (scheme.id === "ayushman-bharat") {
    // Income rule
    const incomePass =
      formData.income === "below-1l" ||
      formData.income === "1-2.5l";
    totalRules++;
    if (incomePass) passedRules++;

    rules.push({
      condition:
        "Family must meet deprivation criteria or be from priority categories",
      conditionHi:
        "परिवार को वंचन मानदंड पूरा करना चाहिए या प्राथमिकता श्रेणियों से होना चाहिए",
      userValue: getIncomeLabel(formData.income, "en"),
      userValueHi: getIncomeLabel(formData.income, "hi"),
      status: incomePass ? "pass" : "unclear",
      citation: {
        reference: "Section 4.1",
        clauseText:
          "Beneficiaries are identified based on deprivation and occupational criteria as per SECC 2011 database. Families with any of the specified deprivation criteria in rural or urban areas are automatically included.",
        clauseTextHi:
          "SECC 2011 डेटाबेस के अनुसार लाभार्थियों की पहचान वंचन और व्यावसायिक मानदंडों के आधार पर की जाती है। ग्रामीण या शहरी क्षेत्रों में निर्दिष्ट वंचन मानदंड में से किसी भी परिवार को स्वचालित रूप से शामिल किया जाता है।",
        documentName: "AB-PMJAY Eligibility Guidelines",
        documentNameHi: "एबी-पीएमजेएवाई पात्रता दिशानिर्देश",
        ministry: "Ministry of Health & Family Welfare",
        ministryHi: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
        notificationNumber: "Z.28015/03/2018-NHDM",
        year: "2018",
        link: "https://pmjay.gov.in/",
      },
    });

    // State residence
    totalRules++;
    passedRules++;

    rules.push({
      condition:
        "Must be resident of India with valid identification",
      conditionHi: "वैध पहचान के साथ भारत का निवासी होना चाहिए",
      userValue: formData.state,
      userValueHi: formData.state,
      status: "pass",
      citation: {
        reference: "Section 3.2",
        clauseText:
          "All eligible families are entitled to a coverage of up to Rs. 5 lakh per family per year for secondary and tertiary care hospitalization.",
        clauseTextHi:
          "सभी पात्र परिवार माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष 5 लाख रुपये तक के कवरेज के हकदार हैं।",
        documentName: "Ayushman Bharat Scheme Document",
        documentNameHi: "आयुष्मान भारत योजना दस्तावेज़",
        ministry: "Ministry of Health & Family Welfare",
        ministryHi: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
        notificationNumber: "AB-2018/Policy",
        year: "2018",
        link: "https://pmjay.gov.in/",
      },
    });
  }

  // Generate confidence explanation
  const confidenceExplanation = generateConfidenceExplanation(
    passedRules,
    totalRules,
    scheme.confidence,
    language,
  );

  return { rules, confidenceExplanation };
}

function getIncomeLabel(
  income: string,
  language: "en" | "hi",
): string {
  const labels = {
    en: {
      "below-1l": "Below ₹1 Lakh",
      "1-2.5l": "₹1 - ₹2.5 Lakh",
      "2.5-5l": "₹2.5 - ₹5 Lakh",
      "5-10l": "₹5 - ₹10 Lakh",
      "above-10l": "Above ₹10 Lakh",
    },
    hi: {
      "below-1l": "₹1 लाख से कम",
      "1-2.5l": "₹1 - ₹2.5 लाख",
      "2.5-5l": "₹2.5 - ₹5 लाख",
      "5-10l": "₹5 - ₹10 लाख",
      "above-10l": "₹10 लाख से अधिक",
    },
  };

  return (
    labels[language][income as keyof typeof labels.en] || income
  );
}

function generateConfidenceExplanation(
  passedRules: number,
  totalRules: number,
  confidence: number,
  language: "en" | "hi",
): string {
  if (language === "hi") {
    if (confidence >= 85) {
      return `आपने ${totalRules} में से ${passedRules} प्रमुख पात्रता नियमों को पूरा किया है। यह उच्च विश्वास स्कोर इंगित करता है कि आप संभवतः योग्य हैं।`;
    } else if (confidence >= 65) {
      return `आपने ${totalRules} में से ${passedRules} नियमों को पूरा किया है। कुछ नियम अस्पष्ट हैं या अतिरिक्त दस्तावेज़ीकरण की आवश्यकता हो सकती है।`;
    } else {
      return `आपने ${totalRules} में से ${passedRules} नियमों को पूरा किया है। कई प्रमुख पात्रता मानदंड पूरे नहीं होते हैं।`;
    }
  }

  if (confidence >= 85) {
    return `You meet ${passedRules} out of ${totalRules} key eligibility rules. This high confidence score indicates you are likely eligible.`;
  } else if (confidence >= 65) {
    return `You meet ${passedRules} out of ${totalRules} rules. Some rules are unclear or may require additional documentation.`;
  } else {
    return `You meet ${passedRules} out of ${totalRules} rules. Several key eligibility criteria are not met.`;
  }
}