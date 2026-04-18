import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { parse } from 'mathjs';

export const MathView: React.FC<{ math: string, isTex?: boolean, fallbackToRaw?: boolean, style?: React.CSSProperties, className?: string }> = ({ math, isTex = false, fallbackToRaw = true, style, className }) => {
  const renderedHtml = useMemo(() => {
    let texStr = math;
    
    if (!isTex) {
      try {
        if (!math.includes('\\frac') && !math.includes('\\sqrt')) {
           let cleanStr = math
             .replace(/×/g, '*')
             .replace(/÷R/g, ' mod ')
             .replace(/÷/g, '/')
             .replace(/∛\(([^)]+)\)/g, 'cbrt($1)')
             .replace(/∛(\d+(\.\d+)?)/g, 'cbrt($1)')
             .replace(/√\(([^)]+)\)/g, 'sqrt($1)')
             .replace(/√(\d+(\.\d+)?)/g, 'sqrt($1)')
             .replace(/□/g, '0');
           
           // If it's a pure number, skip the mathjs parser completely to avoid ANY risk of scientific conversion
           const spacelessClean = cleanStr.replace(/\s+/g, '');
           if (/^-?\d+(\.\d+)?$/.test(spacelessClean)) {
              texStr = cleanStr.trim();
           } else {
              const node = parse(spacelessClean);
              texStr = node.toTex({ 
                parenthesis: 'auto',
                handler: function (node, options) {
                  if (node.isConstantNode && typeof node.value === 'number') {
                     const str = String(node.value);
                     if (str.includes('e+')) {
                        const [base, exp] = str.split('e+');
                        return `${base} \\times 10^{${exp}}`;
                     }
                     if (str.includes('e-')) {
                        const [base, exp] = str.split('e-');
                        return `${base} \\times 10^{-${exp}}`;
                     }
                     // Force JS to format integers gracefully inside expression
                     if (Number.isInteger(node.value) && Math.abs(node.value) < 1e21) {
                         return node.value.toLocaleString('fullwide', {useGrouping: false});
                     }
                     return str;
                  }
                  return undefined;
                }
              });
           }
        }
      } catch(e) {
         texStr = math.replace(/√/g, '\\sqrt').replace(/×/g, '\\times').replace(/÷/g, '\\div');
      }
    }

    try {
      return katex.renderToString('\\displaystyle ' + texStr, { throwOnError: true, displayMode: false });
    } catch (e) {
      return null;
    }
  }, [math, isTex]);

  if (!renderedHtml && fallbackToRaw) {
    return <span className={className} style={style}>{math}</span>;
  }

  return (
    <span
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: renderedHtml || '' }}
    />
  );
};
