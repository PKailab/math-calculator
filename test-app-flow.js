import { simpleCalc } from './src/chapters/ch0_simple_calc.js';

console.log("solve x+x short", simpleCalc.solve('x+x', true));
console.log("solve x+x long", simpleCalc.solve('x+x', false));
console.log("solve a+b short", simpleCalc.solve('a+b', true));

import { generateFormats } from './src/utils/mathFormats.js';
console.log("formats x+x:", generateFormats('x+x', '2x'));
