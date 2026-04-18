import { Chapter } from './types';

export const chapter6: Chapter = {
  id: "ch6",
  title: "Chapter 6: त्रिभुज",
  inputGuide: "BPT(a,b,c) या Pytha(लंब,आधार)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    if (inputStr.startsWith("BPT(")) {
      const vals = inputStr.replace("BPT(", "").replace(")", "").split(",");
      if (vals.length !== 3) return "त्रुटि: BPT के लिए 3 मान डालें (AD,DB,AE)।";
      const ad = parseFloat(vals[0]);
      const db = parseFloat(vals[1]);
      const ae = parseFloat(vals[2]);
      const ec = (db * ae) / ad;
      
      if (isShort) return `EC = ${ec}`;
      return `थेल्स प्रमेय (BPT) द्वारा:
AD / DB = AE / EC
${ad} / ${db} = ${ae} / EC
EC = (${db} × ${ae}) / ${ad}
EC = ${ec}`;
    }
    
    if (inputStr.startsWith("Pytha(")) {
      const vals = inputStr.replace("Pytha(", "").replace(")", "").split(",");
      if (vals.length !== 2) return "त्रुटि: 2 मान डालें (लंब,आधार)।";
      const p = parseFloat(vals[0]);
      const b = parseFloat(vals[1]);
      const h = Math.sqrt(p*p + b*b);
      
      if (isShort) return `कर्ण = ${h}`;
      return `पाइथागोरस प्रमेय द्वारा:
कर्ण² = लंब² + आधार²
कर्ण² = ${p}² + ${b}²
कर्ण² = ${p*p} + ${b*b}
कर्ण² = ${p*p + b*b}
कर्ण = √${p*p + b*b}
कर्ण = ${h}`;
    }

    return "त्रुटि: सही फंक्शन चुनें (BPT या Pytha)।";
  },
  subCategories: [
    {
      id: "ch6_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch6_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch6_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch6_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch6_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};