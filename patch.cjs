const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/chapters');
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.startsWith('ch') && f !== 'ch0_simple_calc.ts' && f !== 'ch1_real_numbers.ts') {
    const fullPath = path.join(dir, f);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/\s+keyboardLayout:\s*\[[\s\S]*?\],/,
    `
  topKeyboardLayout: [
    ['SOLVE', '(', ')', ',', '√', 'x²'],
    ['a', 'b', 'c', 'x', 'y', 'z'],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],`);
    fs.writeFileSync(fullPath, content);
    console.log('Updated ' + f);
  }
});
