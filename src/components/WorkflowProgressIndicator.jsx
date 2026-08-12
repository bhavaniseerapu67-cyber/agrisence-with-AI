import React from 'react';
import { Camera, Stethoscope, CloudRain, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function WorkflowProgressIndicator({ currentStep = 5, currentLang = 'en' }) {
  const t = getTranslation(currentLang);

  const steps = [
    { id: 1, label: 'PHOTO', icon: Camera, status: 'Completed' },
    { id: 2, label: 'AI DIAGNOSIS', icon: Stethoscope, status: 'Completed' },
    { id: 3, label: 'WEATHER', icon: CloudRain, status: 'Completed' },
    { id: 4, label: 'DECISION', icon: ShieldAlert, status: 'Completed' },
    { id: 5, label: 'ACTION WINDOW', icon: Clock, status: 'Active' }
  ];

  return (
    <div className="glass-card border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AgriSense End-to-End Workflow Pipeline</span>
        </span>
        <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-bold">
          5 / 5 Steps Executed
        </span>
      </div>

      {/* Progress Steps Bar */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 pt-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.id <= currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center text-center group">
              
              {/* Icon Circle */}
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition shadow-lg relative ${
                isActive
                  ? 'bg-gradient-to-tr from-emerald-500 to-green-400 text-slate-950 font-black ring-2 ring-emerald-400 scale-105 shadow-emerald-950/60'
                  : isCompleted
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                  : 'bg-slate-950 text-slate-600 border border-slate-800'
              }`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                {isCompleted && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Step Label */}
              <div className="mt-1.5">
                <div className={`text-[9px] sm:text-[11px] font-black tracking-tight leading-none ${
                  isActive ? 'text-emerald-300' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {step.label}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
