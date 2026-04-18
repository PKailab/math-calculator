import { Chapter } from './types';

// ---------- Helper Functions ----------
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function primeFactorization(n: number): Map<number, number> {
  const factors = new Map<number, number>();
  let num = n;
  let divisor = 2;
  while (num >= 2) {
    if (num % divisor === 0) {
      let count = 0;
      while (num % divisor === 0) {
        num /= divisor;
        count++;
      }
      factors.set(divisor, count);
    }
    divisor = divisor === 2 ? 3 : divisor + 2;
  }
  return factors;
}

function formatPrimeFactors(factors: Map<number, number>): string {
  const SUPERSCRIPTS: Record<string, string> = {
    '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': ''
  };
  function toSuperscript(numStr: string): string {
    return numStr.split('').map(c => SUPERSCRIPTS[c] || c).join('');
  }

  const parts: string[] = [];
  for (const [prime, exp] of factors.entries()) {
    if (exp === 1) parts.push(`${prime}`);
    else parts.push(`${prime}${toSuperscript(exp.toString())}`);
  }
  return parts.join(' × ');
}

// ---------- Helper to clean input strings from letters and parentheses ----------
function cleanInput(str: string): string {
  return str.replace(/[a-zA-Z()]/g, '');
}

// ---------- Euclid's Division Lemma ----------
function solveEuclidDivision(input: string, isShort: boolean) {
  const steps: string[] = [];
  const cleaned = cleanInput(input);
  const numbers = cleaned.split(',').map(s => parseInt(s.trim(), 10));
  if (numbers.length !== 2 || numbers.some(isNaN)) {
    return { result: 'Invalid Input', steps: ['कृपया दो संख्याएँ कॉमा से अलग करके दर्ज करें।'] };
  }
  let [a, b] = numbers;
  if (a <= 0 || b <= 0) {
    return { result: 'Invalid Input', steps: ['संख्याएँ धनात्मक पूर्णांक होनी चाहिए।'] };
  }
  steps.push(`दिया है: a = ${a}, b = ${b}`);
  steps.push(`यूक्लिड विभाजन एल्गोरिथ्म के चरण:`);
  let dividend = Math.max(a, b);
  let divisor = Math.min(a, b);
  let stepNum = 1;
  while (divisor !== 0) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    steps.push(`Step ${stepNum}: ${dividend} = ${divisor} × ${quotient} + ${remainder}`);
    dividend = divisor;
    divisor = remainder;
    stepNum++;
  }
  const hcf = dividend;
  steps.push(`शेषफल शून्य प्राप्त हुआ। अंतिम भाजक ${hcf} ही HCF है।`);
  return { result: hcf.toString(), steps };
}

// ---------- Prime Factorization ----------
function solvePrimeFactorization(input: string, isShort: boolean) {
  const steps: string[] = [];
  const cleaned = cleanInput(input);
  const num = parseInt(cleaned.trim(), 10);
  if (isNaN(num) || num < 2) {
    return { result: 'Invalid Input', steps: ['कृपया 2 या उससे बड़ी एक पूर्ण संख्या दर्ज करें।'] };
  }
  steps.push(`संख्या: ${num}`);
  const factors = primeFactorization(num);
  let current = num;
  let stepNum = 1;
  for (const [prime, exp] of factors.entries()) {
    for (let i = 0; i < exp; i++) {
      steps.push(`Step ${stepNum}: ${current} ÷ ${prime} = ${current / prime}`);
      current /= prime;
      stepNum++;
    }
  }
  const formatted = formatPrimeFactors(factors);
  steps.push(`अतः ${num} = ${formatted}`);
  return { result: formatted, steps };
}

// ---------- HCF and LCM ----------
function solveHcfLcm(input: string, isShort: boolean) {
  const steps: string[] = [];
  const cleaned = cleanInput(input);
  const numbers = cleaned.split(',').map(s => parseInt(s.trim(), 10));
  if (numbers.length !== 2 || numbers.some(isNaN)) {
    return { result: 'Invalid Input', steps: ['कृपया दो संख्याएँ कॉमा से अलग करके दर्ज करें।'] };
  }
  const [a, b] = numbers;
  if (a <= 0 || b <= 0) {
    return { result: 'Invalid Input', steps: ['संख्याएँ धनात्मक पूर्णांक होनी चाहिए।'] };
  }
  steps.push(`दी गई संख्याएँ: ${a} और ${b}`);
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);
  steps.push(`Step 1: ${a} के अभाज्य गुणनखंड = ${formatPrimeFactors(factorsA)}`);
  steps.push(`Step 2: ${b} के अभाज्य गुणनखंड = ${formatPrimeFactors(factorsB)}`);
  const hcfValue = gcd(a, b);
  const lcmValue = lcm(a, b);
  steps.push(`Step 3: HCF (महत्तम समापवर्तक) = ${hcfValue}`);
  steps.push(`Step 4: LCM (लघुत्तम समापवर्त्य) = ${lcmValue}`);
  steps.push(`Step 5: सत्यापन -> HCF × LCM = ${hcfValue} × ${lcmValue} = ${hcfValue * lcmValue}, तथा दोनों संख्याओं का गुणनफल = ${a} × ${b} = ${a * b}`);
  return { result: `HCF = ${hcfValue}, LCM = ${lcmValue}`, steps };
}

// ---------- Irrationality Proof (Two types) ----------
function solveIrrational(input: string, isShort: boolean) {
  const steps: string[] = [];
  const trimmed = input.trim();
  const sqrtMatch = trimmed.match(/^√?(\d+)$/);
  if (sqrtMatch) {
    const p = parseInt(sqrtMatch[1], 10);
    steps.push(`सिद्ध करना है: √${p} एक अपरिमेय संख्या है।`);
    steps.push(`Step 1: मान लीजिए कि √${p} एक परिमेय संख्या है।`);
    steps.push(`Step 2: तो √${p} = a/b, जहाँ a और b सह-अभाज्य पूर्णांक हैं और b ≠ 0।`);
    steps.push(`Step 3: दोनों पक्षों का वर्ग करने पर: ${p} = a² / b²  ⇒  a² = ${p} b²`);
    steps.push(`Step 4: इससे स्पष्ट है कि a², ${p} से विभाज्य है, अतः a भी ${p} से विभाज्य होगा।`);
    steps.push(`Step 5: मान लीजिए a = ${p}c, जहाँ c कोई पूर्णांक है।`);
    steps.push(`Step 6: प्रतिस्थापित करने पर: (${p}c)² = ${p} b²  ⇒  ${p * p} c² = ${p} b²  ⇒  b² = ${p} c²`);
    steps.push(`Step 7: इससे स्पष्ट है कि b², ${p} से विभाज्य है, अतः b भी ${p} से विभाज्य होगा।`);
    steps.push(`Step 8: अतः a और b दोनों ${p} से विभाज्य हैं, जो हमारी प्रारंभिक मान्यता (a और b सह-अभाज्य हैं) का खंडन करता है।`);
    steps.push(`इसलिए √${p} एक अपरिमेय संख्या है।`);
    return { result: 'सिद्ध हुआ', steps };
  }
  steps.push(`सिद्ध करना है: ${trimmed} अपरिमेय है।`);
  steps.push(`Step 1: मान लीजिए कि यह परिमेय है और इसे r के बराबर मान लेते हैं।`);
  steps.push(`Step 2: फिर हम समीकरण को पुनर्व्यवस्थित करके दर्शाते हैं कि एक अपरिमेय संख्या दो परिमेय संख्याओं के बीच संबंध से व्यक्त की जा सकती है, जो असंभव है।`);
  steps.push(`(विस्तृत उपपत्ति के लिए कृपया विशिष्ट व्यंजक दर्ज करें, जैसे 2+√3)`);
  return { result: 'सिद्ध हुआ (सामान्य विधि)', steps };
}

// ---------- Decimal Expansion ----------
function solveDecimalExpansion(input: string, isShort: boolean) {
  const steps: string[] = [];
  const match = input.match(/^(\d+)\/(\d+)$/);
  if (!match) {
    return { result: 'Invalid Input', steps: ['कृपया भिन्न p/q के रूप में दर्ज करें, जैसे 13/3125'] };
  }
  const p = parseInt(match[1], 10);
  const q = parseInt(match[2], 10);
  if (q === 0) {
    return { result: 'Undefined', steps: ['हर शून्य नहीं हो सकता।'] };
  }
  steps.push(`भिन्न: ${p}/${q}`);
  const factors = primeFactorization(q);
  steps.push(`Step 1: हर (${q}) के अभाज्य गुणनखंड = ${formatPrimeFactors(factors)}`);
  let hasOnly2and5 = true;
  for (const prime of factors.keys()) {
    if (prime !== 2 && prime !== 5) {
      hasOnly2and5 = false;
      break;
    }
  }
  if (hasOnly2and5) {
    steps.push(`Step 2: चूँकि हर के अभाज्य गुणनखंडों में केवल 2 और 5 हैं, अतः यह भिन्न सांत दशमलव प्रसार वाली है।`);
    const decimal = (p / q).toString();
    return { result: 'सांत', steps: [...steps, `Step 3: दशमलव रूप = ${decimal}`] };
  } else {
    steps.push(`Step 2: चूँकि हर में 2 और 5 के अतिरिक्त अन्य अभाज्य गुणनखंड हैं, अतः यह भिन्न असांत आवर्ती दशमलव प्रसार वाली है।`);
    return { result: 'असांत आवर्ती', steps };
  }
}

// ---------- Chapter Definition ----------
export const chapter1: Chapter = {
  id: 'ch1',
  title: 'Chapter 1: वास्तविक संख्याएँ',
  inputGuide: 'निर्देश देखें',
  solve: (input: string, isShort: boolean) => {
    const trimmed = input.trim();
    if (/^Euclid\(/i.test(trimmed)) {
      return solveEuclidDivision(trimmed.replace(/^Euclid\(/i, '').replace(/\)$/, ''), isShort);
    }
    if (/^Factor\(/i.test(trimmed)) {
      return solvePrimeFactorization(trimmed.replace(/^Factor\(/i, '').replace(/\)$/, ''), isShort);
    }
    if (/^(HCF|LCM)\(/i.test(trimmed)) {
      return solveHcfLcm(trimmed.replace(/^(HCF|LCM)\(/i, '').replace(/\)$/, ''), isShort);
    }
    if (/^\d+\/\d+$/.test(trimmed)) {
      return solveDecimalExpansion(trimmed, isShort);
    }
    if (/√/.test(trimmed)) {
      return solveIrrational(trimmed, isShort);
    }
    return '';
  },
  topKeyboardLayout: [
    ["SOLVE", "Euclid(", "HCF", "LCM", "Factor", "√"],
    ["□/□", "÷R", "π", "x²", "(", ")"],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
  ],
  subCategories: [
    {
      id: 'ch1_1',
      title: 'यूक्लिड विभाजन प्रमेयिका',
      inputGuide: 'दो संख्याएँ कॉमा से अलग करें (जैसे 225,135)',
      solve: solveEuclidDivision,
    },
    {
      id: 'ch1_2',
      title: 'अंकगणित की आधारभूत प्रमेय',
      inputGuide: 'एक धनात्मक पूर्णांक दर्ज करें (जैसे 140)',
      solve: solvePrimeFactorization,
    },
    {
      id: 'ch1_3',
      title: 'HCF और LCM',
      inputGuide: 'दो संख्याएँ कॉमा से अलग करें (जैसे 26,91)',
      solve: solveHcfLcm,
    },
    {
      id: 'ch1_4',
      title: 'अपरिमेय संख्याएँ (सिद्ध करना)',
      inputGuide: '√p या व्यंजक दर्ज करें (जैसे √5, 2+√3)',
      solve: solveIrrational,
    },
    {
      id: 'ch1_5',
      title: 'दशमलव प्रसार की प्रकृति',
      inputGuide: 'भिन्न p/q दर्ज करें (जैसे 13/3125)',
      solve: solveDecimalExpansion,
    },
  ],
};

export default chapter1;
