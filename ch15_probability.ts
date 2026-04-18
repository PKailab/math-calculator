import { Chapter } from './types';

export const chapter15: Chapter = {
  id: "ch15",
  title: "Chapter 14: प्रायिकता",
  inputGuide: "अनुकूल परिणाम, कुल परिणाम (उदा: 3,6)",
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
    if (parts.length !== 2) return "त्रुटि: कृपया अनुकूल परिणाम और कुल परिणाम को अल्पविराम (,) से अलग करके डालें। उदाहरण: 3,6";
    
    const favorable = parseFloat(parts[0]);
    const total = parseFloat(parts[1]);
    
    if (isNaN(favorable) || isNaN(total)) return "त्रुटि: कृपया सही संख्याएं डालें।";
    if (total === 0) return "त्रुटि: कुल परिणाम 0 नहीं हो सकता।";
    if (favorable < 0 || total < 0) return "त्रुटि: परिणाम ऋणात्मक (Negative) नहीं हो सकते।";
    if (favorable > total) return "त्रुटि: अनुकूल परिणाम, कुल परिणाम से अधिक नहीं हो सकते।";

    const probability = favorable / total;

    // Function to find GCD for fraction simplification
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };

    const divisor = gcd(favorable, total);
    const simpFav = favorable / divisor;
    const simpTotal = total / divisor;

    if (isShort) return `P(E) = ${favorable}/${total} = ${simpFav}/${simpTotal} = ${probability.toFixed(4)}`;

    return `प्रायिकता (Probability) की गणना:

Step 1: दिए गए मान
अनुकूल परिणामों की संख्या (Favorable Outcomes) = ${favorable}
कुल संभव परिणामों की संख्या (Total Possible Outcomes) = ${total}

Step 2: प्रायिकता का सूत्र (Probability Formula)
P(E) = (अनुकूल परिणामों की संख्या) / (कुल संभव परिणामों की संख्या)

Step 3: मान रखना
P(E) = ${favorable} / ${total}

Step 4: भिन्न को सरल करना (Simplifying the fraction)
P(E) = ${simpFav} / ${simpTotal}

Step 5: दशमलव रूप (Decimal Form)
P(E) = ${probability.toFixed(4)}

अंतिम उत्तर:
घटना E की प्रायिकता ${simpFav}/${simpTotal} या ${probability.toFixed(4)} है।`;
  },
  subCategories: [
    {
      id: "ch15_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch15_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch15_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch15_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch15_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};