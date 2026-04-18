import { Chapter } from './types';

export const chapter4: Chapter = {
  id: "ch4",
  title: "Chapter 4: द्विघात समीकरण",
  inputGuide: "a,b,c डालें (उदा: 1,-5,6)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    const parts = inputStr.split(",");
    if (parts.length !== 3) return "त्रुटि: कृपया a, b, c को अल्पविराम (,) से अलग करके डालें। उदाहरण: 1,-5,6";
    
    const a = parseFloat(parts[0]);
    const b = parseFloat(parts[1]);
    const c = parseFloat(parts[2]);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return "त्रुटि: कृपया a, b, c के लिए सही संख्याएं डालें।";

    const d = (b * b) - (4 * a * c);
    
    let nature = "";
    if (d > 0) nature = "दो भिन्न वास्तविक मूल (Two distinct real roots)";
    else if (d === 0) nature = "दो बराबर वास्तविक मूल (Two equal real roots)";
    else nature = "कोई वास्तविक मूल नहीं (No real roots)";

    if (d < 0) return `समीकरण: ${a}x² + ${b}x + ${c} = 0\nD = ${d}\nप्रकृति: ${nature}`;

    const x1 = (-b + Math.sqrt(d)) / (2 * a);
    const x2 = (-b - Math.sqrt(d)) / (2 * a);

    if (isShort) return `मूल (Roots):\nx₁ = ${x1}\nx₂ = ${x2}\nप्रकृति: ${nature}`;

    return `द्विघात समीकरण: ${a}x² + ${b}x + ${c} = 0

Step 1: गुणांकों की पहचान
a = ${a}, b = ${b}, c = ${c}

Step 2: विविक्तकर (Discriminant, D) ज्ञात करना
D = b² - 4ac
D = (${b})² - 4 × (${a}) × (${c})
D = ${b * b} - ${4 * a * c}
D = ${d}

Step 3: मूलों की प्रकृति (Nature of roots)
चूंकि D = ${d}, इसलिए समीकरण के ${nature} हैं।

Step 4: श्रीधराचार्य सूत्र (Quadratic Formula) का प्रयोग
x = [-b ± √D] / 2a
x = [-(${b}) ± √${d}] / ${2 * a}

धनात्मक (+) चिन्ह लेने पर:
x₁ = (${-b} + ${Math.sqrt(d)}) / ${2 * a} = ${x1}

ऋणात्मक (-) चिन्ह लेने पर:
x₂ = (${-b} - ${Math.sqrt(d)}) / ${2 * a} = ${x2}

अंतिम उत्तर:
मूल ${x1} और ${x2} हैं।`;
  },
  subCategories: [
    {
      id: "ch4_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch4_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch4_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch4_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch4_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};