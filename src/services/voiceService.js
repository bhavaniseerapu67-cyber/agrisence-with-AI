// Browser Native Web Speech API Service
// Text-to-Speech (SpeechSynthesis) + Speech-to-Text (SpeechRecognition)

class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.SpeechRecognition = typeof window !== 'undefined' 
      ? (window.SpeechRecognition || window.webkitSpeechRecognition || null)
      : null;
    this.activeUtterance = null;
    this.activeRecognition = null;
  }

  // Check if Text to Speech is supported
  isTTSSupported() {
    return !!this.synth;
  }

  // Check if Speech Recognition is supported
  isSTTSupported() {
    return !!this.SpeechRecognition;
  }

  // Get available voices on the device
  getAvailableVoices() {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  // Find best matching voice for language code (e.g. 'te-IN', 'hi-IN', 'en-IN')
  findBestVoice(langCode = 'en-IN') {
    const voices = this.getAvailableVoices();
    if (!voices || voices.length === 0) return null;

    const baseLang = langCode.split('-')[0].toLowerCase();

    // 1. Exact match (e.g. 'te-IN' or 'hi-IN')
    let match = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());
    if (match) return match;

    // 2. Base match (e.g. 'te' or 'hi' or 'en')
    match = voices.find(v => v.lang.toLowerCase().startsWith(baseLang));
    if (match) return match;

    // 3. Name match (e.g. voice containing 'Telugu' or 'Hindi' or 'India')
    const langNameMap = { te: 'telugu', hi: 'hindi', en: 'english' };
    const nameSearch = langNameMap[baseLang] || baseLang;
    match = voices.find(v => v.name.toLowerCase().includes(nameSearch));
    if (match) return match;

    // 4. Default voice fallback
    return voices.find(v => v.default) || voices[0];
  }

  // Speak text aloud using SpeechSynthesis
  speakText({ text, lang = 'en-IN', onStart, onEnd, onError }) {
    if (!this.synth) {
      if (onError) onError(new Error('Speech Synthesis is not supported in this browser.'));
      return;
    }

    // Stop any ongoing speech
    this.stopSpeaking();

    const cleanText = text.replace(/<[^>]*>?/gm, ''); // strip any HTML tags
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower pace for clarity in farming advisory
    utterance.pitch = 1.0;

    const voice = this.findBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (evt) => {
      this.activeUtterance = null;
      console.warn('SpeechSynthesis error:', evt);
      if (onError) onError(evt);
    };

    this.activeUtterance = utterance;
    this.synth.speak(utterance);
  }

  // Stop current speech playback
  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.activeUtterance = null;
    }
  }

  // Check if currently speaking
  isSpeaking() {
    return this.synth ? this.synth.speaking : false;
  }

  // Start Speech Recognition (Voice Input)
  startListening({ lang = 'en-IN', onResult, onError, onEnd, onStart }) {
    if (!this.SpeechRecognition) {
      if (onError) onError(new Error('Speech Recognition is not supported by your browser. Please type manually.'));
      return null;
    }

    if (this.activeRecognition) {
      try { this.activeRecognition.stop(); } catch {}
    }

    const recognition = new this.SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (onStart) onStart();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      if (onResult) onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.warn('SpeechRecognition error:', event.error);
      if (onError) onError(event);
    };

    recognition.onend = () => {
      this.activeRecognition = null;
      if (onEnd) onEnd();
    };

    try {
      recognition.start();
      this.activeRecognition = recognition;
      return recognition;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  }

  // Stop listening
  stopListening() {
    if (this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch {}
      this.activeRecognition = null;
    }
  }
}

export const voiceService = new VoiceService();
