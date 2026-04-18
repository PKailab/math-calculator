export const translations: Record<string, { en: string, hi: string }> = {
  // Main Chapter Titles
  "Calculator (कैलकुलेटर)": { en: "Calculator", hi: "कैलकुलेटर" },
  "Chapter 1: वास्तविक संख्याएँ": { en: "Ch 1: Real Numbers", hi: "अध्याय 1: वास्तविक संख्याएँ" },
  "Chapter 2: बहुपद": { en: "Ch 2: Polynomials", hi: "अध्याय 2: बहुपद" },
  "Chapter 3: दो चर वाले रैखिक समीकरण": { en: "Ch 3: Linear Equations", hi: "अध्याय 3: दो चर वाले रैखिक समीकरण" },
  "Chapter 4: द्विघात समीकरण": { en: "Ch 4: Quadratic Equations", hi: "अध्याय 4: द्विघात समीकरण" },
  "Chapter 5: समांतर श्रेढ़ियाँ": { en: "Ch 5: Arithmetic Progressions", hi: "अध्याय 5: समांतर श्रेढ़ियाँ" },
  "Chapter 6: त्रिभुज": { en: "Ch 6: Triangles", hi: "अध्याय 6: त्रिभुज" },
  "Chapter 7: निर्देशांक ज्यामिति": { en: "Ch 7: Coordinate Geometry", hi: "अध्याय 7: निर्देशांक ज्यामिति" },
  "Chapter 8: त्रिकोणमिति का परिचय": { en: "Ch 8: Intro to Trigonometry", hi: "अध्याय 8: त्रिकोणमिति का परिचय" },
  "Chapter 9: त्रिकोणमिति के अनुप्रयोग": { en: "Ch 9: Apps of Trigonometry", hi: "अध्याय 9: त्रिकोणमिति के अनुप्रयोग" },
  "Chapter 10: वृत्त": { en: "Ch 10: Circles", hi: "अध्याय 10: वृत्त" },
  "Chapter 11: वृत्तों से संबंधित क्षेत्रफल": { en: "Ch 11: Areas Related to Circles", hi: "अध्याय 11: वृत्तों से संबंधित क्षेत्रफल" },
  "Chapter 12: पृष्ठीय क्षेत्रफल और आयतन": { en: "Ch 12: Surface Areas & Volumes", hi: "अध्याय 12: पृष्ठीय क्षेत्रफल और आयतन" },
  "Chapter 13: सांख्यिकी": { en: "Ch 13: Statistics", hi: "अध्याय 13: सांख्यिकी" },
  "Chapter 14: प्रायिकता": { en: "Ch 14: Probability", hi: "अध्याय 14: प्रायिकता" },
  "📚 गणित के सभी सूत्र (Formulas)": { en: "📚 All Math Formulas", hi: "📚 गणित के सभी सूत्र (Formulas)" },

  // Sub-Categories
  "Simple (साधारण)": { en: "Simple", hi: "साधारण" },
  "Scientific (वैज्ञानिक)": { en: "Scientific", hi: "वैज्ञानिक" },
  "अपरिमेय सिद्ध करें": { en: "Prove Irrational", hi: "अपरिमेय सिद्ध करें" },
  "LCM / HCF": { en: "LCM / HCF", hi: "LCM / HCF" },
  "अभाज्य गुणनखंड": { en: "Prime Factors", hi: "अभाज्य गुणनखंड" },
  "सांत/असांत दशमलव": { en: "Terminating Decimals", hi: "सांत/असांत दशमलव" },
  "यूक्लिड विभाजन": { en: "Euclid's Division", hi: "यूक्लिड विभाजन" },

  "सब-कैटिगरी 1": { en: "Sub-category 1", hi: "सब-कैटिगरी 1" },
  "सब-कैटिगरी 2": { en: "Sub-category 2", hi: "सब-कैटिगरी 2" },
  "सब-कैटिगरी 3": { en: "Sub-category 3", hi: "सब-कैटिगरी 3" },
  "सब-कैटिगरी 4": { en: "Sub-category 4", hi: "सब-कैटिगरी 4" },
  "सब-कैटिगरी 5": { en: "Sub-category 5", hi: "सब-कैटिगरी 5" },
  "Dictionary / Definition": { hi: "शब्दकोश / परिभाषाएँ", en: "Dictionary / Definition" },
  "MATH": { hi: "गणित", en: "MATH" },
  "STEP": { hi: "चरण", en: "STEP" },
};

export const t = (text: string, lang: string): string => {
  if (translations[text]) {
    return lang === 'hi' ? translations[text].hi : translations[text].en;
  }
  return text; // fallback
};
