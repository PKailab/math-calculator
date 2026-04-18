import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

console.log('sqrt(12) ->', nerdamer('sqrt(12)').toString());
console.log('1/sqrt(2) ->', nerdamer('1/sqrt(2)').toString());
console.log('sqrt(3) ->', nerdamer('sqrt(3)').toString());
console.log('1/sqrt(2) + sqrt(8) ->', nerdamer('1/sqrt(2) + sqrt(8)').toString());
console.log('factor(12) ->', nerdamer.factor('12').toString());
