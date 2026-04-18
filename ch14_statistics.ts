import { Chapter } from './types';

export const chapter14: Chapter = {
  id: "ch14",
  title: "Chapter 13: सांख्यिकी",
  inputGuide: "वर्ग,f;वर्ग,f (उदा: 0-10,5;10-20,8)",
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve: (inputStr: string, isShort: boolean) => {
    const groups = inputStr.split(";").map(g => g.trim()).filter(g => g !== "");
    if (groups.length === 0) return "त्रुटि: कृपया डेटा डालें। उदाहरण: 0-10,5;10-20,8";

    let sumF = 0;
    let sumFx = 0;
    
    let tableStr = `| वर्ग अंतराल | बारंबारता (f_i) | वर्ग चिह्न (x_i) | f_i × x_i |\n`;
    tableStr += `|-------------|-----------------|------------------|-----------|\n`;

    for (const group of groups) {
      const parts = group.split(",");
      if (parts.length !== 2) return `त्रुटि: अमान्य प्रारूप '${group}' में। (प्रारूप: वर्ग,बारंबारता)`;
      
      const classInterval = parts[0].trim();
      const f = parseFloat(parts[1].trim());
      
      if (isNaN(f)) return `त्रुटि: बारंबारता '${parts[1]}' अमान्य है।`;

      const limits = classInterval.split("-");
      if (limits.length !== 2) return `त्रुटि: वर्ग अंतराल '${classInterval}' अमान्य है। (प्रारूप: L-U)`;
      
      const L = parseFloat(limits[0].trim());
      const U = parseFloat(limits[1].trim());
      
      if (isNaN(L) || isNaN(U)) return `त्रुटि: वर्ग सीमाएं अमान्य हैं '${classInterval}'।`;

      const x = (L + U) / 2;
      const fx = f * x;

      sumF += f;
      sumFx += fx;

      tableStr += `| ${classInterval.padEnd(11)} | ${f.toString().padEnd(15)} | ${x.toString().padEnd(16)} | ${fx.toString().padEnd(9)} |\n`;
    }

    tableStr += `|-------------|-----------------|------------------|-----------|\n`;
    tableStr += `| योग (Total) | Σf_i = ${sumF.toString().padEnd(8)} |                  | Σf_i x_i = ${sumFx}\n`;

    const mean = sumFx / sumF;

    if (isShort) return `वर्गीकृत माध्य (Mean) = ${mean.toFixed(4)}`;

    return `हल (Solution):
माध्य (Mean) ज्ञात करने के लिए प्रत्यक्ष विधि (Direct Method) का प्रयोग:

Step 1: प्रत्येक वर्ग अंतराल का वर्ग चिह्न (x_i) ज्ञात करें।
सूत्र: वर्ग चिह्न (x_i) = (ऊपरी सीमा + निचली सीमा) / 2

Step 2: सारणी (Table) तैयार करें:
${tableStr}

Step 3: सूत्र का प्रयोग करें:
माध्य (x̄) = Σf_i x_i / Σf_i

मान रखने पर:
माध्य (x̄) = ${sumFx} / ${sumF}
माध्य (x̄) = ${mean.toFixed(4)}

अंतिम उत्तर:
दिए गए आंकड़ों का माध्य ${mean.toFixed(4)} है।`;
  },
  subCategories: [
    {
      id: "ch14_1",
      title: "सब-कैटिगरी 1",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch14_2",
      title: "सब-कैटिगरी 2",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch14_3",
      title: "सब-कैटिगरी 3",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch14_4",
      title: "सब-कैटिगरी 4",
      inputGuide: "इनपुट डालें"
    },
    {
      id: "ch14_5",
      title: "सब-कैटिगरी 5",
      inputGuide: "इनपुट डालें"
    }
  ]
};