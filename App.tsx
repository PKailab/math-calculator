import React, { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import { CHAPTERS } from './chapters';

// Modular Components
import { Sidebar } from './components/Sidebar';
import { ControlCenter } from './components/ControlCenter';
import { Keyboard } from './components/Keyboard';
import { Display } from './components/Display';
import { ModeDialog } from './components/ModeDialog';
import { SubCategoryDialog } from './components/SubCategoryDialog';
import { FeaturePanel, MathFormulasContent, DictionaryContent, VariablesContent, HelpContent, UnitConverterContent, QuizContent } from './components/FeatureDialogs';
import { StepsDialog } from './components/StepsDialog';
import { t } from './utils/i18n';
import { STANDARD_NUMPAD, SCIENTIFIC_KEYBOARD_LAYOUT, SIMPLE_KEYBOARD_LAYOUT } from './utils/keyboardLayouts';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'light', 'dark', 'amoled', 'blue'
  const [language, setLanguage] = useState('hi'); // 'hi', 'en'
  const [inputText, setInputText] = useState("");
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [showSubCategoryDialog, setShowSubCategoryDialog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // History Item definition updated
  const [history, setHistory] = useState<{ id: number, expression: string, result: string, rawResultText?: string, hiddenFromScreen?: boolean, detailText?: string }[]>([]);
  
  const [showStepsDialog, setShowStepsDialog] = useState(false);
  const [activeStepsData, setActiveStepsData] = useState({ text: '', expr: '' });

  const [activeFeatureDialog, setActiveFeatureDialog] = useState<'formulas' | 'dictionary' | 'variables' | 'help' | 'unitConverter' | 'quiz' | 'theme' | 'font' | 'settings' | 'resultFormat' | null>(null);
  const [activeResultFormatData, setActiveResultFormatData] = useState<{expression: string, result: string} | undefined>(undefined);

  const [useScientificKeyboard, setUseScientificKeyboard] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const [isSimpleLayout, setIsSimpleLayout] = useState(false);
  const [resultText, setResultText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const acPressCountRef = useRef<number>(0);

  const activeChapter = CHAPTERS.find(c => c.id === activeChapterId) || CHAPTERS[0];
  const activeSubCategory = activeChapter.subCategories?.find(s => s.id === activeSubCategoryId) || null;

  // Stable Keyboard Height Logic
  useEffect(() => {
    const defaultHeight = Math.min(window.innerHeight * 0.45, 380);
    setKeyboardHeight(defaultHeight);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= 0 && newHeight < window.innerHeight * 0.75) {
        setKeyboardHeight(newHeight);
        if (newHeight < 50) {
          setIsKeyboardVisible(false);
        } else {
          setIsKeyboardVisible(true);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.touches[0].clientY;
      if (newHeight >= 0 && newHeight < window.innerHeight * 0.75) {
        setKeyboardHeight(newHeight);
        if (newHeight < 50) {
          setIsKeyboardVisible(false);
        } else {
          setIsKeyboardVisible(true);
        }
      }
    };

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopResizing);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', stopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [isResizing]);

  // Update result text hint when chapter changes
  useEffect(() => {
    let hint = "";
    if (activeChapter.subCategories && activeChapter.subCategories.length > 0) {
      const firstSub = activeChapter.subCategories[0];
      setActiveSubCategoryId(firstSub.id);
      hint = language === 'hi' 
        ? `मोड: ${activeChapter.title} - ${firstSub.title}\n\nनिर्देश: ${firstSub.inputGuide}\n\nप्रश्न दर्ज करें और 'SOLVE' दबाएं।`
        : `Mode: ${activeChapter.title} - ${firstSub.title}\n\nGuide: ${firstSub.inputGuide}\n\nEnter question and press 'SOLVE'.`;
    } else {
      setActiveSubCategoryId(null);
      hint = language === 'hi' 
        ? `मोड: ${activeChapter.title}\n\nनिर्देश: ${activeChapter.inputGuide}\n\nप्रश्न दर्ज करें और 'SOLVE' दबाएं।`
        : `Mode: ${activeChapter.title}\n\nGuide: ${activeChapter.inputGuide}\n\nEnter question and press 'SOLVE'.`;
    }
    setResultText(hint);
    setInputText("");
    setUseScientificKeyboard(false); // Reset to simple keyboard on chapter change
  }, [activeChapterId, language]);

  const handleKeyPress = (key: string) => {
    if (key !== "AC") {
      acPressCountRef.current = 0;
    }

    // Helper to insert at cursor position
    const insertAtCursor = (text: string) => {
      if (inputRef.current) {
        let start = inputRef.current.selectionStart || 0;
        const end = inputRef.current.selectionEnd || 0;

        if (start !== end) {
          const newText = inputText.slice(0, start) + text + inputText.slice(end);
          setInputText(newText);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(start + text.length, start + text.length);
              inputRef.current.focus();
            }
          }, 10);
          return;
        }

        // Smart Placeholder / Repeating Decimal Typing
        if (text.length === 1 && /[0-9]/.test(text)) {
            // Case 1: Cursor is BEFORE a repeating decimal box
            if (inputText.substring(start, start + 2) === "□\u0305") {
                const newText = inputText.slice(0, start) + text + "\u0305" + inputText.slice(start + 2);
                setInputText(newText);
                setTimeout(() => {
                  inputRef.current?.setSelectionRange(start + 2, start + 2);
                  inputRef.current?.focus();
                }, 10);
                return;
            }
            // Case 2: Cursor is AFTER a repeating decimal box
            if (start >= 2 && inputText.substring(start - 2, start) === "□\u0305") {
                const newText = inputText.slice(0, start - 2) + text + "\u0305" + inputText.slice(start);
                setInputText(newText);
                setTimeout(() => {
                  inputRef.current?.setSelectionRange(start, start);
                  inputRef.current?.focus();
                }, 10);
                return;
            }
            // Case 3: Cursor is BEFORE a normal box
            if (inputText[start] === "□") {
                const newText = inputText.slice(0, start) + text + inputText.slice(start + 1);
                setInputText(newText);
                setTimeout(() => {
                  inputRef.current?.setSelectionRange(start + 1, start + 1);
                  inputRef.current?.focus();
                }, 10);
                return;
            }
            // Case 4: Cursor is AFTER a normal box
            if (start > 0 && inputText[start - 1] === "□") {
                const newText = inputText.slice(0, start - 1) + text + inputText.slice(start);
                setInputText(newText);
                setTimeout(() => {
                  inputRef.current?.setSelectionRange(start, start);
                  inputRef.current?.focus();
                }, 10);
                return;
            }
            // Case 5: Cursor is just AFTER a repeating bar (keep adding with bar)
            if (start > 0 && inputText[start - 1] === "\u0305") {
                const newText = inputText.slice(0, start) + text + "\u0305" + inputText.slice(end);
                setInputText(newText);
                setTimeout(() => {
                  inputRef.current?.setSelectionRange(start + 2, start + 2);
                  inputRef.current?.focus();
                }, 10);
                return;
            }
        }

        const newText = inputText.slice(0, start) + text + inputText.slice(end);
        setInputText(newText);
        setTimeout(() => {
          if (inputRef.current) {
            const nextPos = start + text.length;
            inputRef.current.setSelectionRange(nextPos, nextPos);
            inputRef.current.focus();
          }
        }, 10);
      } else {
        setInputText(prev => prev + text);
      }
    };

    const resetStepState = () => {
      if (resultText) {
          setResultText("");
      }
    };

    if (key === "AC") {
      if (inputText || resultText) {
        setInputText("");
        setResultText("");
        acPressCountRef.current = 1;
      } else {
        if (acPressCountRef.current >= 1) {
           setHistory(prev => prev.map(item => ({ ...item, hiddenFromScreen: true })));
           acPressCountRef.current = 0;
        } else {
           acPressCountRef.current = 1;
        }
      }
    } else if (key === "DEL") {
      if (inputRef.current) {
        const start = inputRef.current.selectionStart || 0;
        const end = inputRef.current.selectionEnd || 0;
        if (start === end && start > 0) {
          setInputText(prev => prev.slice(0, start - 1) + prev.slice(start));
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(start - 1, start - 1);
              inputRef.current.focus();
            }
          }, 10);
        } else {
           setInputText(prev => prev.slice(0, start) + prev.slice(end));
           setTimeout(() => {
             if (inputRef.current) {
               inputRef.current.setSelectionRange(start, start);
               inputRef.current.focus();
             }
           }, 10);
        }
      } else {
        setInputText(prev => prev.slice(0, -1));
      }
      resetStepState();
    } else if (key === "◀") {
      if (inputRef.current) {
        let pos = Math.max(0, (inputRef.current.selectionStart || 0) - 1);
        if (pos > 0 && inputText[pos] === "\u0305") pos--;
        inputRef.current.setSelectionRange(pos, pos);
        inputRef.current.focus();
      }
    } else if (key === "▶") {
      if (inputRef.current) {
        const start = inputRef.current.selectionStart || 0;
        let nextBox = inputText.indexOf('□', start);
        if (nextBox === start) {
            nextBox = inputText.indexOf('□', start + 1);
        }
        if (nextBox !== -1) {
            inputRef.current.setSelectionRange(nextBox, nextBox);
        } else {
            let pos = Math.min(inputText.length, start + 1);
            if (inputText[pos] === "\u0305") pos++;
            inputRef.current.setSelectionRange(pos, pos);
        }
        inputRef.current.focus();
      }
    } else if (key === "SOLVE" || key === "=") {
      if (!inputText) return;
      
      let expressionToSolve = inputText;

      const customSolveFn = activeSubCategory?.solve || activeChapter.solve;

      const trySolve = (expr: string, isShort: boolean): string => {
          let res: string | { result: string; steps: string[] } = '';
          try {
              res = customSolveFn(expr, isShort);
          } catch(e) {
              res = "त्रुटि: अमान्य समीकरण।";
          }

          let finalRes = typeof res === 'object' && res !== null ? (isShort ? res.result : res.steps.join('\n')) : res;
          
          if (!finalRes) {
             return "त्रुटि: इस चैप्टर/मोड में यह इनपुट अमान्य है।";
          }
          return finalRes as string;
      };

      // Handle ÷R before anything else
      if (expressionToSolve.includes('÷R')) {
        const parts = expressionToSolve.split('÷R');
        if (parts.length === 2) {
          try {
            const leftStr = trySolve(parts[0], true).replace(/[^0-9.-]/g, '');
            const rightStr = trySolve(parts[1], true).replace(/[^0-9.-]/g, '');
            const a = parseFloat(leftStr);
            const b = parseFloat(rightStr);
            if (!isNaN(a) && !isNaN(b) && b !== 0) {
              const q = Math.floor(a / b);
              const r = a % b;
              const res = `Q = ${q},\\quad R = ${r}`;
              setHistory(prev => [...prev, { id: Date.now(), expression: expressionToSolve, result: res, rawResultText: res, detailText: res }]);
              setInputText("");
              setResultText("");
              return;
            }
          } catch(e) {}
        }
      }

      const openBrackets = (expressionToSolve.match(/\(/g) || []).length;
      const closeBrackets = (expressionToSolve.match(/\)/g) || []).length;
      if (openBrackets > closeBrackets) {
        expressionToSolve += ")".repeat(openBrackets - closeBrackets);
      }

      // Convert space to comma in list functions for LCM/HCF space support
      expressionToSolve = expressionToSolve.replace(/(lcm|hcf|gcd|factor)\(([^)]+)\)/gi, (match, func, args) => {
        return `${func}(${args.replace(/\s+/g, ',')})`;
      });

      // Pre-process fractions and placeholders
      expressionToSolve = expressionToSolve.replace(/□/g, '0');
      // Fix repeating decimal advanced mapping 0.1235̅6̅ -> (0.123 + 56/99000)
      expressionToSolve = expressionToSolve.replace(/([0-9]*)\.([0-9]*)((\d\u0305)+)/g, (match, intPart, nonRepPart, repeatingPart) => {
        const iPart = intPart || '0';
        const decimals = repeatingPart.replace(/\u0305/g, '');
        const denominator = '9'.repeat(decimals.length) + '0'.repeat(nonRepPart.length);
        const nonRepVal = nonRepPart ? `${iPart}.${nonRepPart}` : `${iPart}`;
        return `(${nonRepVal} + ${decimals}/${denominator})`;
      });
      expressionToSolve = expressionToSolve.replace(/(\d+)\s+(\d+)\/(\d+)/g, '($1 + $2/$3)');
      
      try {
          let detailRes = trySolve(expressionToSolve, false);
          let shortRes = trySolve(expressionToSolve, true);
          let displayRes = shortRes;
          
          if (shortRes.includes('=')) {
            const parts = shortRes.split('=');
            displayRes = parts[parts.length - 1].trim();
            shortRes = '= ' + displayRes;
          } else if (displayRes.startsWith('उत्तर: ')) {
            displayRes = displayRes.replace('उत्तर: ', '');
            shortRes = '= ' + displayRes;
          } else if (!shortRes.startsWith('=')) {
            shortRes = '= ' + shortRes; 
          }
          
          // Remove any leading equals signs as we are presenting it with the colon layout
          displayRes = displayRes.replace(/^=\s*/, '');
          
          if (displayRes === 'Infinity' || displayRes === '∞') displayRes = '∞';
          if (shortRes === '= Infinity' || shortRes === 'Infinity' || shortRes === '= ∞') shortRes = '= ∞';
          if (detailRes && detailRes.trim() === 'Infinity' || detailRes && detailRes.trim() === '∞') detailRes = '∞';
          
          setHistory(prev => [...prev, { 
             id: Date.now(), 
             expression: expressionToSolve, 
             result: displayRes, 
             rawResultText: shortRes,
             detailText: detailRes 
          }]);
          
          setInputText("");
          setResultText("");
      } catch (e) {
        setResultText(language === 'hi' ? "त्रुटि: इनपुट को प्रोसेस करने में समस्या आई।" : "Error: Failed to process input.");
      }
    } else if (key === "x²") {
      insertAtCursor("^2");
      resetStepState();
    } else if (key === "x³") {
      insertAtCursor("^3");
      resetStepState();
    } else if (key === "x⁻¹") {
      insertAtCursor("^-1");
      resetStepState();
    } else if (key === "10^") {
      insertAtCursor("10^(");
      resetStepState();
    } else if (key === "∞") {
      insertAtCursor("∞");
      resetStepState();
    } else if (key === "□/□") {
      const cursor = inputRef.current?.selectionStart || inputText.length;
      const textBefore = inputText.slice(0, cursor);
      const match = textBefore.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = match[1];
        const beforeStr = textBefore.slice(0, -num.length);
        const newText = beforeStr + num + "/□" + inputText.slice(cursor);
        setInputText(newText);
        setTimeout(() => {
          if (inputRef.current) {
             const pos = beforeStr.length + num.length + 1; // at □
             inputRef.current.setSelectionRange(pos, pos);
             inputRef.current.focus();
          }
        }, 10);
      } else {
        const newText = textBefore + "□/□" + inputText.slice(cursor);
        setInputText(newText);
        setTimeout(() => {
          if (inputRef.current) {
             inputRef.current.setSelectionRange(cursor, cursor);
             inputRef.current.focus();
          }
        }, 10);
      }
      resetStepState();
    } else if (key === "□□/□") {
      const cursor = inputRef.current?.selectionStart || inputText.length;
      const textBefore = inputText.slice(0, cursor);
      const match = textBefore.match(/(\d+\.?\d*)$/);
      if (match) {
        const num = match[1];
        const beforeStr = textBefore.slice(0, -num.length);
        const newText = beforeStr + num + " □/□" + inputText.slice(cursor);
        setInputText(newText);
        setTimeout(() => {
          if (inputRef.current) {
             const pos = beforeStr.length + num.length + 1; // at first □
             inputRef.current.setSelectionRange(pos, pos);
             inputRef.current.focus();
          }
        }, 10);
      } else {
        const newText = textBefore + "□ □/□" + inputText.slice(cursor);
        setInputText(newText);
        setTimeout(() => {
          if (inputRef.current) {
             inputRef.current.setSelectionRange(cursor, cursor);
             inputRef.current.focus();
          }
        }, 10);
      }
      resetStepState();
    } else if (key === "SPACE" || key === " ") {
      insertAtCursor(" ");
      resetStepState();
    } else if (["Sin", "Cos", "Tan", "Csc", "Sec", "Cot", "Log", "Ln"].includes(key)) {
      insertAtCursor(key.toLowerCase() + "(");
      resetStepState();
    } else if (["LCM", "HCF", "Factor", "Euclid"].includes(key) || key === "Euclid(") {
      insertAtCursor(key.replace('(', '') + "(");
      resetStepState();
    } else if (key === "√") {
      insertAtCursor("√(");
      resetStepState();
    } else if (key === "∛") {
      insertAtCursor("∛(");
      resetStepState();
    } else if (key === "0.□̅") {
      const cursor = inputRef.current?.selectionStart || inputText.length;
      const newText = inputText.slice(0, cursor) + "0.□\u0305" + inputText.slice(cursor);
      setInputText(newText);
      setTimeout(() => {
        if (inputRef.current) {
           inputRef.current.setSelectionRange(cursor + 2, cursor + 2);
           inputRef.current.focus();
        }
      }, 10);
      resetStepState();
    } else if (key === "E") {
      insertAtCursor("E");
      resetStepState();
    } else if (key === "Ans") {
      if (history && history.length > 0) {
        const lastResultStr = history[history.length - 1].result || "";
        let ansValue = lastResultStr;
        if (ansValue.includes(": R=")) {
           const match = ansValue.match(/\[\s*(-?\d+)/);
           if (match) ansValue = match[1];
        } else if (ansValue.includes("=")) {
           ansValue = ansValue.split("=").pop()?.trim() || "0";
        }
        ansValue = ansValue.replace(/,/g, '');
        if (ansValue && !isNaN(Number(ansValue))) {
            insertAtCursor(ansValue);
        } else {
            insertAtCursor(ansValue || "0");
        }
      } else {
        insertAtCursor("0");
      }
      resetStepState();
    } else if (["◀", "▶", "SHIFT", "ALPHA", "MODE", "2nd"].includes(key)) {
      // already handled or meta
    } else {
      insertAtCursor(key);
      resetStepState();
    }
  };

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeFeatureDialog !== null || showModeDialog || showSidebar) return;

      const key = e.key;
      
      if (key === 'Enter') {
        e.preventDefault();
        handleKeyPress('SOLVE');
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('DEL');
      } else if (key === 'Escape') {
        e.preventDefault();
        handleKeyPress('AC');
      } else if (key === ' ') {
        e.preventDefault();
        setInputText(prev => prev + ' ');
      } else if (key.length === 1) {
        let mappedKey = key;
        if (key === '*') mappedKey = '×';
        if (key === '/') mappedKey = '÷';
        
        if (/[0-9a-zA-Z\.\,\-\+\×\÷\(\)\^\;]/.test(mappedKey)) {
          e.preventDefault();
          handleKeyPress(mappedKey);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFeatureDialog, showModeDialog, showSidebar, activeChapter, activeSubCategory, inputText]);

  let keyboardRows = activeChapterId === 'ch0' ? SCIENTIFIC_KEYBOARD_LAYOUT : STANDARD_NUMPAD;

  if (activeSubCategory?.topKeyboardLayout) {
    keyboardRows = [...activeSubCategory.topKeyboardLayout, ...STANDARD_NUMPAD];
  } else if (activeSubCategory?.keyboardLayout) {
    keyboardRows = activeSubCategory.keyboardLayout;
  } else if (activeChapter?.topKeyboardLayout) {
    keyboardRows = [...activeChapter.topKeyboardLayout, ...STANDARD_NUMPAD];
  } else if (activeChapter?.keyboardLayout) {
    keyboardRows = activeChapter.keyboardLayout;
  }

  const getButtonColor = (text: string) => {
    // Red keys
    if (text === "AC") return "bg-red-500 border-red-700 hover:bg-red-400 text-white shadow-xl";
    // Orange/Yellow keys
    if (text === "DEL") return "bg-amber-500 border-amber-700 hover:bg-amber-400 text-white shadow-xl";
    
    // Blue keys
    if (text === "SOLVE" || text === "=") return "bg-blue-600 border-blue-800 hover:bg-blue-500 text-white shadow-xl";
    
    // Number Pad Details (Bigger feeling)
    if (["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "Ans"].includes(text)) {
      return "bg-[#333A45] border-[#1C2026] hover:bg-[#434B5A] text-white py-1.5 shadow-lg text-[24px]";
    }
    
    // Number Pad Operations
    if (["+", "-", "×", "÷", "%"].includes(text)) {
      return "bg-[#5B6373] border-[#3B4254] hover:bg-[#6C7688] text-white py-1.5 shadow-lg text-[22px]"; 
    }

    // Default Advanced Keys (Small gray)
    return "bg-[#C4C6CB] border-[#9AA0AA] hover:bg-[#D5D7DA] text-black shadow-md text-sm sm:text-base";
  };

  const isDark = theme !== 'light';

  return (
    <div className={`flex flex-col h-screen w-full ${theme === 'light' ? 'bg-gray-200 text-gray-900' : theme === 'amoled' ? 'bg-black text-white' : theme === 'blue' ? 'bg-[#0f172a] text-white' : 'bg-gray-900 text-white'} font-sans overflow-hidden ${isDark ? 'dark' : ''}`}>
      
      <Sidebar 
        show={showSidebar} 
        onClose={() => setShowSidebar(false)} 
        isDark={isDark} 
        onOpenSettings={() => setActiveFeatureDialog('settings')} 
        language={language}
        history={history}
        onClearHistory={() => setHistory([])}
        onOpenFormulas={() => setActiveFeatureDialog('formulas')}
        onOpenDictionary={() => setActiveFeatureDialog('dictionary')}
        onOpenVariables={() => setActiveFeatureDialog('variables')}
        onOpenHelp={() => setActiveFeatureDialog('help')}
        onOpenUnitConverter={() => setActiveFeatureDialog('unitConverter')}
        onOpenQuiz={() => setActiveFeatureDialog('quiz')}
        onOpenTheme={() => setActiveFeatureDialog('theme')}
        onOpenFont={() => setActiveFeatureDialog('font')}
      />

      <Display 
        theme={theme} 
        inputText={inputText} 
        setInputText={setInputText}
        history={history.filter(item => !item.hiddenFromScreen)}
        inputRef={inputRef}
        onShowDetail={(rawResult, expression) => {
          setResultText(rawResult);
          setInputText(expression);
        }} 
        onShowSteps={(detailText, expression) => {
          setActiveStepsData({ text: detailText, expr: expression });
          setShowStepsDialog(true);
        }}
        activeModeName={
          (() => {
            const translatedTitle = t(activeChapter.title, language);
            const chTitle = translatedTitle.includes(':') ? translatedTitle.split(':')[1].trim() : translatedTitle;
            const subTitle = activeSubCategory ? t(activeSubCategory.title, language) : '';
            return subTitle ? `${chTitle} ➜ ${subTitle}` : chTitle;
          })()
        }
        activeChapterId={activeChapterId}
        onOpenResultFormat={(item) => {
          setActiveResultFormatData(item);
          setActiveFeatureDialog('resultFormat');
        }}
      />

      <ControlCenter 
        onOpenSidebar={() => setShowSidebar(true)}
        onOpenSettings={() => setActiveFeatureDialog('settings')}
        onOpenMode={() => setShowModeDialog(true)}
        onOpenSubCategory={() => setShowSubCategoryDialog(true)}
        isKeyboardVisible={isKeyboardVisible}
        onToggleKeyboard={() => setIsKeyboardVisible(!isKeyboardVisible)}
        onStartResize={(e) => { setIsResizing(true); if ('preventDefault' in e) e.preventDefault(); }}
        activeChapter={activeChapter}
        activeSubCategoryId={activeSubCategoryId}
        setActiveSubCategoryId={(id) => { setActiveSubCategoryId(id); setInputText(""); }}
        language={language}
        t={t}
        isDark={isDark}
      />

      <Keyboard 
        isVisible={isKeyboardVisible}
        height={keyboardHeight}
        rows={keyboardRows}
        onKeyPress={handleKeyPress}
        getButtonColor={getButtonColor}
      />

      <FeaturePanel
        feature={activeFeatureDialog}
        onClose={() => setActiveFeatureDialog(null)}
        isDark={isDark}
        height={keyboardHeight}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        isSimpleLayout={isSimpleLayout}
        setIsSimpleLayout={setIsSimpleLayout}
        resultData={activeResultFormatData}
      />

      <ModeDialog 
        show={showModeDialog} 
        onClose={() => setShowModeDialog(false)} 
        isDark={isDark} 
        language={language} 
        activeChapterId={activeChapterId} 
        setActiveChapterId={setActiveChapterId} 
      />

      <SubCategoryDialog 
        show={showSubCategoryDialog} 
        onClose={() => setShowSubCategoryDialog(false)} 
        isDark={isDark} 
        language={language} 
        activeChapter={activeChapter} 
        activeSubCategoryId={activeSubCategoryId} 
        setActiveSubCategoryId={(id) => { setActiveSubCategoryId(id); setInputText(""); }}
      />

      <StepsDialog 
        show={showStepsDialog}
        onClose={() => setShowStepsDialog(false)}
        isDark={isDark}
        stepsText={activeStepsData.text}
        expression={activeStepsData.expr}
      />
    </div>
  );
}
