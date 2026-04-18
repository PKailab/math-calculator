import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface KeyboardProps {
  isVisible: boolean;
  height: number;
  rows: (string | null)[][];
  onKeyPress: (key: string) => void;
  getButtonColor: (text: string) => string;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  isVisible,
  height,
  rows,
  onKeyPress,
  getButtonColor
}) => {
  const isFullKeyboard = rows.length > 4;
  const topRows = isFullKeyboard ? rows.slice(0, rows.length - 4) : [];
  const bottomRows = rows.slice(Math.max(0, rows.length - 4));

  const renderKey = (key: string | null, index: number) => {
    if (!key) return <div key={index} className="flex-1" />;
    return (
      <button
        key={index}
        onClick={() => onKeyPress(key)}
        className={`flex-1 flex items-center justify-center rounded-lg font-bold shadow-md transition-all active:translate-y-1 active:shadow-none border-b-[3px] active:border-b-0 ${getButtonColor(key)}`}
      >
        {key === "SPACE" ? "SPACE" : key === "SOLVE" ? "SOLVE" : 
         key === "□/□" ? (
           <div className="flex flex-col items-center justify-center">
             <div className="w-[11px] h-[13px] border-[1.5px] border-current rounded-[1px]"></div>
             <div className="w-[16px] h-[1.5px] bg-current my-[2px] rounded-full"></div>
             <div className="w-[11px] h-[13px] border-[1.5px] border-current rounded-[1px]"></div>
           </div>
         ) : key === "□□/□" ? (
           <div className="flex items-center justify-center">
             <div className="w-[11px] h-[13px] border-[1.5px] border-current rounded-[1px] mr-[3px]"></div>
             <div className="flex flex-col items-center justify-center">
               <div className="w-[9px] h-[11px] border-[1.5px] border-current rounded-[1px]"></div>
               <div className="w-[14px] h-[1.5px] bg-current my-[2px] rounded-full"></div>
               <div className="w-[9px] h-[11px] border-[1.5px] border-current rounded-[1px]"></div>
             </div>
           </div>
         ) : key === "0.□̅" ? (
           <div className="flex items-center justify-center font-bold text-sm tracking-tighter">
             <span>0.</span>
             <div className="flex flex-col items-center justify-center ml-[1px]">
               <div className="w-[11px] h-[1.5px] bg-current mb-[1px] rounded-full"></div>
               <div className="w-[11px] h-[13px] border-[1.5px] border-current rounded-[1px]"></div>
             </div>
           </div>
         ) : key}
      </button>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          style={{ height: height }}
          className="w-full bg-[#2A2A2A] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 flex flex-col"
        >
          <div className="flex-1 p-2 pb-6 overflow-y-auto">
            <div className="max-w-md mx-auto flex flex-col gap-2 h-full">
              
              {isFullKeyboard && (
                <div className="flex-[6] flex flex-col gap-2 min-h-0">
                  {topRows.map((row, rowIndex) => (
                    <div key={`top-${rowIndex}`} className="flex gap-2 w-full flex-1">
                      {row.map((key, colIndex) => renderKey(key, colIndex))}
                    </div>
                  ))}
                </div>
              )}

              <div className={isFullKeyboard ? "flex-[4] flex flex-col gap-2 min-h-0" : "flex-1 flex flex-col gap-2 min-h-0"}>
                {bottomRows.map((row, rowIndex) => (
                  <div key={`bottom-${rowIndex}`} className="flex gap-2 w-full flex-1">
                    {row.map((key, colIndex) => renderKey(key, colIndex))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
