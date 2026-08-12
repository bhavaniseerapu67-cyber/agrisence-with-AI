import React from 'react';
import { Clock, CheckCircle2, PauseCircle, AlertTriangle, CloudRain, Wind, Droplets, Thermometer, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ActionWindowCard({ decision, currentLang = 'en' }) {
  if (!decision) return null;
  const t = getTranslation(currentLang);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACT NOW':
        return <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />;
      case 'WAIT':
      case 'WAIT FOR A BETTER WINDOW':
        return <PauseCircle className="w-8 h-8 text-amber-400 shrink-0 animate-bounce" />;
      case 'AVOID ACTION':
      case 'AVOID ACTION RIGHT NOW':
        return <ShieldAlert className="w-8 h-8 text-blue-400 shrink-0" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-orange-400 shrink-0" />;
    }
  };

  const getStatusDisplayLabel = (status) => {
    switch (status) {
      case 'ACT NOW':
        return t.actNow;
      case 'WAIT':
      case 'WAIT FOR A BETTER WINDOW':
        return t.waitWindow;
      case 'AVOID ACTION':
      case 'AVOID ACTION RIGHT NOW':
        return t.avoidAction;
      default:
        return t.insufficientInfo;
    }
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'ACT NOW':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-emerald-950/50';
      case 'WAIT':
      case 'WAIT FOR A BETTER WINDOW':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/50';
      case 'AVOID ACTION':
      case 'AVOID ACTION RIGHT NOW':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-blue-950/50';
      default:
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-orange-950/50';
    }
  };

  return (
    <div className="glass-card border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-5">
      
      {/* Background Accent glow */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none ${
        decision.status === 'ACT NOW' ? 'bg-emerald-500' : 'bg-amber-500'
      }`} />

      {/* Differentiator Badge Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t.climateIntel}</span>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700 font-semibold">
          Core Differentiator
        </span>
      </div>

      {/* Main Status & Recommended Action Window Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/90 border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div className="flex items-center space-x-3.5">
          {getStatusIcon(decision.status)}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Agronomic Weather Decision</div>
            <div className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center space-x-2 mt-0.5">
              <span>{getStatusDisplayLabel(decision.status)}</span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">{decision.headline}</p>
          </div>
        </div>

        {/* Action Window Pill */}
        <div className={`w-full sm:w-auto p-4 rounded-xl border text-center sm:text-right ${getBadgeStyle(decision.status)}`}>
          <div className="flex items-center justify-center sm:justify-end space-x-1.5 text-[11px] font-extrabold uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.actionWindowLabel}</span>
          </div>
          <div className="text-base sm:text-lg font-black tracking-tight text-white">
            {decision.actionWindow}
          </div>
        </div>
      </div>

      {/* Simple Explanation of WHY */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-2">
        <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.whyTitle}</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {decision.why}
        </p>
      </div>

      {/* Risk Factors Weather Matrix */}
      {decision.riskFactors && decision.riskFactors.length > 0 && (
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            {t.riskMatrixTitle}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {decision.riskFactors.map((rf, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-left ${
                  rf.isHigh
                    ? 'bg-amber-950/50 border-amber-500/40 text-amber-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-300'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-medium">{rf.label}</div>
                <div className="text-base font-extrabold text-slate-100 mt-0.5">{rf.value}</div>
                <div className={`text-[10px] font-bold mt-1 ${rf.isHigh ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {rf.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Related Warning Alerts */}
      {decision.weatherWarnings && decision.weatherWarnings.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            {t.weatherWarningsTitle}
          </div>
          {decision.weatherWarnings.map((warn, i) => (
            <div key={i} className="p-3.5 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
