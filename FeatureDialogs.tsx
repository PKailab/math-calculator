import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowLeft, ExternalLink, Settings as SettingsIcon } from 'lucide-react';
import { generateFormats } from '../utils/mathFormats';
import { MathView } from './MathView';

interface FeaturePanelProps {
  feature: 'formulas' | 'dictionary' | 'variables' | 'help' | 'unitConverter' | 'quiz' | 'theme' | 'font' | 'settings' | 'resultFormat' | null;
  onClose: () => void;
  isDark: boolean;
  height: number;
  // Options for settings/theme/font
  language?: string;
  setLanguage?: (lang: string) => void;
  theme?: string;
  setTheme?: (theme: string) => void;
  isSimpleLayout?: boolean;
  setIsSimpleLayout?: (val: boolean) => void;
  // Options for resultFormats
  resultData?: { expression: string, result: string };
}

export const FeaturePanel: React.FC<FeaturePanelProps> = ({ 
  feature, onClose, isDark, height,
  language, setLanguage, theme, setTheme, isSimpleLayout, setIsSimpleLayout,
  resultData
}) => {
  let title = "";
  if (feature === 'formulas') title = language === 'hi' ? "गणित के सूत्र" : "Math Formulas";
  if (feature === 'dictionary') title = language === 'hi' ? "शब्दकोश/परिभाषा" : "Dictionary/Definition";
  if (feature === 'variables') title = language === 'hi' ? "वेरिएबल वैल्यू" : "Variable value";
  if (feature === 'help') title = language === 'hi' ? "सहायता" : "Help";
  if (feature === 'unitConverter') title = language === 'hi' ? "यूनिट कनवर्टर" : "Unit Converter";
  if (feature === 'quiz') title = language === 'hi' ? "गणित क्विज़" : "Maths Quiz";
  if (feature === 'theme') title = language === 'hi' ? "थीम" : "Theme";
  if (feature === 'font') title = language === 'hi' ? "फ़ॉन्ट" : "Font";
  if (feature === 'settings') title = language === 'hi' ? "सेटिंग्स" : "Settings";
  if (feature === 'resultFormat') title = resultData?.expression || "Result details";

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          className={`fixed inset-0 z-[100] flex flex-col overflow-hidden ${
            isDark ? 'bg-[#1E232B] text-white' : 'bg-gray-50 text-gray-900'
          }`}
        >
          <div className={`flex items-center gap-3 p-4 shadow-sm border-b ${isDark ? 'border-white/10 bg-[#2D3139]' : 'border-black/10 bg-white'}`}>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-black/5 text-gray-600'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1 pb-10">
            {feature === 'formulas' && <MathFormulasContent />}
            {feature === 'dictionary' && <DictionaryContent />}
            {feature === 'variables' && <VariablesContent />}
            {feature === 'help' && <HelpContent />}
            {feature === 'unitConverter' && <UnitConverterContent isDark={isDark} />}
            {feature === 'quiz' && <QuizContent isDark={isDark} />}
            {feature === 'theme' && setTheme && theme && <ThemeContent isDark={isDark} theme={theme} setTheme={setTheme} />}
            {feature === 'font' && <FontContent isDark={isDark} />}
            {feature === 'settings' && setIsSimpleLayout && <SettingsContent isDark={isDark} language={language||'hi'} isSimpleLayout={isSimpleLayout||false} setIsSimpleLayout={setIsSimpleLayout} />}
            {feature === 'resultFormat' && resultData && <ResultFormatContent isDark={isDark} resultData={resultData} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MathFormulasContent = () => (
  <div className="space-y-4 text-sm whitespace-pre-wrap">
    <div>
      <h3 className="font-bold text-blue-500 text-base mb-1">1. बीजगणित (Algebra)</h3>
      <p>(a + b)² = a² + b² + 2ab</p>
      <p>(a - b)² = a² + b² - 2ab</p>
      <p>a² - b² = (a - b)(a + b)</p>
      <p>द्विघाती सूत्र: x = [-b ± √(b² - 4ac)] / 2a</p>
    </div>
    <div>
      <h3 className="font-bold text-blue-500 text-base mb-1">2. त्रिकोणमिति (Trigonometry)</h3>
      <p>sin²θ + cos²θ = 1</p>
      <p>1 + tan²θ = sec²θ</p>
      <p>sin(90° - θ) = cosθ</p>
    </div>
    <div>
      <h3 className="font-bold text-blue-500 text-base mb-1">3. क्षेत्रफल और आयतन (Areas & Volumes)</h3>
      <p>वृत्त का क्षेत्रफल = πr²</p>
      <p>बेलन का आयतन = πr²h</p>
      <p>शंकु का आयतन = ⅓πr²h</p>
      <p>गोले का आयतन = ⁴/₃πr³</p>
    </div>
  </div>
);

export const DictionaryContent = () => (
  <div className="space-y-4 text-sm">
    <div><span className="font-bold text-blue-500">Integer (पूर्णांक):</span> पूर्ण संख्याएं जिनमें शून्य, धनात्मक और ऋणात्मक संख्याएं शामिल होती हैं। (उदा: -2, 0, 5)</div>
    <div><span className="font-bold text-blue-500">Prime Number (अभाज्य संख्या):</span> ऐसी संख्या जो केवल 1 और स्वयं से विभाजित होती है। (उदा: 2, 3, 5, 7)</div>
    <div><span className="font-bold text-blue-500">Hypotenuse (कर्ण):</span> समकोण त्रिभुज की सबसे लंबी भुजा, जो समकोण के सामने होती है।</div>
    <div><span className="font-bold text-blue-500">Factor (गुणनखंड):</span> वह संख्या जो किसी अन्य संख्या को पूरी तरह विभाजित करती है।</div>
  </div>
);

export const VariablesContent = () => {
  // Real calculator variable representations
  const variables = ['x', 'y', 'z', 'a', 'b', 'c'];
  return (
    <div className="space-y-3 text-sm">
      <p className="opacity-70 text-xs mb-4">वर्तमान समय में सेव किए गए वेरिएबल्स (भविष्य में इन्हें असाइन किया जा सकेगा):</p>
      {variables.map(v => (
        <div key={v} className="flex justify-between border-b border-gray-500/20 pb-2">
          <span className="font-bold text-blue-500 text-base">{v}</span>
          <span className="font-mono opacity-80">0 (Empty)</span>
        </div>
      ))}
    </div>
  );
};

export const HelpContent = () => (
  <div className="space-y-4 text-sm">
    <p>1. <strong>मूल गणनाएं:</strong> आप सीधे नंबर और ऑपरेटर (+, -, ×, ÷) दर्ज करके 'SOLVE' दबाएं।</p>
    <p>2. <strong>विशिष्ट मोड:</strong> 'MODE' बटन का उपयोग करके आप विशिष्ट अध्यायों (जैसे त्रिकोणमिति, AP, क्षेत्रफल) में जा सकते हैं।</p>
    <p>3. <strong>सब-कैटिगरी:</strong> 'SUBC' का चयन करके आप किसी अध्याय के भीतर अलग-अलग प्रकार के प्रश्नों को हल कर सकते हैं।</p>
    <p>4. <strong>हिस्ट्री:</strong> साइडबार मेन्यू के माध्यम से आप अपनी पुरानी गणनाएं देख सकते हैं।</p>
    <p>5. <strong>कदम (Steps):</strong> जब भी लागू हो, आउटपुट कार्ड में 'Steps' बटन दिखाई देगा जिससे आप विस्तृत हल देख पाएंगे।</p>
  </div>
);

export const UnitConverterContent = ({ isDark }: { isDark: boolean }) => {
  const [val, setVal] = useState('1');
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <input 
          type="number" 
          value={val} 
          onChange={(e) => setVal(e.target.value)}
          className={`flex-1 p-2 rounded-lg border ${isDark ? 'bg-black/30 border-gray-600 outline-none text-white' : 'bg-white border-gray-300'} text-lg`}
        />
        <select className={`p-2 rounded-lg border ${isDark ? 'bg-[#2D3139] border-gray-600 outline-none text-white' : 'bg-white border-gray-300'}`}>
          <option>km</option>
          <option>m</option>
          <option>cm</option>
        </select>
      </div>
      <div className="text-center font-bold text-blue-500 text-lg">↓</div>
      <div className="flex gap-2 items-center">
        <div className={`flex-1 p-2 rounded-lg border font-mono text-lg overflow-x-auto ${isDark ? 'bg-black/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
          {Number(val) * 1000}
        </div>
        <select className={`p-2 rounded-lg border ${isDark ? 'bg-[#2D3139] border-gray-600 outline-none text-white' : 'bg-white border-gray-300'}`}>
           <option>m</option>
           <option>cm</option>
           <option>mm</option>
        </select>
      </div>
    </div>
  );
};

export const ThemeContent = ({ isDark, theme, setTheme }: { isDark: boolean, theme: string, setTheme: (t: string) => void }) => {
  const themes = [
    { id: 'dark', label: 'Dark Mode (डार्क)', color: 'bg-gray-900 border-gray-700' },
    { id: 'light', label: 'Light Mode (लाइट)', color: 'bg-white border-gray-300 text-black' },
    { id: 'amoled', label: 'AMOLED Black (ब्लैक)', color: 'bg-black border-gray-800' },
    { id: 'blue', label: 'Navy Blue (नेवी)', color: 'bg-[#0f172a] border-[#1e293b]' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${t.color} ${theme === t.id ? 'border-blue-500 ring-2 ring-blue-500/50' : ''}`}
        >
          <span className="font-semibold">{t.label}</span>
          {theme === t.id && <Check size={20} className="text-blue-500" />}
        </button>
      ))}
    </div>
  );
};

export const FontContent = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="space-y-4">
      <p className="text-sm opacity-70">फ़ॉन्ट सेटिंग्स जल्द ही उपलब्ध कराई जाएंगी (Font settings coming soon).</p>
      <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#2D3139] border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="font-sans text-lg mb-2 flex justify-between items-center">
          <span>System Sans (डिफ़ॉल्ट)</span>
          <Check size={20} className="text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export const SettingsContent = ({ isDark, language, isSimpleLayout, setIsSimpleLayout }: { isDark: boolean, language: string, isSimpleLayout: boolean, setIsSimpleLayout: (v: boolean) => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-semibold block mb-3 opacity-90">{language === 'hi' ? 'कीबोर्ड (Keyboard Layout):' : 'Keyboard Setup:'}</span>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsSimpleLayout(false)} 
            className={`p-3 rounded-lg border-2 font-bold transition-colors ${!isSimpleLayout ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : isDark ? 'border-gray-700 bg-black/20 text-gray-400 hover:bg-black/40' : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'hi' ? 'वैज्ञानिक (Scientific)' : 'Scientific'}
          </button>
          <button 
            onClick={() => setIsSimpleLayout(true)} 
            className={`p-3 rounded-lg border-2 font-bold transition-colors ${isSimpleLayout ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : isDark ? 'border-gray-700 bg-black/20 text-gray-400 hover:bg-black/40' : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'hi' ? 'साधारण (Simple)' : 'Simple'}
          </button>
        </div>
        <p className={`text-xs mt-3 opacity-70`}>नोट: साधारण कीबोर्ड लेआउट में केवल मूल गणितीय बटनें (+, -, ×, ÷) उपलब्ध होती हैं, जो जगह बचाती हैं।</p>
      </div>
    </div>
  );
};

const QUIZ_QUESTIONS = [
  { q: "वृत्त का क्षेत्रफल (Area of Circle)?", a: "πr²", opts: ["2πr", "πr²", "πd", "4πr²"] },
  { q: "15 × 8 = ?", a: "120", opts: ["110", "125", "120", "130"] },
  { q: "sin²θ + cos²θ = ?", a: "1", opts: ["0", "-1", "1", "2"] },
  { q: "45 + 87 = ?", a: "132", opts: ["122", "132", "142", "152"] },
  { q: "(a + b)² = ?", a: "a² + 2ab + b²", opts: ["a² + b²", "a² - 2ab + b²", "a² + 2ab + b²", "(a-b)²"] },
  { q: "144 ÷ 12 = ?", a: "12", opts: ["10", "11", "12", "14"] },
  { q: "a² - b² = ?", a: "(a+b)(a-b)", opts: ["(a+b)²", "(a-b)²", "(a+b)(a-b)", "a²-2ab"] },
  { q: "3³ = ?", a: "27", opts: ["9", "27", "81", "6"] },
  { q: "बेलन का आयतन (Volume of Cylinder)?", a: "πr²h", opts: ["⅓πr²h", "πr²h", "2πrh", "4πr²"] }
];

export const QuizContent = ({ isDark }: { isDark: boolean }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));

  const currentQ = questions[qIndex];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === currentQ.a) setScore(s => s + 1);
  };

  const handeNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
      setSelected(null);
    } else {
      // shuffle and restart
      setQuestions([...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5));
      setQIndex(0);
      setScore(0);
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm font-bold opacity-70">
        <span>प्रश्न {qIndex + 1}/{questions.length}</span>
        <span>स्कोर: {score}</span>
      </div>
      
      <div className={`p-4 rounded-xl text-center text-lg font-bold ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
        {currentQ.q}
      </div>

      <div className="grid grid-cols-1 gap-2 mt-2">
        {currentQ.opts.map((opt, i) => {
          let stateClass = isDark ? 'bg-[#2D3139] hover:bg-[#3D4450] border-gray-600' : 'bg-gray-100 hover:bg-gray-200 border-gray-300';
          if (selected) {
             if (opt === currentQ.a) stateClass = 'bg-green-500/20 text-green-600 border-green-500 font-bold';
             else if (opt === selected) stateClass = 'bg-red-500/20 text-red-600 border-red-500 font-bold';
             else stateClass = isDark ? 'bg-[#1E232B] opacity-50 border-gray-700' : 'bg-white opacity-50 border-gray-200';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`p-3 rounded-lg border text-left transition-all ${stateClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <button 
          onClick={handeNext}
          className="mt-4 p-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors"
        >
          {qIndex < questions.length - 1 ? "अगला प्रश्न (Next)" : "पुनः शुरू करें (Restart)"}
        </button>
      )}
    </div>
  );
};

export const ResultFormatContent: React.FC<{isDark: boolean, resultData: {expression: string, result: string}}> = ({ isDark, resultData }) => {
  const formats = generateFormats(resultData.expression, resultData.result);
  
  const entries = [
    { label: "Calculated result", value: resultData.result, isTex: false },
    { label: "Exact form (Exact)", value: formats.exactTex ? formats.exactTex : formats.exact, isTex: !!formats.exactTex },
    { label: "Decimal", value: formats.decimal, isTex: false },
    { label: "Fraction", value: formats.fractionTex || formats.fraction, isTex: !!formats.fractionTex },
    { label: "Mixed fraction", value: formats.mixedFractionTex || formats.mixedFraction, isTex: !!formats.mixedFractionTex },
    { label: "Prime factorization", value: formats.primeFactorization, isTex: false },
    { label: "Divisors", value: formats.divisors, isTex: false },
    { label: "Roman numerals", value: formats.romanNumerals, isTex: false },
    { label: "Binary 64 bits signed", value: formats.binary, isTex: false },
    { label: "Scientific notation", value: formats.scientific, isTex: false },
  ].filter(entry => entry.value && entry.value.trim() !== "");

  return (
    <div className="flex flex-col gap-4 p-2 pb-12">
       {entries.map((entry, idx) => (
         <div key={idx} className="flex flex-col mb-2">
            <span className={`text-[13px] font-medium tracking-wide mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {entry.label}
            </span>
            <div className={`p-3 rounded-lg border font-mono text-xl break-words break-all tracking-wider flex items-center min-h-[3rem] ${isDark ? 'bg-[#c5cdc0] text-black border-transparent shadow-inner' : 'bg-[#e2e8df] text-black border-black/10 shadow-sm'}`}>
              {entry.isTex ? <MathView math={entry.value as string} isTex={true} /> : entry.value}
            </div>
         </div>
       ))}
    </div>
  );
}
