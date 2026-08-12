import React from 'react';
import { CloudSun, Thermometer, Droplets, Wind, CloudRain, Calendar, ShieldAlert } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function WeatherWidget({ weather, fullView = false, currentLang = 'en' }) {
  if (!weather) return null;

  const t = getTranslation(currentLang);

  // Farming suitability logic
  const isSprayingSafe = weather.rainProb < 35 && weather.windSpeed < 12;

  const getTranslatedDay = (dayStr) => {
    if (dayStr === 'Today') return t.today;
    if (dayStr === 'Tomorrow') return t.tomorrow;
    return dayStr;
  };

  return (
    <div className="glass-card border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Current Weather Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-slate-100">{weather.locationName}</h3>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
              weather.isLive 
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800/50' 
                : 'bg-amber-950 text-amber-400 border-amber-800/50'
            }`}>
              {weather.isLive ? 'Live API Weather' : 'Field Weather Engine'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Condition: <span className="text-slate-200">{weather.condition}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-xl self-start sm:self-auto">
          <CloudSun className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <div className="text-2xl font-black text-slate-100 leading-none">{weather.temp}°C</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">{t.fieldTemp}</div>
          </div>
        </div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
        
        <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-2xl">
          <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1.5">
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.rainRisk}</span>
          </div>
          <div className="text-base font-extrabold text-slate-100">{weather.rainProb}%</div>
          <div className="text-[10px] text-blue-400 mt-0.5 font-medium">Next 12h Probability</div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-2xl">
          <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1.5">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>{t.windSpeed}</span>
          </div>
          <div className="text-base font-extrabold text-slate-100">{weather.windSpeed} km/h</div>
          <div className="text-[10px] text-teal-400 mt-0.5 font-medium">
            {weather.windSpeed > 12 ? t.highDriftRisk : t.safe}
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-2xl">
          <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1.5">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.humidity}</span>
          </div>
          <div className="text-base font-extrabold text-slate-100">{weather.humidity}%</div>
          <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">
            {weather.humidity > 75 ? t.acceleratingSpores : t.moderate}
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-3.5 rounded-2xl">
          <div className="flex items-center text-slate-400 text-xs mb-1 space-x-1.5">
            <Thermometer className="w-3.5 h-3.5 text-rose-400" />
            <span>{t.precipitation}</span>
          </div>
          <div className="text-base font-extrabold text-slate-100">{weather.precipMm || 0} mm</div>
          <div className="text-[10px] text-rose-400 mt-0.5 font-medium">Current Rainfall</div>
        </div>

      </div>

      {/* Farming Suitability Gauges */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <ShieldAlert className={`w-4 h-4 ${isSprayingSafe ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="text-slate-300 font-semibold">{t.sprayingCondition}</span>
        </div>
        <span className={`font-bold px-3.5 py-1.5 rounded-xl border ${
          isSprayingSafe
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        }`}>
          {isSprayingSafe ? t.safeForSpraying : t.postponeSpraying}
        </span>
      </div>

      {/* 5-Day Forecast Grid */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">{t.fiveDayForecast}</h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {weather.dailyForecast ? (
            weather.dailyForecast.map((day, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-200">{getTranslatedDay(day.day)}</div>
                <div className="text-base font-black text-amber-300 mt-1">{day.tempMax}°C</div>
                <div className="text-[10px] text-slate-400">Min: {day.tempMin}°C</div>
                <div className="mt-2 text-[10px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-lg border border-blue-900/50">
                  {day.rainProbMax}% Rain
                </div>
              </div>
            ))
          ) : (
            weather.forecast?.map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 p-3 rounded-2xl text-center">
                <div className="text-xs font-bold text-slate-200">{item.time}</div>
                <div className="text-base font-black text-amber-300 mt-1">{item.temp}°C</div>
                <div className="text-[10px] text-blue-400 font-semibold mt-1">{item.rainProb}% Rain</div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
