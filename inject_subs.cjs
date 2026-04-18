const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f.startsWith('ch') && f !== 'ch1_real_numbers.ts');

const genericSubs = [
  { id: '1', title: 'सब-कैटिगरी 1', guide: 'इनपुट डालें' },
  { id: '2', title: 'सब-कैटिगरी 2', guide: 'इनपुट डालें' },
  { id: '3', title: 'सब-कैटिगरी 3', guide: 'इनपुट डालें' },
  { id: '4', title: 'सब-कैटिगरी 4', guide: 'इनपुट डालें' },
  { id: '5', title: 'सब-कैटिगरी 5', guide: 'इनपुट डालें' }
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('subCategories:')) {
    const chapterIdMatch = content.match(/id:\s*"([^"]+)"/);
    if (chapterIdMatch) {
      const chId = chapterIdMatch[1];
      
      const subCatString = `,\n  subCategories: [\n` + genericSubs.map(s => `    {
      id: "${chId}_${s.id}",
      title: "${s.title}",
      inputGuide: "${s.guide}"
    }`).join(',\n') + `\n  ]\n};`;

      content = content.replace(/\n};\s*$/, subCatString);
      fs.writeFileSync(filePath, content);
    }
  }
});

console.log("Added sub-categories to all chapters.");
