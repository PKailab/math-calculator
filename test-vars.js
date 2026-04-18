function sanitizeExpression(expr) {
  let s = expr;
  // Mask known functions and constants
  const masks = {
    'sin': '#SIN#', 'cos': '#COS#', 'tan': '#TAN#', 
    'csc': '#CSC#', 'sec': '#SEC#', 'cot': '#COT#',
    'asin': '#ASIN#', 'acos': '#ACOS#', 'atan': '#ATAN#',
    'log': '#LOG#', 'ln': '#LN#', 'sqrt': '#SQRT#', 'cbrt': '#CBRT#',
    'gcd': '#GCD#', 'lcm': '#LCM#', 'abs': '#ABS#', 'exp': '#EXP#',
    'pi': '#PI#', 'Infinity': '#INF#'
  };

  const keys = Object.keys(masks).sort((a, b) => b.length - a.length);
  keys.forEach(k => {
     const regex = new RegExp('\\b' + k + '\\b', 'gi');
     s = s.replace(regex, masks[k]);
  });

  // Remove spaces
  s = s.replace(/\s+/g, '');

  // 1. Number then Letter/Parenthesis: 2x -> 2*x, 2( -> 2*(, 2#SIN# -> 2*#SIN#
  s = s.replace(/([0-9])([a-zA-Z#\(])/g, '$1*$2');
  // 2. Letter then Parenthesis: x( -> x*(
  s = s.replace(/([a-zA-Z])(\()/g, '$1*$2');
  // 3. Parenthesis then Letter/Number: )x -> )*x, )2 -> )*2
  s = s.replace(/(\))([a-zA-Z0-9#])/g, '$1*$2');
  
  // 4. Letter then Letter: xy -> x*y, xx -> x*x
  // We MUST NOT split words that are inside #...#
  let prev;
  do {
     prev = s;
     // The negative lookahead/behind logic for # is tricky.
     // Safer: Split by #, process the parts outside masks, then re-unite!
  } while (false);
}

function sanitizeExpression2(expr) {
  let s = expr.replace(/\s+/g, '');
  const masks = {
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

  // Now, #1# etc are masked. 
  // Let's replace implicit multis:
  s = s.replace(/([0-9])([a-zA-Z#\(])/g, '$1*$2');   // 2x -> 2*x, 2#1# -> 2*#1#
  s = s.replace(/([a-zA-Z])(\()/g, '$1*$2');        // x( -> x*(
  s = s.replace(/(\))([a-zA-Z0-9#\(])/g, '$1*$2');    // )x -> )*x
  
  // For letters: xy -> x*y, avoiding # numbers #
  let prev;
  do {
     prev = s;
     s = s.replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2');
  } while (s !== prev);

  // Unmask
  Object.entries(masks).forEach(([k, v]) => {
     s = s.split(v).join(k);
  });

  return s;
}

console.log('--- v2 ---');
console.log('xxx', '\t=>', sanitizeExpression2('xxx'));
console.log('2x', '\t=>', sanitizeExpression2('2x'));
console.log('2 sin(x)', '\t=>', sanitizeExpression2('2 sin(x)'));
console.log('x y z', '\t=>', sanitizeExpression2('x y z'));
console.log('sin(x)cos(y)', '\t=>', sanitizeExpression2('sin(x)cos(y)'));
console.log('3(x+2)', '\t=>', sanitizeExpression2('3(x+2)'));
console.log('(x+1)(x+2)', '\t=>', sanitizeExpression2('(x+1)(x+2)'));
console.log('x2', '\t=>', sanitizeExpression2('x2')); 
console.log('2pi', '\t=>', sanitizeExpression2('2pi'));
