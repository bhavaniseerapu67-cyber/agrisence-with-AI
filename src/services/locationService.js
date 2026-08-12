// Location Service: Geolocation API + OSM Nominatim + Agricultural presets

export const DEFAULT_LOCATION = {
  name: 'Guntur, Andhra Pradesh',
  lat: 16.3067,
  lon: 80.4365,
  region: 'Southern Plains'
};

export const PRESET_FARMS = [
  { name: 'Guntur, Andhra Pradesh', lat: 16.3067, lon: 80.4365, crop: 'Chilli / Tomato' },
  { name: 'Anand, Gujarat', lat: 22.5645, lon: 72.9289, crop: 'Tobacco / Chilli' },
  { name: 'Mandya, Karnataka', lat: 12.5222, lon: 76.8974, crop: 'Rice / Sugarcane' },
  { name: 'Nashik, Maharashtra', lat: 19.9975, lon: 73.7898, crop: 'Tomato / Onion' },
  { name: 'Karnal, Haryana', lat: 29.6857, lon: 76.9905, crop: 'Wheat / Rice' },
  { name: 'Ludhiana, Punjab', lat: 30.9010, lon: 75.8573, crop: 'Wheat / Maize' },
  { name: 'Shimoga, Karnataka', lat: 13.9299, lon: 75.5681, crop: 'Rice / Arecanut' },
  { name: 'Fresno, California, USA', lat: 36.7468, lon: -119.7726, crop: 'Tomato / Cotton' }
];

export async function getCurrentGPSLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          // Reverse geocode via free OpenStreetMap Nominatim API
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
            headers: { 'User-Agent': 'AgriSenseAI-CropAnalyst/1.0' }
          });
          if (res.ok) {
            const data = await res.json();
            const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Current Location';
            const state = data.address?.state || data.address?.country || '';
            const locationName = state ? `${city}, ${state}` : city;
            resolve({ name: locationName, lat, lon });
          } else {
            resolve({ name: `${lat.toFixed(2)}° N, ${lon.toFixed(2)}° E`, lat, lon });
          }
        } catch {
          resolve({ name: `${lat.toFixed(2)}° N, ${lon.toFixed(2)}° E`, lat, lon });
        }
      },
      (err) => {
        reject(new Error(err.message || 'Unable to retrieve GPS coordinates.'));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  
  const matches = PRESET_FARMS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`, {
      headers: { 'User-Agent': 'AgriSenseAI-CropAnalyst/1.0' }
    });
    if (res.ok) {
      const data = await res.json();
      const osmMatches = data.map(item => ({
        name: item.display_name.split(',').slice(0, 2).join(','),
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      }));
      // Combine matches removing duplicates
      const all = [...matches, ...osmMatches];
      return all.filter((item, index, self) => index === self.findIndex(t => t.name === item.name));
    }
  } catch {
    // Fallback to presets matching query
  }
  return matches;
}
