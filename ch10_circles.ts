import { Chapter } from './types';

export const chapter10: Chapter = {
  id: "ch10",
  title: "Chapter 10: वृत्त",
  inputGuide: "Tangent(त्रिज्या,दूरी)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    if (inputStr.startsWith("Tangent(")) {
      const vals = inputStr.replace("Tangent(", "").replace(")", "").split(",");
      if (vals.length !== 2) return "त्रुटि: 2 मान डालें (त्रिज्या, केंद्र से दूरी)।";
      const r = parseFloat(vals[0]);
      const d = parseFloat(vals[1]);
      
      if (r >= d) return "त्रुटि: केंद्र से दूरी त्रिज्या से बड़ी होनी चाहिए।";
      
      const t = Math.sqrt(d*d - r*r);
      
      if (isShort) return `स्पर्श रेखा की लंबाई = ${t.toFixed(2)}`;
      return `वृत्त की स्पर्श रेखा (Tangent to a Circle):
दिया है:
त्रिज्या (r) = ${r}
केंद्र से बिंदु की दूरी (d) = ${d}

प्रमेय: स्पर्श रेखा और त्रिज्या के बीच 90° का कोण होता है।
पाइथागोरस प्रमेय से:
d² = r² + t²
${d}² = ${r}² + t²
${d*d} = ${r*r} + t²
t² = ${d*d} - ${r*r} = ${d*d - r*r}
t = √${d*d - r*r}
स्पर्श रेखा की लंबाई (t) ≈ ${t.toFixed(2)}`;
    }

    return "त्रुटि: सही फंक्शन चुनें (Tangent)।";
  },
  subCategories: [
    {
      id: "ch10_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch10_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch10_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch10_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch10_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};