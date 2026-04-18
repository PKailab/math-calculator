import { parse } from 'mathjs';
try {
  console.log("valid:", parse("3^sqrt(6)").toTex());
  console.log("invalid:", parse("3^sqrt(").toTex());
} catch(e) {
  console.log("Error:", e.message);
}
