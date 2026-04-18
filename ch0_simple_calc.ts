import { Chapter } from './types';
import { create, all } from 'mathjs';
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';
import { applyImplicitMultiplication } from '../utils/mathFormats';

const math = create(all, { number: 'BigNumber', precision: 64 });
const evaluate = math.evaluate;

export const simpleCalc: Chapter = {
  id: "ch0",
  title: "Calculator (कैलकुलेटर)",
  inputGuide: "संख्याएं और चिन्ह डालें (उदा: 5 + 10 × 2)",
  solve: (inputStr: string, isShort: boolean) => {
    try {
      // Apply Implicit Multiplication: "2x" -> "2*x", "xxx" -> "x*x*x", "(x+1)(x+2)" -> "(x+1)*(x+2)"
      inputStr = applyImplicitMultiplication(inputStr);

      // Special handling for ÷R (Remainder/Modulo operation)
      inputStr = inputStr.replace(/÷R/g, ' mod ');

      // Special override for Factor function
      if (/^factor\(([^)]+)\)$/i.test(inputStr.trim())) {
        const match = inputStr.trim().match(/^factor\(([^)]+)\)$/i);
        let expr = match ? match[1] : '0';
        expr = expr.replace(/\b(sin|cos|tan|csc|sec|cot)\(([^)]+)\)/gi, "$1(($2) deg)");
        
        try {
          let val = evaluate(expr.replace(/×/g, '*').replace(/÷/g, '/'));
          let n = parseInt(val);
          if (isNaN(n) || n <= 1) return isShort ? "त्रुटि: 1 से बड़ी संख्या डालें" : "त्रुटि: पूर्ण संख्या की आवश्यकता है";
          
          const original = n;
          const factorCounts: Record<number, number> = {};
          for (let i = 2; i <= Math.sqrt(n); i++) {
            while (n % i === 0) {
              factorCounts[i] = (factorCounts[i] || 0) + 1;
              n /= i;
            }
          }
          if (n > 1) {
            factorCounts[n] = (factorCounts[n] || 0) + 1;
          }
          
          const SUPERSCRIPTS: Record<string, string> = {
            '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
            '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
          };
          const toSuperscript = (numStr: string) => numStr.split('').map(c => SUPERSCRIPTS[c] || c).join('');

          const factorStrings = Object.entries(factorCounts).map(([base, exp]) => {
            return exp === 1 ? `${base}` : `${base}${toSuperscript(exp.toString())}`;
          });
          
          const ansStr = `${original} = ${factorStrings.join(' × ')}`;
          return isShort ? ansStr : `हल:\n${original} के अभाज्य गुणनखंड:\n${ansStr}`;
        } catch (err) {
          // If evaluation fails (e.g. contains variables like x^2 - y^2), use nerdamer's algebraic factor
          const algebraicFactor = nerdamer(`factor(${expr})`).toString();
          return isShort ? `उत्तर: ${algebraicFactor.replace(/\*/g, '')}` : `हल (Algebraic Factorization):\n${algebraicFactor}`;
        }
      }

      let expression = inputStr
        .replace(/\s+/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/∛\(([^)]+)\)/g, 'cbrt($1)')
        .replace(/∛(\d+(\.\d+)?)/g, 'cbrt($1)')
        .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
        .replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)')
        .replace(/HCF\(/ig, 'gcd(')
        .replace(/LCM\(/ig, 'lcm(')
        .replace(/π/g, 'pi')
        .replace(/∞/g, 'Infinity');

      let isAlgebraic = false;
      // Always internally calculate in degrees for pure mathjs path
      let evaluateExpr = expression.replace(/\b(sin|cos|tan|csc|sec|cot)\(([^)]+)\)/gi, "$1(($2) deg)");
      
      let result;
      try {
         result = evaluate(evaluateExpr);
         // Handle tan(90 deg) infinity case properly due to floating point error
         if (evaluateExpr.includes('tan((90) deg)') && Math.abs(Number(result)) > 1e15) {
            result = Infinity;
         }
      } catch (err) {
         // Fallback to algebraic simplification via nerdamer if there are variables
         let nerdamerExpr = expression;
         // Handle trig degrees for nerdamer if needed, or simply leave it as is if nerdamer assumes radians.
         // Let's replace 'deg' or use standard math.
         nerdamerExpr = nerdamerExpr.replace(/\b(sin|cos|tan|csc|sec|cot)\(([^)]+)\)/gi, "$1(($2)*pi/180)");
         
         const nerdamerRes = nerdamer(nerdamerExpr).expand();
         // But we prefer pure exact string if it's algebraic
         const exactStr = nerdamerRes.toString();
         if (exactStr) {
             result = exactStr.replace(/\*/g, '').replace(/sqrt/g, '√');
             isAlgebraic = true;
         } else {
             throw err;
         }
      }
      
      if (isShort) {
         if (result === Infinity) return `उत्तर: ∞`;
         if (result && result.isBigNumber) {
            // Check if it's an integer for precision display
            if (result.isInteger()) {
               return `उत्तर: ${math.format(result, {notation: 'fixed'})}`;
            }
         }
         return `उत्तर: ${result}`;
      }

      return ""; // When isShort is false (steps requested), return empty string to prevent the Steps button from appearing in basic mode, EXCEPT for distinct cases like 'factor' handled above
    } catch (error) {
      return `त्रुटि: अमान्य गणना।`;
    }
  }
};
