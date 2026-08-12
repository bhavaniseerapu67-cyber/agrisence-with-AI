import React from 'react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { getTranslation, translateDiseaseName, translateReasoningText } from '../data/translations';

export default function DemoModal({ isOpen, onClose, onSelectScenario, currentLang = 'en' }) {
  if (!isOpen) return null;
  const t = getTranslation(currentLang);

  const getDecisionBadge = (decision) => {
    switch (decision) {
      case 'ACT NOW':
        return { label: t.actNow, style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      case 'WAIT':
      case 'WAIT FOR A BETTER WINDOW':
        return { label: t.waitWindow, style: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'AVOID ACTION':
      case 'AVOID ACTION RIGHT NOW':
        return { label: t.avoidAction, style: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      default:
        return { label: t.insufficientInfo, style: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-100">{t.demoModalTitle}</h3>
              <p className="text-xs text-slate-400">{t.demoModalSub}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Scenarios Grid */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {DEMO_SCENARIOS.map((scenario) => {
            const badge = getDecisionBadge(scenario.expectedDecision);
            return (
              <div
                key={scenario.id}
                onClick={() => {
                  onSelectScenario(scenario);
                  onClose();
                }}
                className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 transition cursor-pointer group flex items-start space-x-4"
              >
                <img
                  src={scenario.imageUrl}
                  alt={scenario.title}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0 mt-0.5"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-extrabold text-slate-100 group-hover:text-amber-300 transition truncate">
                      {t[scenario.cropId] || scenario.cropId.toUpperCase()} — {translateDiseaseName(scenario.mockDiagnosis.disease, currentLang)}
                    </h4>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 ${badge.style}`}>
                      {badge.label}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {translateReasoningText(scenario.reasoning, currentLang)}
                  </p>

                  <div className="text-[11px] text-slate-500 mt-2 flex items-center space-x-3">
                    <span>{t.fieldLocation}: {scenario.location}</span>
                    <span>{t.rainRisk}: {scenario.mockWeather.rainProb}%</span>
                    <span>{t.windSpeed}: {scenario.mockWeather.windSpeed} km/h</span>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition shrink-0 self-center" />
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2 border-t border-slate-800">
          <p className="text-[11px] text-slate-500">
            {t.demoNote}
          </p>
        </div>

      </div>
    </div>
  );
}
