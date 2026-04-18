import { simplify } from 'mathjs';

console.log('mathjs simplify:', simplify('1/sqrt(2)').toString());
console.log('mathjs simplify 1/sqrt(2) + sqrt(8):', simplify('1/sqrt(2) + sqrt(8)').toString());
