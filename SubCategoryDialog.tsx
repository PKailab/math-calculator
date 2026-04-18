import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chapter, SubCategory } from '../chapters/types';
import { t } from '../utils/i18n';

interface SubCategoryDialogProps {
  show: boolean;
  onClose: () => void;
  isDark: boolean;
  language: string;
  activeChapter: Chapter;
  activeSubCategoryId: string | null;
  setActiveSubCategoryId: (id: string) => void;
}

export const SubCategoryDialog: React.FC<SubCategoryDialogProps> = ({
  show,
  onClose,
  isDark,
  language,
  activeChapter,
  activeSubCategoryId,
  setActiveSubCategoryId
}) => {
  const subCategories = activeChapter.subCategories || [];

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
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold tracking-wider uppercase">
                {language === 'hi' ? "उप-मोड चुनें (SUBC)" : "SELECT SUB-MODE (SUBC)"}
              </h2>
              <button onClick={onClose} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-2">
               <div className="mb-2 text-xs font-bold opacity-50 uppercase tracking-widest pl-1">
                 {t(activeChapter.title, language)}
               </div>
            </div>

            <div className="p-4 pt-0 overflow-y-auto grid grid-cols-1 gap-2">
              {subCategories.length === 0 ? (
                 <div className="p-4 text-center opacity-50 text-sm italic">
                    {language === 'hi' ? "इस चैप्टर में कोई उप-मोड (Subcategory) नहीं है।" : "No subcategories available for this chapter."}
                 </div>
              ) : subCategories.map((sub, index) => (
                <button 
                  key={sub.id} 
                  onClick={() => {
                    setActiveSubCategoryId(sub.id);
                    onClose();
                  }}
                  className={`flex items-center text-left p-3 rounded-lg border-2 transition-all ${
                    activeSubCategoryId === sub.id 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : isDark ? 'border-gray-700 bg-gray-800 hover:border-gray-500' : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-500 flex items-center justify-center font-bold mr-3 shrink-0 uppercase text-xs">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{t(sub.title, language)}</span>
                    <span className="text-xs opacity-60 mt-0.5">{sub.inputGuide}</span>
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
