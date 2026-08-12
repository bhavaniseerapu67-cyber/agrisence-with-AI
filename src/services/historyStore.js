// LocalStorage History Store for Farmer Advisories

const STORAGE_KEY = 'agrisense_advisory_history_v1';

export function getSavedAdvisories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initialSeed = getInitialSeedHistory();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeed));
      return initialSeed;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read advisory history:', err);
    return getInitialSeedHistory();
  }
}

export function saveAdvisory(advisory) {
  try {
    const current = getSavedAdvisories();
    const newItem = {
      id: advisory.id || `adv-${Date.now()}`,
      timestamp: advisory.timestamp || new Date().toISOString(),
      crop: advisory.crop || 'Tomato',
      cropId: advisory.cropId || 'tomato',
      disease: advisory.disease || 'Unknown',
      confidence: advisory.confidence || 85,
      severity: advisory.severity || 'Medium',
      location: advisory.location || 'Guntur, Andhra Pradesh',
      weather: advisory.weather || {},
      decision: advisory.decision || {},
      imageUrl: advisory.imageUrl || null,
      notes: advisory.notes || ''
    };
    
    // Add to top of list
    const updated = [newItem, ...current.filter(i => i.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save advisory:', err);
    return [];
  }
}

export function deleteAdvisory(id) {
  try {
    const current = getSavedAdvisories();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete advisory:', err);
    return [];
  }
}

export function clearAllAdvisories() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch {
    return [];
  }
}

export function searchAdvisories(query, cropFilter = 'all', statusFilter = 'all') {
  const all = getSavedAdvisories();
  return all.filter(item => {
    const matchesQuery = !query || 
      item.crop.toLowerCase().includes(query.toLowerCase()) ||
      item.disease.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase());
      
    const matchesCrop = cropFilter === 'all' || item.cropId === cropFilter;
    const matchesStatus = statusFilter === 'all' || item.decision?.status === statusFilter;

    return matchesQuery && matchesCrop && matchesStatus;
  });
}

function getInitialSeedHistory() {
  return [
    {
      id: 'seed-1',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      crop: 'Tomato',
      cropId: 'tomato',
      disease: 'Early Blight',
      confidence: 94,
      severity: 'High',
      location: 'Guntur, Andhra Pradesh',
      weather: { temp: 29, humidity: 82, rainProb: 85, windSpeed: 14, condition: 'Approaching Thunderstorms' },
      decision: {
        status: 'WAIT',
        actionWindow: 'Tomorrow 7:00 AM – 10:00 AM',
        headline: 'Postpone Action — Heavy Rain & Wind Expected',
        why: 'Heavy rain within 6 hours will wash off foliar sprays and high wind will cause spray drift.'
      },
      imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231a2e1a"/><circle cx="50" cy="50" r="30" fill="%2338a169"/><circle cx="40" cy="40" r="10" fill="%23744210"/></svg>'
    },
    {
      id: 'seed-2',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      crop: 'Rice',
      cropId: 'rice',
      disease: 'Rice Leaf Blast',
      confidence: 92,
      severity: 'Critical',
      location: 'Mandya, Karnataka',
      weather: { temp: 27, humidity: 68, rainProb: 5, windSpeed: 8, condition: 'Clear & Sunny' },
      decision: {
        status: 'ACT NOW',
        actionWindow: 'Today 4:00 PM – 6:30 PM',
        headline: 'Conditions Safe for Immediate Spraying',
        why: 'Dry weather window over next 48 hours ensures zero spray wash-off.'
      },
      imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231c1917"/><path d="M45,10 Q55,50 50,90 Z" fill="%23854d0e"/><circle cx="50" cy="40" r="6" fill="%23fef08a"/></svg>'
    }
  ];
}
