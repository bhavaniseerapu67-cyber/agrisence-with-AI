import React, { useState, useEffect } from 'react';
import { voiceService } from '../services/voiceService';
import { LANGUAGES } from '../data/translations';
import { Volume2, VolumeX, Square, Play, Sparkles, AlertCircle, Radio } from 'lucide-react';

export default function VoiceAdvisoryControl({ advisoryText, currentLang = 'en' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [hasVoiceError, setHasVoiceError] = useState(false);

  const langObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    setIsSupported(voiceService.isTTSSupported());
  }, []);

  useEffect(() => {
    // Stop speech if text or language changes
    return () => {
      voiceService.stopSpeaking();
      setIsPlaying(false);
    };
  }, [advisoryText, currentLang]);

  const handleToggleSpeech = () => {
    if (isPlaying) {
      voiceService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setHasVoiceError(false);
      
      voiceService.speakText({
        text: advisoryText,
        lang: langObj.speechLang,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: (err) => {
          console.warn('Speech playback error:', err);
          setIsPlaying(false);
          setHasVoiceError(true);
        }
      });
    }
  };

  if (!isSupported) {
    return (
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Speech synthesis is not supported by your browser. Text advisory is available below.</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Voice Title & Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg transition ${
            isPlaying
              ? 'bg-emerald-500 text-slate-950 animate-pulse-ring'
              : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
          }`}>
            {isPlaying ? <Radio className="w-6 h-6 animate-spin" /> : <Volume2 className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-extrabold text-slate-100">Farmer Voice Advisory</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/40">
                {langObj.label} Voice ({langObj.flag})
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isPlaying ? '🔊 Speaking advisory aloud in your language...' : 'Click below to listen to complete field advisory in audio.'}
            </p>
          </div>
        </div>

        {/* Large Voice Action Button */}
        <button
          type="button"
          onClick={handleToggleSpeech}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center space-x-2.5 shadow-xl transition active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-950/60 ring-2 ring-red-400'
              : 'bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-400 hover:to-green-300 text-slate-950 shadow-emerald-950/60 ring-2 ring-emerald-400/30'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-5 h-5 fill-current" />
              <span>⏹️ Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span>🔊 Listen to Advisory ({langObj.label})</span>
            </>
          )}
        </button>

      </div>

      {/* Visual Equalizer / Soundwave animation when playing */}
      {isPlaying && (
        <div className="flex items-center justify-center space-x-1.5 pt-2 border-t border-emerald-900/40">
          <span className="w-1.5 h-6 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-9 bg-emerald-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-12 bg-green-400 rounded-full animate-bounce" />
          <span className="w-1.5 h-8 bg-emerald-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="text-xs text-emerald-300 font-extrabold ml-3">Reading Advisory Aloud...</span>
        </div>
      )}

      {hasVoiceError && (
        <div className="text-[11px] text-amber-300 bg-amber-950/80 p-2.5 rounded-xl border border-amber-500/40">
          ⚠️ Voice playback note: Telugu/Hindi text is displayed. Device default voice engine is reading advisory.
        </div>
      )}
    </div>
  );
}
