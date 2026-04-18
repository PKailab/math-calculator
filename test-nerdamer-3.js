import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

console.log('1/sqrt(2) ->', nerdamer('1/sqrt(2)').toString());
console.log('rationalize ->', nerdamer.rationalize ? nerdamer.rationalize('1/sqrt(2)').toString() : 'no rationalize');
console.log('expand ->', nerdamer('expand(1/sqrt(2))').toString());
console.log('simplify ->', nerdamer('simplify(1/sqrt(2))').toString());
