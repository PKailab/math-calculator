import { Chapter } from './types';

export const chapter12: Chapter = {
  id: "ch12",
  title: "Chapter 11: वृत्तों से संबंधित क्षेत्रफल",
  inputGuide: "Sector(त्रिज्या,कोण) या Arc(त्रिज्या,कोण)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    if (inputStr.startsWith("Sector(")) {
      const vals = inputStr.replace("Sector(", "").replace(")", "").split(",");
      if (vals.length !== 2) return "त्रुटि: 2 मान डालें (त्रिज्या, कोण)।";
      const r = parseFloat(vals[0]);
      const theta = parseFloat(vals[1]);
      
      const area = (theta / 360) * Math.PI * r * r;
      
      if (isShort) return `त्रिज्यखंड का क्षेत्रफल = ${area.toFixed(2)}`;
      return `त्रिज्यखंड का क्षेत्रफल (Area of Sector):
दिया है:
त्रिज्या (r) = ${r}
केंद्रीय कोण (θ) = ${theta}°

सूत्र: क्षेत्रफल = (θ / 360°) × πr²
क्षेत्रफल = (${theta} / 360) × (22/7) × ${r}²
क्षेत्रफल = ${(theta/360).toFixed(4)} × 3.14159 × ${r*r}
क्षेत्रफल ≈ ${area.toFixed(2)} वर्ग इकाई`;
    }
    
    if (inputStr.startsWith("Arc(")) {
      const vals = inputStr.replace("Arc(", "").replace(")", "").split(",");
      if (vals.length !== 2) return "त्रुटि: 2 मान डालें (त्रिज्या, कोण)।";
      const r = parseFloat(vals[0]);
      const theta = parseFloat(vals[1]);
      
      const length = (theta / 360) * 2 * Math.PI * r;
      
      if (isShort) return `चाप की लंबाई = ${length.toFixed(2)}`;
      return `चाप की लंबाई (Length of Arc):
दिया है:
त्रिज्या (r) = ${r}
केंद्रीय कोण (θ) = ${theta}°

सूत्र: लंबाई = (θ / 360°) × 2πr
लंबाई = (${theta} / 360) × 2 × (22/7) × ${r}
लंबाई = ${(theta/360).toFixed(4)} × 2 × 3.14159 × ${r}
लंबाई ≈ ${length.toFixed(2)} इकाई`;
    }

    return "त्रुटि: सही फंक्शन चुनें (Sector या Arc)।";
  },
  subCategories: [
    {
      id: "ch12_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch12_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch12_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch12_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch12_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};