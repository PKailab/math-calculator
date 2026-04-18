import { Chapter } from './types';

export const chapter2: Chapter = {
  id: "ch2",
  title: "Chapter 2: बहुपद",
  inputGuide: "a,b,c डालें (उदा: 1,-5,6)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    const parts = inputStr.split(",");
    if (parts.length !== 3) return "त्रुटि: कृपया a, b, c को अल्पविराम (,) से अलग करके डालें। उदाहरण: 1,-5,6";
    
    const a = parseFloat(parts[0]);
    const b = parseFloat(parts[1]);
    const c = parseFloat(parts[2]);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return "त्रुटि: कृपया a, b, c के लिए सही संख्याएं डालें।";

    const d = (b * b) - (4 * a * c);
    if (d < 0) return "इस बहुपद के वास्तविक शून्यक (Real Zeros) नहीं हैं।";
    
    const alpha = (-b + Math.sqrt(d)) / (2 * a);
    const beta = (-b - Math.sqrt(d)) / (2 * a);
    
    if (isShort) return `शून्यक (Zeros):\nα = ${alpha}\nβ = ${beta}\n\nसंबंध:\nα + β = ${-b/a}\nα × β = ${c/a}`;

    return `बहुपद: (${a}x²) + (${b}x) + (${c})

Step 1: शून्यक ज्ञात करने के लिए p(x) = 0 रखें।
x = [-b ± √(b² - 4ac)] / 2a

Step 2: D (विविक्तकर) = b² - 4ac
D = (${b})² - 4(${a})(${c})
D = ${b * b} - ${4 * a * c} = ${d}

Step 3: शून्यक (α और β):
α = (${-b} + √${d}) / ${2 * a} = ${alpha}
β = (${-b} - √${d}) / ${2 * a} = ${beta}

Step 4: शून्यकों और गुणांकों के बीच संबंध की सत्यता:
(i) शून्यकों का योगफल (α + β) = ${alpha} + ${beta} = ${alpha + beta}
    सूत्र से: -b / a = -(${b}) / ${a} = ${-b/a}
    (सत्यापित)
    
(ii) शून्यकों का गुणनफल (α × β) = ${alpha} × ${beta} = ${alpha * beta}
     सूत्र से: c / a = ${c} / ${a} = ${c/a}
     (सत्यापित)`;
  },
  subCategories: [
    {
      id: "ch2_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch2_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch2_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch2_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch2_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};