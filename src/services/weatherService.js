// Weather Service: Open-Meteo Live API Integration + Fallback Mock Weather Provider

const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm'
};

export async function fetchLiveWeather(lat, lon, locationName = 'Selected Field') {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather service response error');
    
    const data = await response.json();
    
    const current = data.current || {};
    const hourly = data.hourly || {};
    const daily = data.daily || {};
    
    // Find next 12 hours from current index
    const nowIdx = 0;
    const next12HoursRainProb = hourly.precipitation_probability ? 
      Math.max(...hourly.precipitation_probability.slice(nowIdx, nowIdx + 12)) : (current.precipitation > 0 ? 80 : 10);
      
    const currentWindSpeed = current.wind_speed_10m || 10;
    const currentHumidity = current.relative_humidity_2m || 65;
    const currentTemp = Math.round(current.temperature_2m || 28);
    const weatherCode = current.weather_code || 0;
    const conditionDesc = WEATHER_CODES[weatherCode] || 'Partly cloudy';
    
    // Build hourly forecast timeline
    const hourlyForecast = [];
    if (hourly.time && hourly.time.length > 0) {
      for (let i = 0; i < 24; i += 3) {
        const timeStr = new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        hourlyForecast.push({
          time: i === 0 ? 'Now' : timeStr,
          temp: Math.round(hourly.temperature_2m[i]),
          humidity: hourly.relative_humidity_2m[i],
          rainProb: hourly.precipitation_probability[i] || 0,
          wind: Math.round(hourly.wind_speed_10m[i]),
          precipMm: hourly.precipitation[i] || 0
        });
      }
    }
    
    // Build 5-day daily forecast
    const dailyForecast = [];
    if (daily.time && daily.time.length > 0) {
      for (let i = 0; i < Math.min(5, daily.time.length); i++) {
        const dateObj = new Date(daily.time[i]);
        const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
        dailyForecast.push({
          day: dayLabel,
          tempMax: Math.round(daily.temperature_2m_max[i]),
          tempMin: Math.round(daily.temperature_2m_min[i]),
          rainProbMax: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 20,
          precipSum: daily.precipitation_sum ? daily.precipitation_sum[i] : 0
        });
      }
    }
    
    return {
      isLive: true,
      locationName,
      lat,
      lon,
      temp: currentTemp,
      humidity: currentHumidity,
      rainProb: next12HoursRainProb,
      precipMm: current.precipitation || 0,
      windSpeed: Math.round(currentWindSpeed),
      condition: conditionDesc,
      forecast: hourlyForecast,
      dailyForecast
    };
  } catch (err) {
    console.warn('Live weather API unavailable, utilizing fallback weather engine:', err);
    return getFallbackWeather(locationName, lat, lon);
  }
}

export function getFallbackWeather(locationName = 'Selected Field', lat = 16.3, lon = 80.4) {
  return {
    isLive: false,
    locationName,
    lat,
    lon,
    temp: 28,
    humidity: 72,
    rainProb: 25,
    precipMm: 0.2,
    windSpeed: 9,
    condition: 'Partly Cloudy & Warm',
    forecast: [
      { time: 'Now', temp: 28, humidity: 72, rainProb: 25, wind: 9, precipMm: 0 },
      { time: 'Next 3h', temp: 30, humidity: 65, rainProb: 20, wind: 11, precipMm: 0 },
      { time: 'Next 6h', temp: 29, humidity: 70, rainProb: 30, wind: 10, precipMm: 0.1 },
      { time: 'Tomorrow AM', temp: 22, humidity: 80, rainProb: 10, wind: 6, precipMm: 0 },
      { time: 'Tomorrow PM', temp: 31, humidity: 60, rainProb: 15, wind: 8, precipMm: 0 }
    ],
    dailyForecast: [
      { day: 'Today', tempMax: 31, tempMin: 22, rainProbMax: 30, precipSum: 0.5 },
      { day: 'Tomorrow', tempMax: 32, tempMin: 21, rainProbMax: 15, precipSum: 0 },
      { day: 'Day 3', tempMax: 33, tempMin: 23, rainProbMax: 45, precipSum: 4.2 },
      { day: 'Day 4', tempMax: 29, tempMin: 20, rainProbMax: 70, precipSum: 12.0 },
      { day: 'Day 5', tempMax: 30, tempMin: 21, rainProbMax: 20, precipSum: 0.1 }
    ]
  };
}
