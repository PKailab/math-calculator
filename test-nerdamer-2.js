import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

console.log('sin(30 deg):', nerdamer('sin(30*pi/180)').evaluate().toString());
console.log('sqrt(12):', nerdamer('sqrt(12)').evaluate().text());
