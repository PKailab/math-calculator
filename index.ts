import { Chapter } from './types';

/**
 * ============================================================================
 * 🚀 AUTO-DISCOVERY MODULE (ऑटो-डिस्कवरी सिस्टम)
 * ============================================================================
 * यह फाइल पूरे सिस्टम को 100% मॉड्यूलर और प्लग-एंड-प्ले (Plug-and-Play) बनाती है।
 * भविष्य में नया चैप्टर जोड़ने के लिए आपको इस फाइल में कोई बदलाव नहीं करना है!
 * 
 * 🛠️ नया चैप्टर कैसे जोड़ें?
 * 1. 'chapters' फोल्डर में एक नई फाइल बनाएं (जैसे: ch6_triangles.ts)
 * 2. उसमें 'Chapter' इंटरफेस के अनुसार अपना लॉजिक लिखें और उसे export करें।
 * 3. बस! यह कोड अपने आप उस नई फाइल को ढूँढकर ऐप में जोड़ देगा।
 * 
 * ⚠️ चेतावनी: इस फाइल को कभी न बदलें, यह ऑटोमैटिक काम करती है।
 */

// Vite का import.meta.glob सभी .ts फाइलों को अपने आप लोड कर लेता है
const modules = import.meta.glob('./*.ts', { eager: true });

const chapterList: Chapter[] = [];

for (const path in modules) {
  // index.ts और types.ts को छोड़ दें
  if (path.includes('index.ts') || path.includes('types.ts') || path.includes('_template')) continue;
  
  const mod: any = modules[path];
  
  // फाइल के अंदर जितने भी export हैं, उनमें से Chapter ऑब्जेक्ट को ढूँढें
  for (const key in mod) {
    const obj = mod[key];
    if (obj && typeof obj === 'object' && 'id' in obj && 'title' in obj && 'solve' in obj) {
      if (!chapterList.some(c => c.id === obj.id)) {
        chapterList.push(obj as Chapter);
      }
    }
  }
}

// चैप्टर्स को उनके ID के नंबर के अनुसार क्रम में लगाना (Sorting)
// जैसे: ch1, ch2, ch3... और अंत में formulas या scientific
chapterList.sort((a, b) => {
  const numA = parseInt(a.id.replace(/\D/g, ''));
  const numB = parseInt(b.id.replace(/\D/g, ''));
  
  const isNumA = !isNaN(numA);
  const isNumB = !isNaN(numB);

  if (isNumA && isNumB) return numA - numB;
  if (isNumA && !isNumB) return -1; // नंबर वाले चैप्टर्स ऊपर
  if (!isNumA && isNumB) return 1;  // बिना नंबर वाले (formulas) नीचे
  return 0;
});

export const CHAPTERS = chapterList;
export * from './types';
