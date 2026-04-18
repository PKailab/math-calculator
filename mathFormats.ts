import { evaluate, fraction, format, gcd, create, all } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

const math = create(all, { number: 'BigNumber', precision: 64 });

export interface ResultFormats {
  exact?: string;
  exactTex?: string;
  decimal?: string;
  fraction?: string;
  fractionTex?: string;
  mixedFraction?: string;
  mixedFractionTex?: string;
  primeFactorization?: string;
  romanNumerals?: string;
  divisors?: string;
  binary?: string;
  scientific?: string;
}

export function applyImplicitMultiplication(expr: string): string {
  let s = expr.replace(/\s+/g, '');
  const masks: Record<string, string> = {
    'sin': '#1#', 'cos': '#2#', 'tan': '#3#', 
    'csc': '#4#', 'sec': '#5#', 'cot': '#6#',
    'asin': '#7#', 'acos': '#8#', 'atan': '#9#',
    'log': '#10#', 'ln': '#11#', 'sqrt': '#12#', 'cbrt': '#13#',
    'gcd': '#14#', 'lcm': '#15#', 'abs': '#16#', 'exp': '#17#',
    'pi': '#18#', 'Infinity': '#19#'
  };

  const keys = Object.keys(masks).sort((a, b) => b.length - a.length);
  keys.forEach(k => {
     s = s.replace(new RegExp('\\b' + k + '\\b', 'gi'), masks[k]);
  });

  // 1. Num & alpha/par: 2x, 2(, 2#1#
  s = s.replace(/([0-9])([a-zA-Z#\(])/g, '$1*$2');
  // 2. Alpha/par & par: x(, )(
  s = s.replace(/([a-zA-Z\)])(\()/g, '$1*$2');
  // 3. Right par & alpha/num/#: )x, )2, )#1#
  s = s.replace(/(\))([a-zA-Z0-9#])/g, '$1*$2');

  // To insert * between variables like 'xxx', we split by mask tokens
  // so we don't accidentally split '#1#' into '#1*#'
  const parts = s.split(/(#[0-9]+#)/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].match(/^#[0-9]+#$/)) {
      let prev;
      do {
        prev = parts[i];
        parts[i] = parts[i].replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2');
      } while (parts[i] !== prev);
    }
  }
  s = parts.join('');

  // Unmask
  Object.entries(masks).forEach(([k, v]) => {
     s = s.split(v).join(k);
  });

  return s;
}

const SUPERSCRIPTS: Record<string, string> = {
  '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': ''
};

function toSuperscript(numStr: string): string {
  return numStr.split('').map(c => SUPERSCRIPTS[c] || c).join('');
}

function toRoman(num: number): string {
  if (num <= 0 || num >= 4000 || !Number.isInteger(num)) return "";
  const roman: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let str = "";
  for (let i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }
  return str;
}

function getPrimeFactors(n: number): string {
  if (n <= 1 || !Number.isInteger(n)) return "";
  let factors: Record<number, number> = {};
  for (let i = 2; i <= Math.sqrt(n); i++) {
    while (n % i === 0) {
      factors[i] = (factors[i] || 0) + 1;
      n /= i;
    }
  }
  if (n > 1) {
    factors[n] = (factors[n] || 0) + 1;
  }
  return Object.entries(factors)
    .map(([base, exp]) => exp === 1 ? `${base}` : `${base}${toSuperscript(exp.toString())}`)
    .join(' × ');
}

function getDivisors(n: number): string {
  if (n <= 0 || !Number.isInteger(n)) return "";
  const divs: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divs.push(i);
      if (i !== n / i) divs.push(n / i);
    }
  }
  return `{ ${divs.sort((a, b) => a - b).join(' | ')} }`;
}

// Keep a version for BigNumber logic if needed
function formatScientificNotationNumber(num: number): string {
  const [base, exp] = num.toExponential().split('e');
  const expNum = parseInt(exp, 10);
  const superExp = toSuperscript(expNum.toString());
  return `${base} × 10${superExp}`;
}

export function generateFormats(expressionStr?: string, numberValStr?: string): ResultFormats {
  const formats: ResultFormats = {};
  
  if (numberValStr === 'Infinity' || numberValStr === '∞') {
    return { decimal: '∞' };
  }

  // To preserve precision of big integers, interpret directly from String if possible
  // We'll prefer string-based BigNumber whenever `numberValStr` is provided
  let cleanNumberValStr = numberValStr ? numberValStr.replace(/\s+/g, '') : null;
  let bignumStr = cleanNumberValStr && /^-?\d+(\.\d+)?(e[+-]?\d+)?$/i.test(cleanNumberValStr) ? cleanNumberValStr : null;
  let bnValue: any = null;

  let num: number;
  let cleanStr = "";
  try {
    if (expressionStr) {
      const funcMatch = expressionStr.match(/([a-zA-Z_]+)\s*\(/i);
      if (funcMatch) {
        const funcName = funcMatch[1].toLowerCase();
        const allowedMathFunctions = [
          'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 
          'gcd', 'lcm', 'abs', 'exp', 'hcf'
        ];
        if (!allowedMathFunctions.includes(funcName)) {
           return formats; 
        }
      }

      cleanStr = applyImplicitMultiplication(expressionStr)
        .replace(/\s+/g, '')
        .replace(/×/g, '*')
        .replace(/÷R/g, ' mod ')
        .replace(/÷/g, '/')
        .replace(/∛\(([^)]+)\)/g, 'cbrt($1)')
        .replace(/∛(\d+(\.\d+)?)/g, 'cbrt($1)')
        .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
        .replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)')
        .replace(/HCF\(/ig, 'gcd(')
        .replace(/LCM\(/ig, 'lcm(');
        
      try {
         // Using bignumber mapped math instance
         const evaluated = math.evaluate(cleanStr);
         if (evaluated && evaluated.isBigNumber) {
             bnValue = evaluated;
             num = Number(evaluated.toString());
         } else {
             num = Number(evaluated);
         }
      } catch (e) {
         num = NaN;
      }
      
      if (isNaN(num) && numberValStr) {
          num = Number(numberValStr);
      }
    } else if (numberValStr) {
      num = Number(numberValStr);
    } else {
      return formats;
    }
  } catch(e) {
    if (numberValStr) {
      num = Number(numberValStr);
    } else {
      num = NaN;
    }
  }

  if (cleanStr) {
    try {
      const nData = nerdamer(cleanStr);
      const nerdamerStr = nData.toString();
      if (nerdamerStr && nerdamerStr !== num.toString() && /[a-zA-Z√π]|\//.test(nerdamerStr)) {
        formats.exact = nerdamerStr
          .replace(/\*/g, '')
          .replace(/sqrt\(([^)]+)\)/g, '√$1')
          .replace(/pi/g, 'π');
        formats.exactTex = nData.toTeX();
      }
    } catch(e) {}
  }

  // Fallback to literal bignum parsing if available and if mathjs failed
  if (!bnValue && bignumStr) {
      try {
          bnValue = math.bignumber(bignumStr);
      } catch (e) {}
  }

  if (isNaN(num) && !bnValue) return formats;
  if (!isFinite(num)) {
    formats.decimal = '∞';
    return formats;
  }

  // Format to avoid ugly floating point errors (e.g. 623.699999999)
  // Use lowerExp and upperExp to prevent auto-scientific notation for numbers user expects to see fully
  if (bnValue && bnValue.isInteger()) {
      formats.decimal = math.format(bnValue, {notation: 'fixed'});
  } else if (Number.isInteger(num) && Math.abs(num) < 1e21) {
      formats.decimal = num.toLocaleString('fullwide', {useGrouping: false});
  } else if (bnValue) {
      formats.decimal = math.format(bnValue, { lowerExp: -12, upperExp: 50, precision: 16 });
      if (formats.decimal.includes('.') && !formats.decimal.includes('e')) {
          formats.decimal = formats.decimal.replace(/0+$/, '').replace(/\.$/, '');
      }
  } else {
      formats.decimal = format(num, { lowerExp: -12, upperExp: 50, precision: 14 });
      if (formats.decimal.includes('.') && !formats.decimal.includes('e')) {
          formats.decimal = formats.decimal.replace(/0+$/, '').replace(/\.$/, '');
      }
  }
  
  if (bnValue) {
      const sci = math.format(bnValue, { notation: 'exponential', precision: 14 });
      const [base, exp] = sci.split('e');
      if (exp) {
         formats.scientific = `${base} × 10${toSuperscript(parseInt(exp, 10).toString())}`;
      } else {
         formats.scientific = formatScientificNotationNumber(num);
      }
  } else {
      formats.scientific = formatScientificNotationNumber(num);
  }

  try {
    const frac = bnValue ? math.fraction(bnValue) : fraction(num);
    const n = Number(frac.n);
    const d = Number(frac.d);
    const sign = Number(frac.s);
    
    if (d > 0 && d <= 100000) {
      if (d !== 1) {
        formats.fraction = `${sign < 0 ? '-' : ''}${n}/${d}`;
        formats.fractionTex = `${sign < 0 ? '-' : ''}\\frac{${n}}{${d}}`;
        
        if (n > d) {
          const whole = Math.floor(n / d);
          const rem = n % d;
          if (rem !== 0) {
            formats.mixedFraction = `${sign < 0 ? '-' : ''}${whole} ${rem}/${d}`;
            formats.mixedFractionTex = `${sign < 0 ? '-' : ''}${whole} \\frac{${rem}}{${d}}`;
          }
        }
      }
    }
  } catch (e) {}

  if (Number.isInteger(num)) {
    if (num < 1e15) {
       formats.binary = num.toString(2);
    }
    
    if (num > 0 && num < 4000) {
      formats.romanNumerals = toRoman(num);
    }
    
    if (num > 1 && num <= 1e8) {
      formats.primeFactorization = getPrimeFactors(num);
    }
    if (num > 0 && num <= 1e6) {
      formats.divisors = getDivisors(num);
    }
  }

  return formats;
}
