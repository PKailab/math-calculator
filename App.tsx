import React, { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';

// Aggregator: सुनिश्चित करें कि आपने 'chapters.ts' फाइल बना ली है
import { CHAPTERS } from './chapters';

// Components: सीधे रूट (root) से इम्पोर्ट
import { Sidebar } from './Sidebar';
import { ControlCenter } from './ControlCenter';
import { Keyboard } from './Keyboard';
import { Display } from './Display';
import { ModeDialog } from './ModeDialog';
import { SubCategoryDialog } from './SubCategoryDialog';
import { 
  FeaturePanel, 
  MathFormulasContent, 
  DictionaryContent, 
  VariablesContent, 
  HelpContent, 
  UnitConverterContent, 
  QuizContent 
} from './FeatureDialogs';
import { StepsDialog } from './StepsDialog';

// Utilities & I18n: सीधे रूट से
import { t } from './i18n';
import { 
  STANDARD_NUMPAD, 
  SCIENTIFIC_KEYBOARD_LAYOUT, 
  SIMPLE_KEYBOARD_LAYOUT 
} from './keyboardLayouts';

export default function App() {
  const [theme, setTheme] = useState('dark'); 
  const [language, setLanguage] = useState('hi'); 
  const [inputText, setInputText] = useState("");
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [showSubCategoryDialog, setShowSubCategoryDialog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const [history, setHistory] = useState<{ id: number, expression: string, result: string, rawResultText?: string, hiddenFromScreen?: boolean, detailText?: string }[]>([]);
  
  const [showStepsDialog, setShowStepsDialog] = useState(false);
  const [activeStepsData, setActiveStepsData] = useState({ text: '', expr: '' });

  const [activeFeatureDialog, setActiveFeatureDialog] = useState<'formulas' | 'dictionary' | 'variables' | 'help' | 'unitConverter' | 'quiz' | 'theme' | 'font' | 'settings' | 'resultFormat' | null>(null);
  const [activeResultFormatData, setActiveResultFormatData] = useState<{expression: string, result: string} | undefined>(undefined);

  const [keyboardHeight, setKeyboardHeight] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const [resultText, setResultText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const acPressCountRef = useRef<number>(0);

  const activeChapter = CHAPTERS.find(c => c.id === activeChapterId) || CHAPTERS[0];
  const activeSubCategory = activeChapter.subCategories?.find(s => s.id === activeSubCategoryId) || null;

  useEffect(() => {
    const defaultHeight = Math.min(window.innerHeight * 0.45, 380);
    setKeyboardHeight(defaultHeight);
  }, []);

  useEffect(() => {
    const handleResizeMove = (clientY: number) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - clientY;
      if (newHeight >= 0 && newHeight < window.innerHeight * 0.8) {
        setKeyboardHeight(newHeight);
        setIsKeyboardVisible(newHeight >= 50);
      }
    };
    const onMove = (e: any) => handleResizeMove(e.touches ? e.touches[0].clientY : e.clientY);
    const stop = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', stop);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', stop);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', stop);
    };
  }, [isResizing]);

  useEffect(() => {
    let hint = language === 'hi' 
      ? `मोड: ${activeChapter.title}\n\nनिर्देश: ${activeChapter.inputGuide}\n\nप्रश्न दर्ज करें और 'SOLVE' दबाएं।`
      : `Mode: ${activeChapter.title}\n\nGuide: ${activeChapter.inputGuide}\n\nEnter question and press 'SOLVE'.`;
    setResultText(hint);
    setInputText("");
  }, [activeChapterId, language]);

  const handleKeyPress = (key: string) => {
    if (key !== "AC") acPressCountRef.current = 0;

    const insertAtCursor = (text: string) => {
      if (inputRef.current) {
        let start = inputRef.current.selectionStart || 0;
        let end = inputRef.current.selectionEnd || 0;
        const newText = inputText.slice(0, start) + text + inputText.slice(end);
        setInputText(newText);
        setTimeout(() => {
          inputRef.current?.setSelectionRange(start + text.length, start + text.length);
          inputRef.current?.focus();
        }, 10);
      } else {
        setInputText(prev => prev + text);
      }
    };

    if (key === "AC") {
      if (inputText || resultText) {
        setInputText("");
        setResultText("");
        acPressCountRef.current = 1;
      } else if (acPressCountRef.current >= 1) {
           setHistory(prev => prev.map(item => ({ ...item, hiddenFromScreen: true })));
           acPressCountRef.current = 0;
      }
    } else if (key === "DEL") {
      if (inputRef.current) {
        const start = inputRef.current.selectionStart || 0;
        const end = inputRef.current.selectionEnd || 0;
        if (start === end && start > 0) {
          setInputText(prev => prev.slice(0, start - 1) + prev.slice(start));
          setTimeout(() => inputRef.current?.setSelectionRange(start - 1, start - 1), 10);
        } else {
          setInputText(prev => prev.slice(0, start) + prev.slice(end));
          setTimeout(() => inputRef.current?.setSelectionRange(start, start), 10);
        }
      }
    } else if (key === "SOLVE" || key === "=") {
        if (!inputText) return;
        let expressionToSolve = inputText;
        const customSolveFn = activeSubCategory?.solve || activeChapter.solve;

        try {
            // बेसिक प्रोसेसिंग (ब्रैकेट और फ़्रेक्शन)
            const openB = (expressionToSolve.match(/\(/g) || []).length;
            const closeB = (expressionToSolve.match(/\)/g) || []).length;
            if (openB > closeB) expressionToSolve += ")".repeat(openB - closeB);

            let res = customSolveFn(expressionToSolve, false);
            let shortRes = customSolveFn(expressionToSolve, true);
            
            // रिजल्ट क्लीनअप
            let displayRes = typeof shortRes === 'string' ? shortRes.replace(/^=\s*/, '') : String(shortRes);
            
            setHistory(prev => [...prev, { 
               id: Date.now(), 
               expression: expressionToSolve, 
               result: displayRes, 
               rawResultText: "= " + displayRes,
               detailText: typeof res === 'object' ? res.steps.join('\n') : String(res)
            }]);
            
            setInputText("");
            setResultText("");
        } catch (e) {
          setResultText("त्रुटि: अमान्य समीकरण।");
        }
    } else {
        insertAtCursor(key);
    }
  };

  let keyboardRows = activeChapterId === 'ch0' ? SCIENTIFIC_KEYBOARD_LAYOUT : (activeChapter.keyboardLayout || STANDARD_NUMPAD);

  const getButtonColor = (text: string) => {
    if (text === "AC") return "bg-red-500 border-red-700 hover:bg-red-400 text-white";
    if (text === "DEL") return "bg-amber-500 border-amber-700 hover:bg-amber-400 text-white";
    if (text === "SOLVE" || text === "=") return "bg-blue-600 border-blue-800 hover:bg-blue-500 text-white";
    if (/[0-9]/.test(text)) return "bg-gray-800 border-gray-900 text-white";
    return "bg-gray-400 text-black";
  };

  const isDark = theme !== 'light';

  return (
    <div className={`flex flex-col h-screen w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} font-sans overflow-hidden`}>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} isDark={isDark} history={history} onClearHistory={() => setHistory([])} />

      <Display theme={theme} inputText={inputText} setInputText={setInputText} history={history.filter(i => !i.hiddenFromScreen)} inputRef={inputRef} activeModeName={activeChapter.title} />

      <ControlCenter onOpenSidebar={() => setShowSidebar(true)} onOpenMode={() => setShowModeDialog(true)} isKeyboardVisible={isKeyboardVisible} activeChapter={activeChapter} isDark={isDark} onStartResize={() => setIsResizing(true)} />

      <Keyboard isVisible={isKeyboardVisible} height={keyboardHeight} rows={keyboardRows} onKeyPress={handleKeyPress} getButtonColor={getButtonColor} />

      <ModeDialog show={showModeDialog} onClose={() => setShowModeDialog(false)} activeChapterId={activeChapterId} setActiveChapterId={setActiveChapterId} isDark={isDark} />

      <SubCategoryDialog show={showSubCategoryDialog} onClose={() => setShowSubCategoryDialog(false)} activeChapter={activeChapter} setActiveSubCategoryId={setActiveSubCategoryId} isDark={isDark} />

      <StepsDialog show={showStepsDialog} onClose={() => setShowStepsDialog(false)} stepsText={activeStepsData.text} expression={activeStepsData.expr} isDark={isDark} />
    </div>
  );
            }
