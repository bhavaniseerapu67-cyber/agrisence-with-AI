import React, { useState } from 'react';
import { getSavedAdvisories, deleteAdvisory, searchAdvisories } from '../services/historyStore';
import { CROPS } from '../data/cropsData';
import { getTranslation, translateDiseaseName } from '../data/translations';
import { Search, Trash2, Calendar, MapPin, ChevronRight, AlertCircle, Clock } from 'lucide-react';

export default function HistoryView({ onSelectAdvisory, currentLang = 'en' }) {
  const [advisories, setAdvisories] = useState(getSavedAdvisories());
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const t = getTranslation(currentLang);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this field advisory from history?')) {
      const updated = deleteAdvisory(id);
      setAdvisories(updated);
    }
  };

  const handleCropFilterChange = (cropId) => {
    setCropFilter(cropId);
    setAdvisories(searchAdvisories(searchQuery, cropId, statusFilter));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACT NOW':
        return { label: t.actNow, style: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
      case 'WAIT':
      case 'WAIT FOR A BETTER WINDOW':
        return { label: t.waitWindow, style: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      case 'AVOID ACTION':
      case 'AVOID ACTION RIGHT NOW':
        return { label: t.avoidAction, style: 'bg-blue-500/20 text-blue-400 border-blue-500/40' };
      default:
        return { label: t.insufficientInfo, style: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Search & Filter Header */}
      <div className="glass-card border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>{t.historyTitle}</span>
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            {advisories.length} {t.savedRecords}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setAdvisories(searchAdvisories(e.target.value, cropFilter, statusFilter));
            }}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">{t.cropSelectedLabel}:</span>
            <button
              type="button"
              onClick={() => handleCropFilterChange('all')}
              className={`px-3 py-1 rounded-lg font-bold border shrink-0 transition cursor-pointer ${
                cropFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              {t.allCrops}
            </button>
            {CROPS.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCropFilterChange(c.id)}
                className={`px-3 py-1 rounded-lg font-bold border shrink-0 transition cursor-pointer ${
                  cropFilter === c.id ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {c.icon} {t[c.id] || c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advisories List */}
      {advisories.length === 0 ? (
        <div className="glass-card border border-slate-800 rounded-3xl p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-300">{t.noRecords}</p>
          <p className="text-xs text-slate-500">{t.runDiagnosePrompt}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {advisories.map((item) => {
            const badge = getStatusBadge(item.decision?.status);
            return (
              <div
                key={item.id}
                onClick={() => onSelectAdvisory(item)}
                className="glass-card glass-card-hover border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-lg transition cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  {/* Thumbnail */}
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.disease} className="w-16 h-16 rounded-2xl object-cover border border-slate-800 shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shrink-0">
                      🌿
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400">{t[item.cropId] || item.crop}</span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-100 group-hover:text-emerald-300 transition">
                      {translateDiseaseName(item.disease, currentLang)}
                    </h3>

                    <div className="text-xs text-slate-400 mt-0.5 flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{item.location}</span>
                      </span>
                      <span>{t.confidenceLabel}: {item.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <span className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border ${badge.style}`}>
                    {badge.label}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-slate-800 transition cursor-pointer"
                      title={t.deleteRecord}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
