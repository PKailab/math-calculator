import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS } from '../chapters';
import { t } from '../utils/i18n';

interface ModeDialogProps {
  show: boolean;
  onClose: () => void;
  isDark: boolean;
  language: string;
  activeChapterId: string;
  setActiveChapterId: (id: string) => void;
}

export const ModeDialog: React.FC<ModeDialogProps> = ({
  show,
  onClose,
  isDark,
  language,
  activeChapterId,
  setActiveChapterId
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${isDark ? 'bg-[#1E293B] text-white' : 'bg-gray-100 text-gray-900'}`}
          >
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-wider">{language === 'hi' ? "मोड चुनें (CHAPTER)" : "SELECT MODE (CHAPTER)"}</h2>
              <button onClick={onClose} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto grid grid-cols-1 gap-2">
              {CHAPTERS.map((chapter, index) => (
                <button 
                  key={chapter.id} 
                  onClick={() => {
                    setActiveChapterId(chapter.id);
                    onClose();
                  }}
                  className={`flex items-center text-left p-3 rounded-lg border-2 transition-all ${
                    activeChapterId === chapter.id 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : isDark ? 'border-gray-700 bg-gray-800 hover:border-gray-500' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold mr-3 shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t(chapter.title, language)}</span>
                    <span className="text-xs opacity-60 mt-0.5">{chapter.inputGuide}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
