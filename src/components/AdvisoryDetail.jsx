import React, { useState } from 'react';
import { Save, Check, Printer, ShieldCheck, AlertCircle, BookOpen } from 'lucide-react';
import { saveAdvisory } from '../services/historyStore';
import { getTranslation } from '../data/translations';
import VoiceAdvisoryControl from './VoiceAdvisoryControl';

export default function AdvisoryDetail({ advisoryData, onSavedSuccess, currentLang = 'en' }) {
  const [isSaved, setIsSaved] = useState(false);
  const t = getTranslation(currentLang);

  if (!advisoryData) return null;

  const { diagnosis, weather, decision, cropId, location, imageUrl } = advisoryData;
  const agInfo = diagnosis?.agronomyInfo || {};

  const handleSaveToHistory = () => {
    saveAdvisory({
      crop: diagnosis?.crop || cropId || 'Tomato',
      cropId: cropId || 'tomato',
      disease: diagnosis?.disease || 'Condition Analyzed',
      confidence: diagnosis?.confidence || 85,
      severity: diagnosis?.severity || 'Medium',
      location: location?.name || 'Field Location',
      weather,
      decision,
      imageUrl
    });
    setIsSaved(true);
    if (onSavedSuccess) onSavedSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  // Build spoken text string for TTS
  const buildSpokenAdvisoryText = () => {
    return `${t.advisoryReportTitle}. ${diagnosis?.crop}. ${t.q1Title} ${diagnosis?.disease}. ${t.q2Title} ${agInfo.safeTreatment?.[0] || decision?.steps?.[0] || 'Apply bio pesticide'}. ${t.q3Title} ${t.actionWindowLabel}: ${decision?.actionWindow}. ${decision?.why || ''}`;
  };

  return (
    <div className="glass-card border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-950 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-800/50">
              {t.climateIntel}
            </span>
            <span className="text-xs text-slate-400">{new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 mt-1">
            {t.advisoryReportTitle}
          </h1>
          <p className="text-xs text-slate-400">
            {t.fieldLocation}: <span className="text-slate-200 font-semibold">{location?.name || 'Selected Field'}</span> • {t.cropSelectedLabel}: <span className="text-emerald-400 font-semibold">{diagnosis?.crop}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleSaveToHistory}
            disabled={isSaved}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition cursor-pointer ${
              isSaved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                : 'bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 hover:from-emerald-400 hover:to-green-300 shadow-md active:scale-95'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? t.btnSaved : t.btnSaveAdvisory}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition cursor-pointer"
            title={t.btnPrint}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Voice Advisory Speech Synthesis Controller Component (Requirements 3, 4, 6, 7) */}
      <VoiceAdvisoryControl
        advisoryText={buildSpokenAdvisoryText()}
        currentLang={currentLang}
      />

      {/* 3 CORE FARMER QUESTIONS GRID (Requirement 17) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Question 1: What is wrong? */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center font-black">1</span>
            <span>{t.q1Title}</span>
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-100">{diagnosis?.disease}</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Confidence: <strong className="text-emerald-400">{diagnosis?.confidence}%</strong> • Severity: <strong className="text-rose-400">{diagnosis?.severity}</strong>
            </div>
          </div>
          <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-400 text-[11px]">{t.symptomsTitle}</div>
            {diagnosis?.symptoms?.slice(0, 2).map((sym, i) => (
              <div key={i} className="flex items-start space-x-1.5 text-[11px]">
                <span className="text-rose-400">•</span>
                <span>{sym}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Question 2: What should I do? */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-black">2</span>
            <span>{t.q2Title}</span>
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-100">{decision?.status === 'ACT NOW' ? 'Apply Safe IPM Bio-Control' : 'Wait & Prepare Field'}</div>
            <div className="text-xs text-slate-400 mt-0.5">Step-by-step non-chemical management</div>
          </div>
          <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-400 text-[11px]">{t.recommendedActionLabel}</div>
            <div className="text-[11px] leading-snug">
              {agInfo.safeTreatment?.[0] || 'Prune infected foliage and apply bio-pesticide.'}
            </div>
          </div>
        </div>

        {/* Question 3: When should I act? */}
        <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center font-black">3</span>
            <span>{t.q3Title}</span>
          </div>
          <div>
            <div className="text-sm font-extrabold text-amber-300">{decision?.actionWindow}</div>
            <div className="text-xs text-slate-400 mt-0.5">Based on 24h rain & wind forecast</div>
          </div>
          <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
            <div className="font-semibold text-slate-400 text-[11px]">{t.weatherRationaleLabel}</div>
            <div className="text-[11px] leading-snug text-slate-300">
              Rain: {weather?.rainProb}% • Wind: {weather?.windSpeed} km/h • Temp: {weather?.temp}°C
            </div>
          </div>
        </div>

      </div>

      {/* Practical Numbered Actions List */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 className="text-sm font-extrabold text-slate-100 flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>{t.practicalStepsTitle}</span>
        </h3>

        <div className="space-y-2.5">
          {decision?.steps?.map((step, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-start space-x-3 text-xs text-slate-200">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preventive Measures & Long-Term Management */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <h3 className="text-sm font-extrabold text-slate-100 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>{t.preventiveTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {agInfo.prevention?.map((prev, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-xs text-slate-300 flex items-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 shrink-0" />
              <span>{prev}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Regulatory Disclaimer */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-slate-300">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.disclaimerTitle}</span>
        </div>
        <p className="leading-relaxed">
          {decision?.safetyDisclaimer || 'AI guidance is informational and should not replace qualified local agricultural advice.'}
        </p>
        <p className="text-slate-500">
          Always follow locally registered crop product labels, dosage instructions, pre-harvest intervals (PHI), and safety guidelines specified by your state department of agriculture.
        </p>
      </div>

    </div>
  );
}
