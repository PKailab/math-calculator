const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

// Mapping for new titles
const titleUpdates = {
  'ch1_real_numbers.ts': 'Chapter 1: वास्तविक संख्याएँ',
  'ch2_polynomials.ts': 'Chapter 2: बहुपद',
  'ch3_linear_equations.ts': 'Chapter 3: दो चर वाले रैखिक समीकरण',
  'ch4_quadratic.ts': 'Chapter 4: द्विघात समीकरण',
  'ch5_ap.ts': 'Chapter 5: समांतर श्रेढ़ियाँ',
  'ch6_triangles.ts': 'Chapter 6: त्रिभुज',
  'ch7_coordinate.ts': 'Chapter 7: निर्देशांक ज्यामिति',
  'ch8_trigonometry.ts': 'Chapter 8: त्रिकोणमिति का परिचय',
  'ch9_applications_trigonometry.ts': 'Chapter 9: त्रिकोणमिति के अनुप्रयोग',
  'ch10_circles.ts': 'Chapter 10: वृत्त',
  'ch12_areas_related_to_circles.ts': 'Chapter 11: वृत्तों से संबंधित क्षेत्रफल',
  'ch13_mensuration.ts': 'Chapter 12: पृष्ठीय क्षेत्रफल और आयतन',
  'ch14_statistics.ts': 'Chapter 13: सांख्यिकी',
  'ch15_probability.ts': 'Chapter 14: प्रायिकता',
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace "SPACE" with "␣"
  content = content.replace(/"SPACE"/g, '"␣"');
  
  // Update titles
  if (titleUpdates[file]) {
    // Regex to replace title: "..."
    content = content.replace(/title:\s*".*?"/, `title: "${titleUpdates[file]}"`);
  }

  fs.writeFileSync(filePath, content);
});

// Also update App.tsx for the SPACE replacement
const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/"SPACE"/g, '"␣"');
appContent = appContent.replace(/key === "␣"/g, 'key === "␣"');
fs.writeFileSync(appPath, appContent);

console.log("Updated titles and SPACE to ␣");
