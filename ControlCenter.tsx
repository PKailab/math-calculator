import React from 'react';
import { Menu, Sigma, ChevronDown, ChevronUp, Book, Maximize2, Minimize2 } from 'lucide-react';

import { Chapter } from '../chapters/types';

interface ControlCenterProps {
  onOpenSidebar: () => void;
  onOpenSettings: () => void;
  onOpenMode: () => void;
  onOpenSubCategory: () => void;
  isKeyboardVisible: boolean;
  onToggleKeyboard: () => void;
  onStartResize: (e: React.MouseEvent | React.TouchEvent) => void;
  activeChapter: Chapter;
  activeSubCategoryId: string | null;
  setActiveSubCategoryId: (id: string) => void;
  language: string;
  t: (text: string, lang: string) => string;
  isDark: boolean;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  onOpenSidebar,
  onOpenSettings,
  onOpenMode,
  onOpenSubCategory,
  isKeyboardVisible,
  onToggleKeyboard,
  onStartResize,
  activeChapter,
  activeSubCategoryId,
  setActiveSubCategoryId,
  language,
  t,
  isDark
}) => {
  return (
    <div className="w-full flex flex-col z-30">
      {/* Thin Keyboard Toggle Line/Handle */}
      <div 
        onClick={onToggleKeyboard}
        onMouseDown={onStartResize}
        onTouchStart={onStartResize}
        className="w-full h-1.5 bg-gray-600 hover:bg-blue-500 cursor-ns-resize flex items-center justify-center transition-colors group relative shadow-inner"
      >
        <div className="w-12 h-1 bg-white/30 rounded-full group-hover:bg-white/60" />
      </div>

      <div 
        className="w-full bg-[#3D4450] text-white py-1 px-3 flex justify-between items-center shadow-lg select-none border-t border-white/5"
      >
        <div className="flex items-center gap-1.5">
          {/* Sidebar Toggle Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenSidebar(); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-300"
          >
            <Menu size={18} />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Mode Button on the Left */}
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenMode(); }}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all outline outline-1 outline-white/20"
          >
            MODE
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* SubCategory Button on the Right */}
          {activeChapter && activeChapter.subCategories && activeChapter.subCategories.length > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); onOpenSubCategory(); }}
              className="bg-purple-600 hover:bg-purple-500 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all outline outline-1 outline-white/20"
            >
              SUBC
            </button>
          )}

          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Keyboard Visibility Toggle (Icon only for space) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleKeyboard(); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400"
          >
            {isKeyboardVisible ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
