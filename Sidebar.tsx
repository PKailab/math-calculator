import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sigma, LineChart, ArrowLeftRight, History as HistoryIcon, Variable, HelpCircle, Palette, Type, Settings, Menu, Volume2, MessageSquare, Share2, Star, Book, ArrowLeft, Trash2, Brain } from 'lucide-react';

export interface SidebarProps {
  show: boolean;
  onClose: () => void;
  isDark: boolean;
  onOpenSettings: () => void;
  language: string;
  history?: { id: number; expression: string; result: string; rawResultText?: string }[];
  onClearHistory?: () => void;
  onOpenFormulas?: () => void;
  onOpenDictionary?: () => void;
  onOpenVariables?: () => void;
  onOpenHelp?: () => void;
  onOpenUnitConverter?: () => void;
  onOpenQuiz?: () => void;
  onOpenTheme?: () => void;
  onOpenFont?: () => void;
}

const SidebarItem = ({ icon, label, isDark, isActive = false, onClick }: { icon: React.ReactNode, label: string, isDark: boolean, isActive?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 transition-colors ${
      isActive 
        ? 'bg-red-500/20 text-red-400 border-l-4 border-red-500' 
        : `hover:bg-white/5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`
    }`}
  >
    <span className={isActive ? 'text-red-500' : 'text-gray-400'}>{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ 
  show, onClose, isDark, onOpenSettings, language, history = [], onClearHistory,
  onOpenFormulas, onOpenDictionary, onOpenVariables, onOpenHelp, onOpenUnitConverter, onOpenQuiz,
  onOpenTheme, onOpenFont
}) => {
  const t = (enLabel: string, hiLabel: string) => language === 'hi' ? hiLabel : enLabel;
  const [view, setView] = useState<'menu' | 'history'>('menu');

  // Reset view when closing
  React.useEffect(() => {
    if (!show) {
      setTimeout(() => setView('menu'), 300);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 w-[280px] z-[80] shadow-2xl flex flex-col ${isDark ? 'bg-[#2D3139]' : 'bg-white'}`}
          >
            {/* Sidebar Header */}
            <div className="p-4 flex flex-col gap-4 border-b border-white/10">
              {view === 'menu' ? (
                <div className="flex justify-between items-center text-gray-400">
                  <div className="flex gap-4">
                    <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                      <Volume2 size={20} />
                      <span className="text-[10px]">{t("Sound", "ध्वनि")}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                      <MessageSquare size={20} />
                      <span className="text-[10px]">{t("Feedback", "प्रतिक्रिया")}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                      <Share2 size={20} />
                      <span className="text-[10px]">{t("Share", "शेयर")}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                      <Star size={20} />
                      <span className="text-[10px]">{t("Rate", "रेटिंग")}</span>
                    </button>
                  </div>
                  <button onClick={onClose} className="hover:text-white">
                    <X size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center text-gray-400">
                  <button onClick={() => setView('menu')} className="flex items-center gap-2 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">{t("Back", "पीछे")}</span>
                  </button>
                  <button onClick={onClose} className="hover:text-white">
                    <X size={24} />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto py-2">
              <AnimatePresence mode="wait">
                {view === 'menu' ? (
                   <motion.div
                     key="menu"
                     initial={{ x: -20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: -20, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                   >
                    <SidebarItem icon={<Sigma size={20} />} label={t("Math Formulas", "गणित के सूत्र")} isDark={isDark} onClick={() => { onClose(); onOpenFormulas?.(); }} />
                    <SidebarItem icon={<Book size={20} />} label={t("Dictionary/Definition", "शब्दकोश/परिभाषा")} isDark={isDark} onClick={() => { onClose(); onOpenDictionary?.(); }} />
                    <SidebarItem icon={<Brain size={20} />} label={t("Quiz", "क्विज़")} isDark={isDark} onClick={() => { onClose(); onOpenQuiz?.(); }} />
                    <SidebarItem icon={<LineChart size={20} />} label={t("Graph", "ग्राफ़")} isDark={isDark} />
                    <SidebarItem icon={<ArrowLeftRight size={20} />} label={t("Unit Converter", "यूनिट कनवर्टर")} isDark={isDark} onClick={() => { onClose(); onOpenUnitConverter?.(); }} />
                    <SidebarItem icon={<HistoryIcon size={20} />} label={t("Calculation history", "कैलकुलेशन हिस्ट्री")} isDark={isDark} onClick={() => setView('history')} />
                    <SidebarItem icon={<Variable size={20} />} label={t("Variable value", "वेरिएबल वैल्यू")} isDark={isDark} onClick={() => { onClose(); onOpenVariables?.(); }} />
                    
                    <div className="h-px bg-white/10 my-2" />

                    <SidebarItem icon={<HelpCircle size={20} />} label={t("Help", "सहायता")} isDark={isDark} onClick={() => { onClose(); onOpenHelp?.(); }} />
                    <SidebarItem icon={<Palette size={20} />} label={t("Theme", "थीम")} isDark={isDark} onClick={() => { onClose(); onOpenTheme?.(); }} />
                    <SidebarItem icon={<Type size={20} />} label={t("Font", "फ़ॉन्ट")} isDark={isDark} onClick={() => { onClose(); onOpenFont?.(); }} />
                    <SidebarItem icon={<Settings size={20} />} label={t("Settings", "सेटिंग्स")} isDark={isDark} onClick={() => { onClose(); onOpenSettings(); }} />
                  </motion.div>
                ) : (
                  <motion.div
                     key="history"
                     initial={{ x: 20, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: 20, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                     className="flex flex-col h-full px-4"
                   >
                     <div className="flex justify-between items-center mb-4">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {t("History", "हिस्ट्री")}
                        </h3>
                        {history.length > 0 && (
                          <button onClick={onClearHistory} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        )}
                     </div>
                     {history.length === 0 ? (
                       <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                         {t("No history available", "कोई हिस्ट्री उपलब्ध नहीं")}
                       </div>
                     ) : (
                       <div className="flex flex-col gap-4 overflow-y-auto pb-6">
                         {history.slice().reverse().map((item) => (
                           <div key={item.id} className={`flex flex-col p-3 rounded-lg border ${isDark ? 'bg-black/20 border-white/5' : 'bg-gray-100 border-gray-200'} `}>
                             <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>{item.expression}</span>
                             <span className={`text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'} text-right whitespace-pre-wrap`}>
                               {item.result}
                             </span>
                           </div>
                         ))}
                       </div>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
