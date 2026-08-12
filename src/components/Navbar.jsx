import React from 'react';
import { Home, Camera, CloudSun, BookOpen, History, Sprout, Sparkles, Globe } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { getTranslation } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, onOpenDemoModal, weather, currentLang, onChangeLang }) {
  const t = getTranslation(currentLang);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'diagnose', label: t.navDiagnose, icon: Camera, highlight: true },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'advisory', label: t.navAdvisory, icon: BookOpen },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'farm', label: t.navFarm, icon: Sprout }
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-900/40 px-3 sm:px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-950/50 shrink-0">
              <Sprout className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200 bg-clip-text text-transparent">
                  AgriSense AI
                </h1>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-emerald-800/50 hidden xs:inline">
                  {t.climateIntel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden md:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Controls: Language Selector + Weather Pill + Demo Mode */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Multilingual Language Switcher (English, Telugu, Hindi) */}
            <LanguageSelector
              currentLang={currentLang}
              onChangeLang={onChangeLang}
              compact={true}
            />

            {/* Weather Pill */}
            {weather && (
              <button 
                onClick={() => setActiveTab('weather')}
                className="hidden lg:flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs transition cursor-pointer"
              >
                <CloudSun className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">{weather.temp}°C</span>
                <span className="text-slate-400">| {weather.rainProb}% Rain</span>
              </button>
            )}

            {/* Demo Mode Button */}
            <button
              onClick={onOpenDemoModal}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/40 text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{t.demoMode}</span>
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed at bottom on mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 md:hidden">
        <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-950/60 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`relative ${item.highlight ? 'p-1 rounded-full bg-emerald-500/20 text-emerald-400' : ''}`}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-[54px] text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-slate-900/60 border-b border-slate-800/50 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Voice & Decision Engine Active</span>
          </div>
        </div>
      </nav>
    </>
  );
}
