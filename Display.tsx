import React, { useEffect, useRef, useState } from 'react';
import { generateFormats } from '../utils/mathFormats';
import { ExternalLink, List, Maximize2 } from 'lucide-react';
import { MathView } from './MathView';

interface DisplayProps {
  theme: string;
  inputText: string;
  setInputText: (val: string | ((prev: string) => string)) => void;
  history?: { id: number, expression: string, result: string, rawResultText?: string, detailText?: string }[];
  onShowDetail: (rawResult: string, expression: string) => void;
  onShowSteps: (detailText: string, expression: string) => void;
  activeModeName?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  activeChapterId?: string;
  onOpenResultFormat?: (item: {expression: string, result: string}) => void;
}

export const Display: React.FC<DisplayProps> = ({
  theme,
  inputText,
  setInputText,
  history = [],
  onShowDetail,
  onShowSteps,
  activeModeName = 'Calculator',
  inputRef,
  activeChapterId = 'ch0',
  onOpenResultFormat
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [popupItemId, setPopupItemId] = useState<number | null>(null);

  useEffect(() => {
    // Auto-scroll to bottom of output card
    if (scrollRef.current) {
      // Small delay to ensure DOM update
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [history, inputText]);

  const isLight = theme === 'light';
  
  return (
    <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-5 pb-2">
      <div 
        ref={scrollRef}
        className={`w-full flex-1 flex flex-col font-mono leading-tight overflow-y-auto px-4 rounded-[14px] sm:rounded-2xl border sm:border-2 ${isLight ? 'border-gray-400 bg-[#b6c4a8] text-[#1c1c1a] shadow-[0_2px_4px_rgba(255,255,255,0.8),inset_0_4px_12px_rgba(0,0,0,0.2)]' : theme === 'amoled' ? 'border-gray-800 bg-[#000] text-[#00ff41] shadow-[0_1px_2px_rgba(255,255,255,0.05),inset_0_6px_16px_rgba(0,0,0,0.4)]' : theme === 'blue' ? 'border-blue-900 bg-[#0f172a] text-cyan-300 shadow-[0_1px_2px_rgba(255,255,255,0.1),inset_0_6px_16px_rgba(0,0,0,0.4)]' : 'border-slate-700 bg-[#1E293B] text-green-400 shadow-[0_1px_2px_rgba(255,255,255,0.05),inset_0_6px_16px_rgba(0,0,0,0.4)]'}`}
        style={{ 
          backgroundImage: isLight 
            ? 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)' 
            : 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '3px 3px'
        }}
      >
        {/* Status Header */}
        <div className={`flex justify-end items-center text-[10px] font-bold pt-2 pb-1 select-none tracking-widest uppercase shrink-0 sticky top-0 z-10 ${isLight ? 'bg-[#b6c4a8]' : theme === 'amoled' ? 'bg-black' : theme === 'blue' ? 'bg-[#0f172a]' : 'bg-[#1E293B]'}`}>
            <div className="px-1.5 py-0.5 border border-red-500 text-red-600 rounded-sm font-black bg-opacity-10">
              {activeModeName}
            </div>
        </div>

        {/* History Flow (Upward scrolling calculation entries) */}
        <div className="flex flex-col w-full pb-8 pt-2">
          {history.map((item) => {
            const hasSteps = activeChapterId !== 'ch0' && item.detailText && item.detailText !== item.rawResultText && item.detailText.trim().length > 0;
            return (
            <div key={item.id} className="flex flex-col w-full mb-1">
              {/* Expression */}
              <div 
                className="w-full text-left font-medium text-2xl opacity-80 hover:opacity-100 cursor-pointer mb-0.5 tracking-wide transition-opacity overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide pb-2"
                onClick={() => {
                  setInputText(item.expression);
                  setTimeout(() => {
                    if (inputRef && inputRef.current) {
                      inputRef.current.focus();
                      inputRef.current.setSelectionRange(item.expression.length, item.expression.length);
                    }
                  }, 10);
                }}
                title="टच करके एडिट करें"
              >
                <span className="inline-block px-1">
                  <MathView math={item.expression} />
                </span>
              </div>
              {/* Result Row (with colon on left) */}
              <div className="w-full flex justify-between items-start mt-1">
                <span className="opacity-40 text-xl font-normal shrink-0 pl-1 pb-1 mt-1">:</span>
                <div className="flex flex-col items-end gap-1 relative w-[90%] overflow-hidden">
                  <div className="flex items-center gap-3 w-full justify-end flex-wrap">
                    {hasSteps && (
                       <button 
                         onClick={() => onShowSteps(item.detailText as string, item.expression)}
                         className={`px-3 py-1 font-sans text-xs md:text-sm font-bold tracking-wider rounded-full shadow border transition-all active:scale-95 ${isLight ? 'bg-black text-white hover:bg-gray-800 border-black/20' : 'bg-blue-600 text-white hover:bg-blue-500 border-blue-400/30'}`}
                       >
                         स्टेप्स
                       </button>
                    )}
                    <div className="w-full">
                      <div 
                        title="टच करके अन्य फॉर्मेट (जैसे भिन्न, मिक्स्ड-भिन्न) देखें"
                        className="font-bold text-[34px] cursor-pointer hover:opacity-70 tracking-widest leading-none pb-2 max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide"
                        onClick={() => setPopupItemId(popupItemId === item.id ? null : item.id)}
                        style={{ direction: 'rtl' }}
                      >
                         <span className="inline-block px-1" style={{ direction: 'ltr' }}>
                         {(() => {
                           // If activeChapter is ch0, use generating formats, otherwise just display.
                           if (activeChapterId !== 'ch0') return <MathView math={item.result} />;
                           const formats = generateFormats(item.expression, item.result);
                           
                           // Try displaying exactTex -> mixedFractionTex -> fractionTex -> decimal
                           if (formats.exactTex && !formats.decimal?.includes(formats.exact || '')) {
                               return <MathView math={formats.exactTex} isTex={true} />;
                           }
                           
                           return formats.exact ? <MathView math={formats.exact} /> : <MathView math={item.result} />;
                         })()}
                         </span>
                      </div>
                      {(() => {
                         if (activeChapterId !== 'ch0') return null;
                         const formats = generateFormats(item.expression, item.result);
                         const hasFraction = formats.fraction && formats.fraction !== item.result && formats.fraction !== formats.decimal;
                         if (formats.exact && formats.exact !== formats.decimal) {
                           return <div className="text-xl opacity-70 font-medium tracking-wide font-mono mt-1 w-full overflow-x-auto scrollbar-hide" style={{ direction: 'rtl' }}><span className="inline-block" style={{ direction: 'ltr' }}>= {formats.decimal}</span></div>;
                         } else if (hasFraction && formats.decimal) {
                           return <div className="text-xl opacity-70 font-medium tracking-wide font-mono mt-1 w-full overflow-x-auto scrollbar-hide" style={{ direction: 'rtl' }}><span className="inline-block" style={{ direction: 'ltr' }}>= {formats.decimal}</span></div>;
                         }
                         return null;
                      })()}
                    </div>
                  </div>

                  {/* Context Popup */}
                  {popupItemId === item.id && (
                     <div className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border z-50 overflow-hidden ${isLight ? 'bg-white border-black/10' : 'bg-[#2A2E35] border-white/10'}`}>
                        <div className={`px-4 py-2 flex justify-between items-center text-sm font-bold border-b ${isLight ? 'bg-gray-100 border-black/5 text-gray-700' : 'bg-white/5 border-white/5 text-gray-300'}`}>
                          Result format
                          <div className="flex gap-2">
                             {onOpenResultFormat && (
                               <button onClick={() => { setPopupItemId(null); onOpenResultFormat({expression: item.expression, result: item.result}); }} className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors" title="Open in full page">
                                 <Maximize2 size={16} />
                               </button>
                             )}
                          </div>
                        </div>
                        <div className="p-2 flex flex-col gap-1 max-h-64 overflow-y-auto overscroll-contain">
                           {(() => {
                              const formats = generateFormats(item.expression, item.result);
                              return [
                                 {l: 'Exact (Exact)', v: formats.exactTex || formats.exact, isTex: !!formats.exactTex},
                                 {l: 'Decimal', v: formats.decimal, isTex: false},
                                 {l: 'Fraction', v: formats.fraction, isTex: true},
                                 {l: 'Mixed fraction', v: formats.mixedFractionTex || formats.mixedFraction, isTex: !!formats.mixedFractionTex}
                              ].filter(fv => fv.v).map((fv, i) => (
                                 <div key={i} className={`p-2 rounded-lg flex flex-col ${isLight ? 'bg-[#c5cdc0] bg-opacity-30' : 'bg-black/20'}`}>
                                   <span className="text-xs opacity-60 mb-1">{fv.l}</span>
                                   <span className="font-mono text-base break-words break-all">
                                      {fv.isTex ? <MathView math={fv.v as string} isTex={true} /> : fv.v}
                                   </span>
                                 </div>
                              ));
                           })()}
                        </div>
                     </div>
                  )}
                </div>
              </div>
              {/* Thin Line Delimiter (Edge to Edge within padded container) */}
              <div className={`w-full h-[1px] opacity-20 mt-2 mb-2 ${isLight ? 'bg-black' : 'bg-white'}`} style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.1)' }} />
            </div>
          )})}
          
          {/* Current Typing Input Layer */}
          <div className="flex flex-col w-full relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              inputMode="none"
              onChange={(e) => setInputText(e.target.value)}
              className={`w-full bg-transparent border-none outline-none font-mono text-2xl tracking-wide scroll-smooth pointer-events-auto cursor-text ${isLight ? 'text-[#1c1c1a]' : 'text-white'}`}
              style={{ caretColor: isLight ? '#1c1c1a' : 'white' }}
            />
            
            {/* Live LaTeX Math Preview */}
            {inputText && (inputText.match(/[\^√\\/]|sin|cos|tan|log|ln|pi|cbrt/i)) && (
               <div className={`mt-2 opacity-70 pointer-events-none text-2xl min-h-[2rem]`}>
                  <MathView math={inputText} fallbackToRaw={false} />
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
