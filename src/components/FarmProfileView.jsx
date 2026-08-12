import React, { useState } from 'react';
import { CROPS } from '../data/cropsData';
import { AGRONOMY_KNOWLEDGE } from '../data/agronomyKnowledge';
import { getTranslation, translateDiseaseName } from '../data/translations';
import { Key, ShieldCheck, BookOpen, Check, Cpu } from 'lucide-react';

export default function FarmProfileView({ customApiKey, setCustomApiKey, location, currentLang = 'en' }) {
  const [keyInput, setKeyInput] = useState(customApiKey || '');
  const [isSavedKey, setIsSavedKey] = useState(false);
  const [selectedCropTab, setSelectedCropTab] = useState('tomato');

  const t = getTranslation(currentLang);

  const handleSaveKey = () => {
    localStorage.setItem('agrisense_gemini_key', keyInput.trim());
    setCustomApiKey(keyInput.trim());
    setIsSavedKey(true);
    setTimeout(() => setIsSavedKey(false), 3000);
  };

  const selectedCropKnowledge = AGRONOMY_KNOWLEDGE[selectedCropTab] || {};

  return (
    <div className="space-y-6">
      
      {/* 1. Farm Overview Header Card */}
      <div className="glass-card border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            🌱
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100">{t.farmProfileTitle}</h2>
            <p className="text-xs text-slate-400">
              {t.activeRegionLabel} <span className="text-slate-200 font-semibold">{location.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800/50 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{t.systemStatus}</span>
        </div>
      </div>

      {/* 2. API Key Configuration Card */}
      <div className="glass-card border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
            <Key className="w-4 h-4 text-amber-400" />
            <span>{t.apiConfigTitle}</span>
          </div>
          <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
            customApiKey 
              ? 'bg-emerald-950 text-emerald-400 border-emerald-800/50' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {customApiKey ? t.customKeyActive : t.defaultKeyActive}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {t.apiConfigDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy... (Gemini API Key)"
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 font-mono"
          />

          <button
            type="button"
            onClick={handleSaveKey}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition active:scale-95 shrink-0 cursor-pointer"
          >
            {isSavedKey ? <Check className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
            <span>{isSavedKey ? t.keySaved : t.btnSaveKey}</span>
          </button>
        </div>
      </div>

      {/* 3. Agronomy Reference Library */}
      <div className="glass-card border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-200">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{t.agronomyLibraryTitle}</span>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {CROPS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCropTab(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition cursor-pointer ${
                selectedCropTab === c.id
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {c.icon} {t[c.id] || c.name}
            </button>
          ))}
        </div>

        {/* Diseases List for Selected Crop */}
        <div className="space-y-3 pt-2">
          {Object.keys(selectedCropKnowledge).length === 0 ? (
            <p className="text-xs text-slate-500 italic">{t.noDiseasesListed}</p>
          ) : (
            Object.entries(selectedCropKnowledge).map(([problemTitle, info], idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-100">{translateDiseaseName(problemTitle, currentLang)}</h4>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700 font-semibold">
                    {info.category}
                  </span>
                </div>

                <div className="text-xs text-slate-400">
                  {t.pathogenLabel} <span className="italic text-slate-300">{info.pathogen}</span>
                </div>

                <div className="text-xs text-slate-300 space-y-1 pt-1">
                  <div className="font-semibold text-slate-400 text-[11px]">{t.symptomsTitle}:</div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
                    {info.symptoms?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
