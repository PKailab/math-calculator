const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f.startsWith('ch'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the last row of the keyboard layout
  content = content.replace(/\[\s*"0"\s*,\s*"\."\s*,\s*""\s*,\s*"\+"\s*,\s*""\s*\]/g, '["0", ".", ",", "SPACE", "+"]');
  content = content.replace(/\[\s*"0"\s*,\s*"\."\s*,\s*""\s*,\s*""\s*\]/g, '["0", ".", ",", "SPACE"]');
  content = content.replace(/\[\s*"0"\s*,\s*""\s*,\s*"\+"\s*,\s*""\s*\]/g, '["0", ".", ",", "SPACE"]');
  content = content.replace(/\[\s*"0"\s*,\s*"\."\s*,\s*""\s*,\s*""\s*,\s*""\s*\]/g, '["0", ".", ",", "SPACE", ""]');
  
  // For ch1_real_numbers.ts which has ["0", ".", "", ""]
  content = content.replace(/\[\s*"0"\s*,\s*"\."\s*,\s*""\s*,\s*""\s*\]/g, '["0", ".", ",", "SPACE"]');

  fs.writeFileSync(filePath, content);
});
console.log("Updated keyboard layouts in chapters.");
