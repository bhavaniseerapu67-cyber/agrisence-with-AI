import React, { useState } from 'react';
import { getCurrentGPSLocation, searchLocations, PRESET_FARMS } from '../services/locationService';
import { voiceService } from '../services/voiceService';
import { getTranslation, LANGUAGES } from '../data/translations';
import { MapPin, Navigation, Search, Check, Mic, MicOff, AlertCircle } from 'lucide-react';

export default function LocationPicker({ location, setLocation, onRefreshWeather, currentLang = 'en' }) {
  const t = getTranslation(currentLang);
  const langObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState(null);

  const handleDetectGPS = async () => {
    setIsLocating(true);
    try {
      const gpsLoc = await getCurrentGPSLocation();
      setLocation(gpsLoc);
      if (onRefreshWeather) onRefreshWeather(gpsLoc.lat, gpsLoc.lon, gpsLoc.name);
    } catch (err) {
      alert('GPS location detection failed: ' + err.message);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearchChange = async (val) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      const results = await searchLocations(val);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Voice Search Handler (SpeechRecognition)
  const handleToggleVoiceSearch = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      return;
    }

    setVoiceError(null);

    if (!voiceService.isSTTSupported()) {
      setVoiceError('Voice input is not supported in this browser. Please type your location.');
      return;
    }

    voiceService.startListening({
      lang: langObj.speechLang,
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onResult: async (transcript) => {
        setIsListening(false);
        if (transcript) {
          setQuery(transcript);
          handleSearchChange(transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        if (err.error === 'not-allowed') {
          setVoiceError(t.micPermissionDenied);
        } else {
          setVoiceError('Could not understand speech. Please try speaking again or type.');
        }
      }
    });
  };

  const selectItem = (item) => {
    setLocation(item);
    setQuery('');
    setSearchResults([]);
    if (onRefreshWeather) onRefreshWeather(item.lat, item.lon, item.name);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-slate-200 flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{t.fieldLocation}</span>
        </label>
        <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
          {t.gpsActive}
        </span>
      </div>

      {/* Selected Location Card & GPS Button */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-slate-200 truncate">{location.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">
                {location.lat?.toFixed(3)}°N, {location.lon?.toFixed(3)}°E
              </div>
            </div>
          </div>
          <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
        </div>

        <button
          type="button"
          disabled={isLocating}
          onClick={handleDetectGPS}
          className="px-4 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs rounded-xl border border-emerald-500/40 flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer"
        >
          <Navigation className={`w-4 h-4 text-emerald-400 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? t.locating : t.btnUseGPS}</span>
        </button>
      </div>

      {/* Search Input with Integrated Voice Input Button */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-12 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />

          {/* Voice Microphone Input Button */}
          <button
            type="button"
            onClick={handleToggleVoiceSearch}
            className={`absolute right-2 p-2 rounded-lg transition cursor-pointer ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
            }`}
            title="Speak Location"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Listening Indicator */}
        {isListening && (
          <div className="mt-2 p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-pulse">
            <Mic className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span className="font-bold">{t.micListening} ({langObj.label})</span>
          </div>
        )}

        {/* Voice Error Notification */}
        {voiceError && (
          <div className="mt-2 p-2 bg-amber-950/60 border border-amber-500/40 rounded-xl text-[11px] text-amber-300 flex items-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{voiceError}</span>
          </div>
        )}

        {/* Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden divide-y divide-slate-800 max-h-48 overflow-y-auto">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectItem(item)}
                className="w-full p-3 text-left hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition cursor-pointer"
              >
                <span className="font-medium truncate">{item.name}</span>
                <span className="text-[10px] text-slate-500 shrink-0 ml-2">Select</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Region Pills */}
      <div>
        <div className="text-[11px] text-slate-400 mb-2 font-medium">{t.quickRegions}</div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_FARMS.slice(0, 5).map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectItem(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                location.name === preset.name
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {preset.name.split(',')[0]}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
