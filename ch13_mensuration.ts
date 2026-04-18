import { Chapter } from './types';

export const chapter13: Chapter = {
  id: "ch13",
  title: "Chapter 12: पृष्ठीय क्षेत्रफल और आयतन",
  inputGuide: "आकार चुनें और मान डालें (उदा: बेलन(7,10))",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    const match = inputStr.match(/^([^\(]+)\((.*)\)$/);
    if (!match) {
      return `निर्देश: कीबोर्ड से आकार चुनें और ब्रैकेट में मान डालें।
उदाहरण:
- घन(भुजा) -> घन(5)
- घनाभ(लंबाई,चौड़ाई,ऊंचाई) -> घनाभ(10,5,2)
- बेलन(त्रिज्या,ऊंचाई) -> बेलन(7,10)
- शंकु(त्रिज्या,ऊंचाई) -> शंकु(3,4)
- गोला(त्रिज्या) -> गोला(7)
- अर्धगोला(त्रिज्या) -> अर्धगोला(7)`;
    }

    const shape = match[1].trim();
    const argsStr = match[2].trim();
    if (!argsStr) return "त्रुटि: ब्रैकेट के अंदर मान डालें।";
    
    const args = argsStr.split(",").map(parseFloat);
    if (args.some(isNaN)) return "त्रुटि: अमान्य संख्या।";

    const piStr = "22/7";
    const piVal = 22 / 7;

    if (shape === "घन") {
      if (args.length !== 1) return "त्रुटि: घन के लिए 1 मान (भुजा) डालें।";
      const a = args[0];
      const vol = a * a * a;
      const csa = 4 * a * a;
      const tsa = 6 * a * a;
      
      if (isShort) return `घन: आयतन=${vol.toFixed(2)}, वक्र पृष्ठ=${csa.toFixed(2)}, कुल पृष्ठ=${tsa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
घन की भुजा (a) = ${a}

1. घन का आयतन (Volume):
   सूत्र: V = a³
   मान रखने पर: V = (${a})³
   V = ${vol.toFixed(2)}

2. घन का पार्श्व पृष्ठीय क्षेत्रफल (LSA):
   सूत्र: LSA = 4a²
   मान रखने पर: LSA = 4 × (${a})²
   LSA = 4 × ${a*a} = ${csa.toFixed(2)}

3. घन का कुल पृष्ठीय क्षेत्रफल (TSA):
   सूत्र: TSA = 6a²
   मान रखने पर: TSA = 6 × (${a})²
   TSA = 6 × ${a*a} = ${tsa.toFixed(2)}`;
    } 
    else if (shape === "घनाभ") {
      if (args.length !== 3) return "त्रुटि: घनाभ के लिए 3 मान (l,b,h) डालें।";
      const [l, b, h] = args;
      const vol = l * b * h;
      const csa = 2 * h * (l + b);
      const tsa = 2 * (l * b + b * h + h * l);
      
      if (isShort) return `घनाभ: आयतन=${vol.toFixed(2)}, वक्र पृष्ठ=${csa.toFixed(2)}, कुल पृष्ठ=${tsa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
घनाभ की लंबाई (l) = ${l}
घनाभ की चौड़ाई (b) = ${b}
घनाभ की ऊंचाई (h) = ${h}

1. घनाभ का आयतन (Volume):
   सूत्र: V = l × b × h
   मान रखने पर: V = ${l} × ${b} × ${h}
   V = ${vol.toFixed(2)}

2. घनाभ का पार्श्व पृष्ठीय क्षेत्रफल (LSA):
   सूत्र: LSA = 2h(l + b)
   मान रखने पर: LSA = 2 × ${h} × (${l} + ${b})
   LSA = ${2*h} × ${l+b} = ${csa.toFixed(2)}

3. घनाभ का कुल पृष्ठीय क्षेत्रफल (TSA):
   सूत्र: TSA = 2(lb + bh + hl)
   मान रखने पर: TSA = 2(${l*b} + ${b*h} + ${h*l})
   TSA = 2(${l*b + b*h + h*l}) = ${tsa.toFixed(2)}`;
    }
    else if (shape === "बेलन") {
      if (args.length !== 2) return "त्रुटि: बेलन के लिए 2 मान (r,h) डालें।";
      const [r, h] = args;
      const vol = piVal * r * r * h;
      const csa = 2 * piVal * r * h;
      const tsa = 2 * piVal * r * (r + h);
      
      if (isShort) return `बेलन: आयतन=${vol.toFixed(2)}, वक्र पृष्ठ=${csa.toFixed(2)}, कुल पृष्ठ=${tsa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
बेलन की त्रिज्या (r) = ${r}
बेलन की ऊंचाई (h) = ${h}
(π = 22/7 का प्रयोग करने पर)

1. बेलन का आयतन (Volume):
   सूत्र: V = πr²h
   मान रखने पर: V = (${piStr}) × (${r})² × ${h}
   V = (${piStr}) × ${r*r} × ${h}
   V = ${vol.toFixed(2)}

2. बेलन का वक्र पृष्ठीय क्षेत्रफल (CSA):
   सूत्र: CSA = 2πrh
   मान रखने पर: CSA = 2 × (${piStr}) × ${r} × ${h}
   CSA = ${csa.toFixed(2)}

3. बेलन का कुल पृष्ठीय क्षेत्रफल (TSA):
   सूत्र: TSA = 2πr(r + h)
   मान रखने पर: TSA = 2 × (${piStr}) × ${r} × (${r} + ${h})
   TSA = 2 × (${piStr}) × ${r} × ${r+h}
   TSA = ${tsa.toFixed(2)}`;
    }
    else if (shape === "शंकु") {
      if (args.length !== 2) return "त्रुटि: शंकु के लिए 2 मान (r,h) डालें।";
      const [r, h] = args;
      const l = Math.sqrt(r * r + h * h);
      const vol = (1/3) * piVal * r * r * h;
      const csa = piVal * r * l;
      const tsa = piVal * r * (r + l);
      
      if (isShort) return `शंकु: l=${l.toFixed(2)}, आयतन=${vol.toFixed(2)}, वक्र पृष्ठ=${csa.toFixed(2)}, कुल पृष्ठ=${tsa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
शंकु की त्रिज्या (r) = ${r}
शंकु की ऊंचाई (h) = ${h}
(π = 22/7 का प्रयोग करने पर)

Step 1: तिर्यक ऊंचाई (Slant Height, l) ज्ञात करना
सूत्र: l = √(r² + h²)
l = √(${r}² + ${h}²) = √(${r*r} + ${h*h}) = √${r*r + h*h}
l = ${l.toFixed(2)}

Step 2: शंकु का आयतन (Volume)
सूत्र: V = ⅓πr²h
मान रखने पर: V = ⅓ × (${piStr}) × (${r})² × ${h}
V = ${vol.toFixed(2)}

Step 3: शंकु का वक्र पृष्ठीय क्षेत्रफल (CSA)
सूत्र: CSA = πrl
मान रखने पर: CSA = (${piStr}) × ${r} × ${l.toFixed(2)}
CSA = ${csa.toFixed(2)}

Step 4: शंकु का कुल पृष्ठीय क्षेत्रफल (TSA)
सूत्र: TSA = πr(r + l)
मान रखने पर: TSA = (${piStr}) × ${r} × (${r} + ${l.toFixed(2)})
TSA = ${tsa.toFixed(2)}`;
    }
    else if (shape === "गोला") {
      if (args.length !== 1) return "त्रुटि: गोले के लिए 1 मान (r) डालें।";
      const r = args[0];
      const vol = (4/3) * piVal * r * r * r;
      const sa = 4 * piVal * r * r;
      
      if (isShort) return `गोला: आयतन=${vol.toFixed(2)}, पृष्ठीय क्षे.=${sa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
गोले की त्रिज्या (r) = ${r}
(π = 22/7 का प्रयोग करने पर)

1. गोले का आयतन (Volume):
   सूत्र: V = ⁴/₃πr³
   मान रखने पर: V = ⁴/₃ × (${piStr}) × (${r})³
   V = ⁴/₃ × (${piStr}) × ${r*r*r}
   V = ${vol.toFixed(2)}

2. गोले का पृष्ठीय क्षेत्रफल (Surface Area):
   सूत्र: SA = 4πr²
   मान रखने पर: SA = 4 × (${piStr}) × (${r})²
   SA = 4 × (${piStr}) × ${r*r}
   SA = ${sa.toFixed(2)}`;
    }
    else if (shape === "अर्धगोला") {
      if (args.length !== 1) return "त्रुटि: अर्धगोले के लिए 1 मान (r) डालें।";
      const r = args[0];
      const vol = (2/3) * piVal * r * r * r;
      const csa = 2 * piVal * r * r;
      const tsa = 3 * piVal * r * r;
      
      if (isShort) return `अर्धगोला: आयतन=${vol.toFixed(2)}, वक्र पृष्ठ=${csa.toFixed(2)}, कुल पृष्ठ=${tsa.toFixed(2)}`;
      
      return `हल (Solution):
दिया है:
अर्धगोले की त्रिज्या (r) = ${r}
(π = 22/7 का प्रयोग करने पर)

1. अर्धगोले का आयतन (Volume):
   सूत्र: V = ²/₃πr³
   मान रखने पर: V = ²/₃ × (${piStr}) × (${r})³
   V = ${vol.toFixed(2)}

2. अर्धगोले का वक्र पृष्ठीय क्षेत्रफल (CSA):
   सूत्र: CSA = 2πr²
   मान रखने पर: CSA = 2 × (${piStr}) × (${r})²
   CSA = ${csa.toFixed(2)}

3. अर्धगोले का कुल पृष्ठीय क्षेत्रफल (TSA):
   सूत्र: TSA = 3πr²
   मान रखने पर: TSA = 3 × (${piStr}) × (${r})²
   TSA = ${tsa.toFixed(2)}`;
    }
    
    return "त्रुटि: अमान्य आकार। कृपया कीबोर्ड से सही आकार चुनें।";
  },
  subCategories: [
    {
      id: "ch13_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch13_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch13_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch13_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch13_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};