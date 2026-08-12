import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ImageUpload from './components/ImageUpload';
import LocationPicker from './components/LocationPicker';
import WeatherWidget from './components/WeatherWidget';
import DiagnosisCard from './components/DiagnosisCard';
import ActionWindowCard from './components/ActionWindowCard';
import AdvisoryDetail from './components/AdvisoryDetail';
import HistoryView from './components/HistoryView';
import FarmProfileView from './components/FarmProfileView';
import DemoModal from './components/DemoModal';

import { DEFAULT_LOCATION } from './services/locationService';
import { fetchLiveWeather } from './services/weatherService';
import { runCropAIDiagnosis } from './services/aiVisionService';
import { generateAgronomicDecision } from './services/decisionEngine';
import { saveAdvisory } from './services/historyStore';
import { getTranslation } from './data/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('agrisense_lang') || 'en');
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [imageBase64, setImageBase64] = useState(null);
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [decision, setDecision] = useState(null);
  const [latestAdvisory, setLatestAdvisory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(localStorage.getItem('agrisense_gemini_key') || '');

  const t = getTranslation(currentLang);

  // Language switch handler
  const handleChangeLang = (newLang) => {
    setCurrentLang(newLang);
    localStorage.setItem('agrisense_lang', newLang);
  };

  // Fetch initial weather on mount
  useEffect(() => {
    fetchLiveWeather(location.lat, location.lon, location.name).then(setWeather);
  }, []);

  // Location weather refresher helper
  const handleRefreshWeather = (lat, lon, name) => {
    fetchLiveWeather(lat, lon, name).then(setWeather);
  };

  // Run full AI Pathology + Weather Decision Workflow
  const handleRunDiagnosis = async () => {
    if (!imageBase64) {
      alert('Please upload or capture a photo of the crop leaf first.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Fetch live or fallback weather if not cached
      let currentWeather = weather;
      if (!currentWeather) {
        currentWeather = await fetchLiveWeather(location.lat, location.lon, location.name);
        setWeather(currentWeather);
      }

      // 2. Run AI Crop Pathology Diagnosis
      const diagnosisResult = await runCropAIDiagnosis({
        cropId: selectedCrop,
        imageBase64OrUrl: imageBase64,
        customApiKey
      });
      setDiagnosis(diagnosisResult);

      // 3. Run Decision Engine
      const decisionResult = generateAgronomicDecision({
        diagnosis: diagnosisResult,
        weather: currentWeather,
        cropId: selectedCrop
      });
      setDecision(decisionResult);

      // 4. Save Advisory
      const advisoryObj = {
        crop: diagnosisResult.crop,
        cropId: selectedCrop,
        disease: diagnosisResult.disease,
        confidence: diagnosisResult.confidence,
        severity: diagnosisResult.severity,
        location: location.name,
        weather: currentWeather,
        decision: decisionResult,
        imageUrl: imageBase64
      };
      saveAdvisory(advisoryObj);
      setLatestAdvisory(advisoryObj);

      // 5. Trigger success feedback & navigate to advisory
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      setActiveTab('advisory');
    } catch (err) {
      alert('Error during diagnosis workflow: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Demo Scenario Handler
  const handleSelectDemoScenario = (scenario) => {
    setSelectedCrop(scenario.cropId);
    setImageBase64(scenario.imageUrl);
    setLocation({ name: scenario.location, lat: scenario.lat, lon: scenario.lon });
    setWeather(scenario.mockWeather);

    const diagnosisResult = {
      source: 'AgriSense Demo Engine',
      crop: scenario.mockDiagnosis.crop,
      disease: scenario.mockDiagnosis.disease,
      confidence: scenario.mockDiagnosis.confidence,
      severity: scenario.mockDiagnosis.severity,
      symptoms: scenario.mockDiagnosis.symptoms,
      alternativeCauses: scenario.mockDiagnosis.alternativeCauses,
      agronomyInfo: {
        safeTreatment: [
          'Prune heavily blighted lower canopy leaves',
          'Apply bio-fungicide during recommended safe weather window'
        ],
        prevention: ['Maintain plant spacing for canopy aeration']
      }
    };
    setDiagnosis(diagnosisResult);

    const decisionResult = generateAgronomicDecision({
      diagnosis: diagnosisResult,
      weather: scenario.mockWeather,
      cropId: scenario.cropId
    });

    decisionResult.status = scenario.expectedDecision;
    decisionResult.actionWindow = scenario.actionWindow;
    decisionResult.why = scenario.reasoning;

    setDecision(decisionResult);

    const advisoryObj = {
      crop: scenario.mockDiagnosis.crop,
      cropId: scenario.cropId,
      disease: scenario.mockDiagnosis.disease,
      confidence: scenario.mockDiagnosis.confidence,
      severity: scenario.mockDiagnosis.severity,
      location: scenario.location,
      weather: scenario.mockWeather,
      decision: decisionResult,
      imageUrl: scenario.imageUrl
    };

    saveAdvisory(advisoryObj);
    setLatestAdvisory(advisoryObj);

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setActiveTab('advisory');
  };

  // Render active view
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onStartDiagnosis={() => setActiveTab('diagnose')}
            onSelectDemo={() => setIsDemoModalOpen(true)}
            weather={weather}
            latestAdvisory={latestAdvisory}
            setActiveTab={setActiveTab}
            currentLang={currentLang}
          />
        );

      case 'diagnose':
        return (
          <div className="space-y-6">
            {/* Location Bar with Voice Search */}
            <LocationPicker
              location={location}
              setLocation={setLocation}
              onRefreshWeather={handleRefreshWeather}
              currentLang={currentLang}
            />

            {/* Photo Capture & Crop Selection */}
            <ImageUpload
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              imageBase64={imageBase64}
              setImageBase64={setImageBase64}
              onAnalyze={handleRunDiagnosis}
              isLoading={isLoading}
              currentLang={currentLang}
            />
          </div>
        );

      case 'weather':
        return (
          <div className="space-y-6">
            <LocationPicker
              location={location}
              setLocation={setLocation}
              onRefreshWeather={handleRefreshWeather}
              currentLang={currentLang}
            />
            <WeatherWidget weather={weather} fullView={true} currentLang={currentLang} />
          </div>
        );

      case 'advisory':
        if (!diagnosis || !decision) {
          return (
            <div className="glass-card border border-slate-800 rounded-3xl p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                🌿
              </div>
              <h2 className="text-xl font-bold text-slate-100">No Active Diagnosis Loaded</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload a crop leaf image in the <strong>{t.navDiagnose}</strong> tab or load a 1-click <strong>{t.demoMode}</strong> to generate complete agronomic guidance and voice advisory.
              </p>
              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => setActiveTab('diagnose')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Go to {t.navDiagnose} Tab
                </button>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  Load {t.demoMode}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            {/* Core Differentiator: Recommended Action Window Card */}
            <ActionWindowCard decision={decision} currentLang={currentLang} />

            {/* AI Pathology Diagnosis Summary */}
            <DiagnosisCard diagnosis={diagnosis} currentLang={currentLang} />

            {/* Complete Agronomic Advisory Deep Dive with Voice Advisory */}
            <AdvisoryDetail
              advisoryData={{
                diagnosis,
                weather,
                decision,
                cropId: selectedCrop,
                location,
                imageUrl: imageBase64
              }}
              currentLang={currentLang}
            />
          </div>
        );

      case 'history':
        return (
          <HistoryView
            onSelectAdvisory={(item) => {
              setDiagnosis({
                crop: item.crop,
                disease: item.disease,
                confidence: item.confidence,
                severity: item.severity,
                symptoms: item.decision?.steps || [],
                alternativeCauses: [],
                agronomyInfo: {}
              });
              setDecision(item.decision);
              setWeather(item.weather);
              setImageBase64(item.imageUrl);
              setSelectedCrop(item.cropId || 'tomato');
              setActiveTab('advisory');
            }}
            currentLang={currentLang}
          />
        );

      case 'farm':
        return (
          <FarmProfileView
            customApiKey={customApiKey}
            setCustomApiKey={setCustomApiKey}
            location={location}
            currentLang={currentLang}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-20 md:pb-8">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDemoModal={() => setIsDemoModalOpen(true)}
        weather={weather}
        currentLang={currentLang}
        onChangeLang={handleChangeLang}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {renderTabContent()}
      </main>

      {/* Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectScenario={handleSelectDemoScenario}
        currentLang={currentLang}
      />

    </div>
  );
}
