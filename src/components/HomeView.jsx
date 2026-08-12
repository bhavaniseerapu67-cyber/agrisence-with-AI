import React from 'react';
import { Camera, CloudSun, Sparkles, Clock, ArrowRight, Sprout, Thermometer, Wind, Droplets } from 'lucide-react';
import { CROPS } from '../data/cropsData';
import { getTranslation, translateDiseaseName } from '../data/translations';

export default function HomeView({ onStartDiagnosis, onSelectDemo, weather, latestAdvisory, setActiveTab, currentLang = 'en' }) {
  const t = getTranslation(currentLang);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Hero Field Intelligence Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-emerald-500/30 p-6 sm:p-10 shadow-2xl space-y-6">
        
        {/* Glowing Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{t.climateIntel}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            {t.heroTitlePrefix}<span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200 bg-clip-text text-transparent">{t.heroTitleSuffix}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 pt-2">
          <button
            type="button"
            onClick={onStartDiagnosis}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center space-x-3 transition active:scale-98 cursor-pointer group"
          >
            <Camera className="w-5 h-5 text-slate-950 group-hover:scale-110 transition" />
            <span>{t.btnDiagnose}</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition" />
          </button>

          <button
            type="button"
            onClick={onSelectDemo}
            className="px-6 py-4 bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700/80 flex items-center justify-center space-x-2 transition shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.btnDemo}</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              📸
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">{t.aiVisionPathology}</div>
              <div className="text-[11px] text-slate-400">{t.aiVisionPathologyDesc}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              🌩️
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">{t.liveWeatherMetrics}</div>
              <div className="text-[11px] text-slate-400">{t.liveWeatherMetricsDesc}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ⏱️
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">{t.actionWindowEngine}</div>
              <div className="text-[11px] text-slate-400">{t.actionWindowEngineDesc}</div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Latest Advisory & Action Window Card Preview */}
      {latestAdvisory ? (
        <div className="glass-card border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{t.latestAdvisoryTitle}</span>
            </h3>
            <button
              onClick={() => setActiveTab('advisory')}
              className="text-xs font-extrabold text-emerald-400 hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>{t.viewFullReport}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/80 border border-slate-800/90 p-4 rounded-2xl">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.analyzedCrop}</div>
              <div className="text-base font-black text-slate-100 mt-0.5">{latestAdvisory.crop}</div>
              <div className="text-xs text-rose-400 font-bold">{translateDiseaseName(latestAdvisory.disease, currentLang)}</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.agronomicDecision}</div>
              <div className={`text-base font-black mt-0.5 ${
                latestAdvisory.decision?.status === 'ACT NOW' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {latestAdvisory.decision?.status === 'ACT NOW' ? t.actNow : t.waitWindow}
              </div>
              <div className="text-xs text-slate-300 font-mono font-medium truncate">{latestAdvisory.decision?.actionWindow}</div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setActiveTab('advisory')}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-extrabold rounded-xl border border-emerald-500/40 transition cursor-pointer"
              >
                {t.openFullAdvisory}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 3. Live Weather Summary Card */}
      {weather && (
        <div className="glass-card border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <CloudSun className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-extrabold text-slate-100">{t.liveWeatherDashboard}</h3>
                <p className="text-xs text-slate-400">{weather.locationName}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('weather')}
              className="text-xs text-emerald-400 hover:underline font-bold cursor-pointer"
            >
              {t.fiveDayForecastLink}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.fieldTemp}</span>
              </div>
              <div className="text-xl font-black text-slate-100">{weather.temp}°C</div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1">
                <CloudSun className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.rainRisk}</span>
              </div>
              <div className="text-xl font-black text-blue-400">{weather.rainProb}%</div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>{t.windSpeed}</span>
              </div>
              <div className="text-xl font-black text-teal-400">{weather.windSpeed} km/h</div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.humidity}</span>
              </div>
              <div className="text-xl font-black text-cyan-400">{weather.humidity}%</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Target Crops Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>{t.supportedCrops}</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">{t.eightCrops}</span>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
          {CROPS.map((crop) => (
            <div
              key={crop.id}
              onClick={onStartDiagnosis}
              className="glass-card glass-card-hover p-4 rounded-2xl cursor-pointer transition flex items-center space-x-3.5 group"
            >
              <span className="text-3xl group-hover:scale-110 transition">{crop.icon}</span>
              <div>
                <div className="text-sm font-extrabold text-slate-200 group-hover:text-emerald-300">{t[crop.id] || crop.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{t[crop.category] || crop.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
