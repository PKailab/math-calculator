import nerdamer from 'nerdamer';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';
import { parse } from 'mathjs';

let expr = 'sqrt(3)^sqrt(6)^sqrt(2^5)';

console.log("Nerdamer TeX:", nerdamer(expr).toTeX());

try {
  console.log("Mathjs TeX:", parse(expr).toTex());
} catch(e) {
  console.log("Mathjs error", e.message);
}
