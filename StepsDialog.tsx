import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface StepsDialogProps {
  show: boolean;
  onClose: () => void;
  isDark: boolean;
  stepsText: string;
  expression: string;
}

export const StepsDialog: React.FC<StepsDialogProps> = ({
  show,
  onClose,
  isDark,
  stepsText,
  expression
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm">
          <motion.div 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 100 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
             className={`w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh] ${isDark ? 'bg-[#1E293B] text-slate-200' : 'bg-white text-gray-800'}`}
          >
             <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-slate-700/50' : 'border-gray-200'}`}>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="text-green-500" size={24} />
                  <span>स्टेप-बाय-स्टेप हल</span>
                </h2>
                <button 
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} />
                </button>
             </div>

             <div className="p-6 overflow-y-auto font-mono text-base sm:text-lg leading-relaxed whitespace-pre-wrap select-text">
                <div className={`mb-6 p-4 rounded-xl text-center text-2xl tracking-widest bg-opacity-10 opacity-80 ${isDark ? 'bg-white' : 'bg-black'}`}>
                   {expression}
                </div>
                {stepsText.split('\n').map((line, idx) => {
                  const stepMatch = line.match(/^(Step\s*\d+:?|चरण\s*\d+:?)\s*(.*)/i);
                  if (stepMatch) {
                    let label = stepMatch[1].trim();
                    if (!label.endsWith(':')) label += ':';
                    return (
                      <div key={idx} className="mb-3 flex items-start">
                        <span className={`font-bold shrink-0 mr-3 px-2.5 py-0.5 rounded-md text-sm sm:text-base tracking-wide ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                          {label}
                        </span>
                        <span className="flex-1 mt-0.5 leading-relaxed">{stepMatch[2]}</span>
                      </div>
                    );
                  }
                  return <div key={idx} className="mb-2 leading-relaxed">{line}</div>;
                })}
             </div>
             
             <div className="px-6 py-4 flex justify-end">
               <button 
                 onClick={onClose}
                 className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95"
               >
                 ठीक है (OK)
               </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
