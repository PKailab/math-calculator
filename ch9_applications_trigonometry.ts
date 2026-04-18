import { Chapter } from './types';

export const chapter9: Chapter = {
  id: "ch9",
  title: "Chapter 9: त्रिकोणमिति के अनुप्रयोग",
  inputGuide: "Height(कोण,दूरी) या Dist(कोण,ऊंचाई)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    if (inputStr.startsWith("Height(")) {
      const vals = inputStr.replace("Height(", "").replace(")", "").split(",");
      if (vals.length !== 2) return "त्रुटि: 2 मान डालें (कोण,दूरी)।";
      const angle = parseFloat(vals[0]);
      const dist = parseFloat(vals[1]);
      
      const rad = angle * (Math.PI / 180);
      const height = dist * Math.tan(rad);
      
      if (isShort) return `ऊंचाई = ${height.toFixed(2)}`;
      return `ऊंचाई और दूरी (Heights and Distances):
दिया है:
उन्नयन कोण (θ) = ${angle}°
आधार से दूरी (d) = ${dist}

सूत्र: tan(θ) = लंब / आधार
tan(${angle}°) = ऊंचाई / ${dist}
ऊंचाई = ${dist} × tan(${angle}°)
ऊंचाई = ${dist} × ${Math.tan(rad).toFixed(4)}
ऊंचाई ≈ ${height.toFixed(2)}`;
    }

    return "त्रुटि: सही फंक्शन चुनें (Height)।";
  },
  subCategories: [
    {
      id: "ch9_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch9_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch9_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch9_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch9_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};