const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/chapters');
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.startsWith('ch') && f !== 'ch0_simple_calc.ts' && f !== 'ch1_real_numbers.ts') {
    const fullPath = path.join(dir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    // We basically need to replace topKeyboardLayout up to solve: 
    content = content.replace(/topKeyboardLayout: \[\s*\[[\s\S]*?\]\s*\][\s\S]*?solve:/,
    `topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  solve:`);
    fs.writeFileSync(fullPath, content);
    console.log('Fixed ' + f);
  }
});
