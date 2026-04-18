import { Chapter } from './types';

export const chapter8: Chapter = {
  id: "ch8",
  title: "Chapter 8: त्रिकोणमिति का परिचय",
  inputGuide: "कोण डालें (0, 30, 45, 60, 90)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    const angle = parseFloat(inputStr);
    if (isNaN(angle)) return "त्रुटि: कृपया एक कोण (Angle) डालें।";

    const rad = angle * (Math.PI / 180);
    
    let sin, cos, tan, cosec, sec, cot;
    if (angle === 0) { sin="0"; cos="1"; tan="0"; cosec="अपरिभाषित (∞)"; sec="1"; cot="अपरिभाषित (∞)"; }
    else if (angle === 30) { sin="1/2"; cos="√3/2"; tan="1/√3"; cosec="2"; sec="2/√3"; cot="√3"; }
    else if (angle === 45) { sin="1/√2"; cos="1/√2"; tan="1"; cosec="√2"; sec="√2"; cot="1"; }
    else if (angle === 60) { sin="√3/2"; cos="1/2"; tan="√3"; cosec="2/√3"; sec="2"; cot="1/√3"; }
    else if (angle === 90) { sin="1"; cos="0"; tan="अपरिभाषित (∞)"; cosec="1"; sec="अपरिभाषित (∞)"; cot="0"; }
    else {
      sin = Math.sin(rad).toFixed(4);
      cos = Math.cos(rad).toFixed(4);
      tan = Math.tan(rad).toFixed(4);
      cosec = (1/Math.sin(rad)).toFixed(4);
      sec = (1/Math.cos(rad)).toFixed(4);
      cot = (1/Math.tan(rad)).toFixed(4);
    }

    if (isShort) return `sin(${angle}°) = ${sin}\ncos(${angle}°) = ${cos}\ntan(${angle}°) = ${tan}`;

    return `त्रिकोणमितीय अनुपात (Trigonometric Ratios) कोण ${angle}° के लिए:

sin(${angle}°) = ${sin}
cos(${angle}°) = ${cos}
tan(${angle}°) = ${tan}

cosec(${angle}°) = 1 / sin(${angle}°) = ${cosec}
sec(${angle}°) = 1 / cos(${angle}°) = ${sec}
cot(${angle}°) = 1 / tan(${angle}°) = ${cot}`;
  },
  subCategories: [
    {
      id: "ch8_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch8_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch8_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch8_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch8_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};