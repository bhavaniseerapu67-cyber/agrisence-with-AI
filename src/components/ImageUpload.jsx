import React, { useState, useRef } from 'react';
import { CROPS } from '../data/cropsData';
import { validateImageQuality } from '../services/aiVisionService';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { Camera, Upload, Trash2, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, TestTube2 } from 'lucide-react';
import { getTranslation, translateDiseaseName } from '../data/translations';

export default function ImageUpload({ selectedCrop, setSelectedCrop, imageBase64, setImageBase64, onAnalyze, isLoading, currentLang = 'en' }) {
  const [qualityResult, setQualityResult] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const t = getTranslation(currentLang);

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result;
      setImageBase64(dataUrl);
      const validation = await validateImageQuality(dataUrl);
      setQualityResult(validation);
    };
    reader.readAsDataURL(file);
  };

  // Quick sample leaf charger
  const loadSampleLeaf = async (scenario) => {
    setSelectedCrop(scenario.cropId);
    setImageBase64(scenario.imageUrl);
    const validation = await validateImageQuality(scenario.imageUrl);
    setQualityResult(validation);
  };

  // Camera stream starter
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access failed or permission denied: ' + err.message + '. You can use file upload or sample leaf presets below.');
      setIsCameraActive(false);
    }
  };

  // Camera snapshot capturer
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    stopCamera();
    setImageBase64(dataUrl);
    validateImageQuality(dataUrl).then(setQualityResult);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const clearImage = () => {
    setImageBase64(null);
    setQualityResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Crop Selector Grid */}
      <div className="glass-card border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
        <label className="block text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-base">{t.selectCropStep}</span>
          </span>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
            {t.eightCrops}
          </span>
        </label>

        <div className="grid grid-cols-2 xs:grid-cols-4 gap-2.5">
          {CROPS.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-3 rounded-xl text-left border transition relative flex items-center space-x-3 cursor-pointer ${
                  isSelected
                    ? `${crop.bgGradient} ${crop.borderColor} ring-2 ring-emerald-500/60 text-white font-bold shadow-lg shadow-emerald-950/40`
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span className="text-2xl">{crop.icon}</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold leading-tight">{t[crop.id] || crop.name}</div>
                  <div className="text-[10px] text-slate-400 truncate hidden sm:block">{t[crop.category] || crop.category}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Photo Upload & Camera Capture Zone */}
      <div className="glass-card border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        <label className="block text-sm font-bold text-slate-200 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-base">{t.photoCaptureStep}</span>
          </span>
          <span className="text-xs text-slate-400">{t.qualityValidated}</span>
        </label>

        {/* Live Camera View Modal */}
        {isCameraActive ? (
          <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-emerald-500/60 shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full h-72 sm:h-96 object-cover" />
            <div className="absolute inset-0 border-2 border-dashed border-emerald-400/40 pointer-events-none rounded-2xl m-4 flex items-center justify-center">
              <span className="text-xs text-emerald-300/80 bg-black/60 px-3 py-1 rounded-full">{t.alignLeafInsideBox}</span>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-4 px-4">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 bg-slate-800/80 text-slate-200 text-xs font-semibold rounded-xl backdrop-blur cursor-pointer"
              >
                {t.btnCancel}
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg flex items-center space-x-2 active:scale-95 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>{t.btnTakeSnapshot}</span>
              </button>
            </div>
          </div>
        ) : imageBase64 ? (
          /* Preview Mode with Quality Status & Actions */
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
              <img src={imageBase64} alt="Crop Leaf Preview" className="w-full h-64 sm:h-80 object-cover" />
              
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={clearImage}
                  className="p-2 bg-red-900/80 hover:bg-red-800 text-white rounded-xl backdrop-blur shadow-md transition cursor-pointer"
                  title="Remove Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Quality Indicator Badge overlay */}
              {qualityResult && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className={`p-3 rounded-xl backdrop-blur-md border flex items-center justify-between text-xs ${
                    qualityResult.isValid
                      ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-300'
                      : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {qualityResult.isValid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span>{qualityResult.reason}</span>
                    </div>
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-200 shrink-0 ml-2">
                      Score: {qualityResult.score}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 px-1">
              <span>{t.photoReady}</span>
              <button
                type="button"
                onClick={clearImage}
                className="text-emerald-400 hover:underline flex items-center space-x-1 font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.btnRemoveRetake}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Dropzone & Action Buttons */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center transition flex flex-col items-center justify-center space-y-4 ${
              dragOver
                ? 'border-emerald-400 bg-emerald-500/10'
                : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-inner">
              <Camera className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-200">
                {t.uploadInstructionTitle}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {t.uploadInstructionSub}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={startCamera}
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>{t.btnCamera}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-2 transition cursor-pointer"
              >
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>{t.btnBrowse}</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* 3. Sample Leaf Specimen Shortcuts */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-2.5">
            <TestTube2 className="w-4 h-4 text-amber-400" />
            <span>{t.sampleLeafTitle}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DEMO_SCENARIOS.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => loadSampleLeaf(demo)}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition flex items-center space-x-2.5 group cursor-pointer"
              >
                <img src={demo.imageUrl} alt={demo.title} className="w-8 h-8 rounded-lg object-cover border border-slate-800 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-slate-200 group-hover:text-amber-300 truncate">
                    {t[demo.cropId] || demo.cropId.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {translateDiseaseName(demo.mockDiagnosis.disease, currentLang)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. Run AI Analysis Action Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          disabled={!imageBase64 || isLoading}
          onClick={onAnalyze}
          className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base shadow-xl flex items-center justify-center space-x-3 transition active:scale-98 cursor-pointer ${
            !imageBase64 || isLoading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-950/60 ring-2 ring-emerald-400/30'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
              <span>{t.analyzing}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{t.btnRunAI}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
