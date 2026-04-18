import { Chapter } from './types';

export const chapter3: Chapter = {
  id: "ch3",
  title: "Chapter 3: दो चर वाले रैखिक समीकरण",
  inputGuide: "a1,b1,c1,a2,b2,c2 डालें",
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
    if (parts.length !== 6) return "त्रुटि: 6 मान डालें (a1,b1,c1,a2,b2,c2)। उदाहरण: 2,3,5,4,-1,9";
    const [a1, b1, c1, a2, b2, c2] = parts.map(parseFloat);
    if (parts.some(p => isNaN(parseFloat(p)))) return "त्रुटि: अमान्य संख्या।";

    // Check conditions for solutions
    const aRatio = a1 / a2;
    const bRatio = b1 / b2;
    const cRatio = c1 / c2;

    // Floating point comparison tolerance
    const epsilon = 0.000001;
    const isAEqB = Math.abs(aRatio - bRatio) < epsilon;
    const isBEqC = Math.abs(bRatio - cRatio) < epsilon;

    if (isAEqB) {
      if (isBEqC) {
        return `समीकरण युग्म:\n(1) ${a1}x + ${b1}y = ${c1}\n(2) ${a2}x + ${b2}y = ${c2}\n\nचूंकि a1/a2 = b1/b2 = c1/c2 है,\nअतः इन समीकरणों के अपरिमित रूप से अनेक हल (Infinite Solutions) हैं। (संपाती रेखाएं)`;
      } else {
        return `समीकरण युग्म:\n(1) ${a1}x + ${b1}y = ${c1}\n(2) ${a2}x + ${b2}y = ${c2}\n\nचूंकि a1/a2 = b1/b2 ≠ c1/c2 है,\nअतः इन समीकरणों का कोई हल नहीं (No Solution) है। (समांतर रेखाएं)`;
      }
    }

    // Unique solution using Elimination Method (विलोपन विधि)
    const D = a1 * b2 - a2 * b1;
    const x = (c1 * b2 - c2 * b1) / D;
    const y = (a1 * c2 - a2 * c1) / D;

    if (isShort) return `x = ${x}\ny = ${y}\n(अद्वितीय हल / Unique Solution)`;

    return `रैखिक समीकरण युग्म (Linear Equations):
(1)  ${a1}x + ${b1}y = ${c1}
(2)  ${a2}x + ${b2}y = ${c2}

विलोपन विधि (Elimination Method) द्वारा:

Step 1: 'y' के गुणांकों को समान करने के लिए:
समीकरण (1) को ${Math.abs(b2)} से गुणा करने पर:
(${a1 * Math.abs(b2)})x + (${b1 * Math.abs(b2)})y = ${c1 * Math.abs(b2)}  --- (3)

समीकरण (2) को ${Math.abs(b1)} से गुणा करने पर:
(${a2 * Math.abs(b1)})x + (${b2 * Math.abs(b1)})y = ${c2 * Math.abs(b1)}  --- (4)

Step 2: समीकरणों को घटाने/जोड़ने पर ('y' को विलुप्त करने के लिए):
(${a1 * b2})x - (${a2 * b1})x = (${c1 * b2}) - (${c2 * b1})
(${a1 * b2 - a2 * b1})x = ${c1 * b2 - c2 * b1}

Step 3: 'x' का मान ज्ञात करना:
x = ${c1 * b2 - c2 * b1} / ${a1 * b2 - a2 * b1}
x = ${x}

Step 4: 'x' का मान समीकरण (1) में रखने पर (प्रतिस्थापन):
${a1}(${x}) + ${b1}y = ${c1}
${a1 * x} + ${b1}y = ${c1}
${b1}y = ${c1} - (${a1 * x})
${b1}y = ${c1 - (a1 * x)}
y = ${c1 - (a1 * x)} / ${b1}
y = ${y}

अंतिम उत्तर:
x = ${x}
y = ${y}`;
  },
  subCategories: [
    {
      id: "ch3_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch3_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch3_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch3_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch3_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};