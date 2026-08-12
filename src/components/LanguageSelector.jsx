import React from 'react';
import { LANGUAGES } from '../data/translations';
import { Globe, Check } from 'lucide-react';

export default function LanguageSelector({ currentLang, onChangeLang, compact = false }) {
  const currentObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-1 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 p-1 rounded-xl shadow-sm">
        <Globe className="w-4 h-4 text-emerald-400 ml-1.5 shrink-0" />
        <div className="flex items-center space-x-1">
          {LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onChangeLang(lang.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span>{lang.flag}</span>
                <span className={compact ? 'hidden sm:inline' : 'inline'}>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
