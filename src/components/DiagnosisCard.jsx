import React from 'react';
import { AlertTriangle, CheckCircle2, Sparkles, HelpCircle, Stethoscope } from 'lucide-react';
import { getTranslation, translateDiseaseName } from '../data/translations';

export default function DiagnosisCard({ diagnosis, currentLang = 'en' }) {
  if (!diagnosis) return null;
  const t = getTranslation(currentLang);

  const isHealthy = diagnosis.severity === 'Healthy' || diagnosis.disease?.toLowerCase().includes('healthy');
  const isLowConfidence = diagnosis.lowConfidenceAlert || diagnosis.confidence < 60;

  const translatedDisease = translateDiseaseName(diagnosis.disease, currentLang);

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return { label: t.critical, style: 'bg-red-500/20 text-red-400 border-red-500/40' };
      case 'high':
        return { label: t.high, style: 'bg-orange-500/20 text-orange-400 border-orange-500/40' };
      case 'medium':
      case 'medium-high':
        return { label: t.medium, style: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      case 'healthy':
        return { label: t.healthy, style: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
      default:
        return { label: t.medium, style: 'bg-blue-500/20 text-blue-400 border-blue-500/40' };
    }
  };

  const sevInfo = getSeverityBadge(diagnosis.severity);

  return (
    <div className="glass-card border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.aiPathologyTitle}</h3>
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 mt-1 flex items-center space-x-2">
            <span>{translatedDisease}</span>
            {isHealthy && <CheckCircle2 className="w-5 h-5 text-emerald-400 inline" />}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.targetCropLabel} <span className="font-semibold text-slate-200">{diagnosis.crop}</span> • {t.engineLabel} <span className="text-emerald-400">{diagnosis.source}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Confidence Badge */}
          <div className="bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-xl text-center">
            <div className="text-base font-extrabold text-emerald-400 leading-none">{diagnosis.confidence}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">{t.confidenceLabel}</div>
          </div>

          {/* Severity Badge */}
          <div className={`px-3.5 py-2 rounded-xl text-xs font-bold border ${sevInfo.style}`}>
            {sevInfo.label} {t.severityLabel}
          </div>
        </div>
      </div>

      {/* Low Confidence Alert Callout */}
      {isLowConfidence && (
        <div className="bg-amber-950/60 border border-amber-500/50 rounded-2xl p-4 text-xs text-amber-200 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-amber-300 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.lowConfidenceAlertTitle}</span>
          </div>
          <p>
            {t.lowConfidenceAlertSub}
          </p>
          <ul className="list-disc list-inside space-y-1 text-amber-300/90 pl-1">
            <li>{t.lowConfidenceStep1}</li>
            <li>{t.lowConfidenceStep2}</li>
          </ul>
        </div>
      )}

      {/* Visible Symptoms */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.symptomsTitle}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {diagnosis.symptoms?.map((symptom, idx) => (
            <div key={idx} className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-200 flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <span>{symptom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Possible Causes */}
      {diagnosis.alternativeCauses && diagnosis.alternativeCauses.length > 0 && (
        <div className="pt-2 border-t border-slate-800/60">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{t.alternativeCausesTitle}</span>
            <div className="flex flex-wrap gap-1.5">
              {diagnosis.alternativeCauses.map((alt, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-lg text-[11px] border border-slate-700">
                  {alt}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
