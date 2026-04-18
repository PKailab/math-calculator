import { Chapter } from './types';

export const chapter5: Chapter = {
  id: "ch5",
  title: "Chapter 5: समांतर श्रेढ़ियाँ",
  inputGuide: "a, d, n डालें (उदा: 2,3,10)",
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
    if (parts.length !== 3) return "त्रुटि: a, d, n को अल्पविराम से अलग करके डालें।";
    const [a, d, n] = parts.map(parseFloat);
    if (isNaN(a) || isNaN(d) || isNaN(n)) return "त्रुटि: अमान्य संख्या।";
    if (n <= 0 || !Number.isInteger(n)) return "त्रुटि: पदों की संख्या (n) एक धनात्मक पूर्णांक होनी चाहिए।";

    const an = a + (n - 1) * d;
    const sn = (n / 2) * (2 * a + (n - 1) * d);

    if (isShort) return `nवाँ पद (a_n) = ${an}\nn पदों का योग (S_n) = ${sn}`;

    return `समांतर श्रेढ़ी (A.P.):
प्रथम पद (a) = ${a}
सार्व अंतर (d) = ${d}
पदों की संख्या (n) = ${n}

Step 1: nवाँ पद (n-th term) ज्ञात करना
सूत्र: a_n = a + (n - 1)d
a_${n} = ${a} + (${n} - 1) × ${d}
a_${n} = ${a} + (${n - 1}) × ${d}
a_${n} = ${a} + ${((n - 1) * d)}
a_${n} = ${an}

Step 2: n पदों का योग (Sum of n terms) ज्ञात करना
सूत्र: S_n = n/2 × [2a + (n - 1)d]
S_${n} = ${n}/2 × [2(${a}) + (${n} - 1)${d}]
S_${n} = ${n / 2} × [${2 * a} + ${((n - 1) * d)}]
S_${n} = ${n / 2} × [${2 * a + (n - 1) * d}]
S_${n} = ${sn}

अंतिम उत्तर:
${n}वाँ पद = ${an}
${n} पदों का योग = ${sn}`;
  },
  subCategories: [
    {
      id: "ch5_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch5_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch5_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch5_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch5_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};