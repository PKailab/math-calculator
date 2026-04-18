import { Chapter } from './types';

export const chapter7: Chapter = {
  id: "ch7",
  title: "Chapter 7: निर्देशांक ज्यामिति",
  inputGuide: "x1,y1,x2,y2 डालें (दूरी सूत्र)",
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
    if (parts.length !== 4) return "त्रुटि: x1, y1, x2, y2 डालें।";
    const [x1, y1, x2, y2] = parts.map(parseFloat);
    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return "त्रुटि: अमान्य संख्या।";

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    if (isShort) return `दूरी (Distance) = √${distSq} ≈ ${dist.toFixed(4)} मात्रक`;

    return `बिंदु A(${x1}, ${y1}) और B(${x2}, ${y2}) के बीच की दूरी

Step 1: दूरी सूत्र (Distance Formula)
d = √[(x2 - x1)² + (y2 - y1)²]

Step 2: मान रखना
d = √[(${x2} - ${x1})² + (${y2} - ${y1})²]
d = √[(${dx})² + (${dy})²]

Step 3: वर्ग करना
d = √[${dx * dx} + ${dy * dy}]
d = √${distSq}

अंतिम उत्तर:
दूरी = ${dist.toFixed(4)} मात्रक (Units)`;
  },
  subCategories: [
    {
      id: "ch7_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch7_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch7_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch7_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch7_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};