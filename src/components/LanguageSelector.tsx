import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '../i18n/translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeOption =
    SUPPORTED_LANGUAGES.find((item) => item.code === currentLanguage) ||
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="btn-language-selector"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f3f3f4] hover:bg-[#e8e8e9] text-black rounded-[2px] font-mono-num text-[11px] font-medium border border-[#e2e2e3] transition-colors shadow-xs"
        title="Switch Language / 切换语言"
      >
        <Globe className="w-3.5 h-3.5 text-[#5d5e66]" />
        <span>{activeOption.flag}</span>
        <span className="hidden sm:inline">{activeOption.nativeLabel}</span>
        <ChevronDown className="w-3 h-3 text-[#77767b] ml-0.5" />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-48 bg-white border border-[#e8e8e9] rounded-[2px] shadow-xl py-1 z-50 font-mono-num text-[11px] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="px-2.5 py-1 text-[10px] text-[#77767b] uppercase font-bold border-b border-[#f3f3f4] flex items-center justify-between">
            <span>Select Language</span>
            <span>语种选择</span>
          </div>

          <div className="py-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  id={`lang-opt-${lang.code}`}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-2.5 py-1.5 text-left flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-black text-white font-semibold'
                      : 'text-zinc-800 hover:bg-[#f3f3f4]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="leading-tight">{lang.nativeLabel}</span>
                      <span
                        className={`text-[9px] ${
                          isSelected ? 'text-zinc-300' : 'text-[#77767b]'
                        }`}
                      >
                        {lang.label}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
