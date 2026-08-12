// Core Agronomic Decision Engine
// Synthesizes AI Diagnosis + Crop Info + Location + Weather Forecast + Agronomy Knowledge
// Determines: ACT NOW | WAIT | AVOID ACTION | INSUFFICIENT INFORMATION
// Calculates: Recommended Action Window + Rationale + Practical Steps + Weather Warnings

export function generateAgronomicDecision({ diagnosis, weather, cropId }) {
  if (!diagnosis || !weather) {
    return {
      status: 'INSUFFICIENT INFORMATION',
      statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      actionWindow: 'Retake Photo or Retry Location',
      headline: 'Insufficient Field Data',
      why: 'We need both a clear crop photo and location weather to generate a precision action recommendation.',
      riskFactors: [],
      steps: ['Retake a well-lit leaf photo', 'Check GPS or select your village location'],
      weatherWarnings: [],
      safetyDisclaimer: 'AI guidance is informational and should not replace qualified local agricultural advice.'
    };
  }

  // Low confidence handler
  if (diagnosis.lowConfidenceAlert || diagnosis.confidence < 60) {
    return {
      status: 'INSUFFICIENT INFORMATION',
      statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      actionWindow: 'Consult Agricultural Expert / Retake Image',
      headline: 'Low AI Confidence — Expert Review Recommended',
      why: `The AI vision system identified possible ${diagnosis.disease || 'crop issue'} with low confidence (${diagnosis.confidence}%).`,
      riskFactors: [
        { label: 'AI Image Confidence', value: `${diagnosis.confidence}%`, status: 'Low / Uncertain' }
      ],
      steps: [
        'Take a closer photo of single affected leaves in bright indirect natural light',
        'Avoid casting shadows or shaking camera during capture',
        'Show leaf specimen to your local Krishi Vigyan Kendra (KVK) or agricultural extension officer'
      ],
      weatherWarnings: ['Do not apply chemical treatment based on uncertain diagnosis.'],
      safetyDisclaimer: 'AI guidance is informational and should not replace qualified local agricultural advice.'
    };
  }

  const disease = diagnosis.disease || '';
  const isHealthy = diagnosis.severity === 'Healthy' || disease.toLowerCase().includes('healthy');
  
  // Weather parameters
  const rainProb = weather.rainProb || 0;
  const windSpeed = weather.windSpeed || 0;
  const humidity = weather.humidity || 0;
  const temp = weather.temp || 25;
  const forecast = weather.forecast || [];

  // 1. HEALTHY CROP CASE -> AVOID ACTION
  if (isHealthy) {
    return {
      status: 'AVOID ACTION',
      statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      badgeColor: 'emerald',
      actionWindow: 'No Action Required (Routine Monitoring)',
      headline: 'Crop is Healthy — Avoid Unnecessary Treatments',
      why: 'Your crop canopy displays vibrant health with zero visible pathogen infection or pest pressure. Avoid unnecessary pesticide applications to protect natural predatory insects and cut input costs.',
      riskFactors: [
        { label: 'Pathogen Risk', value: 'None Detected', status: 'Optimal' },
        { label: 'Weather Suitability', value: `${temp}°C / ${humidity}% RH`, status: 'Normal' }
      ],
      steps: [
        'Maintain regular irrigation and balanced nutrient dosing based on soil health card',
        'Inspect field margins twice weekly for early signs of sucking pests',
        'Keep field bunds weed-free to eliminate alternate weed hosts'
      ],
      weatherWarnings: rainProb > 70 ? ['Heavy rain anticipated; ensure field drainage channels are clear of debris.'] : [],
      safetyDisclaimer: 'AI guidance is informational and should not replace qualified local agricultural advice.'
    };
  }

  // 2. PATHOLOGY / DISEASE CASE -> EVALUATE WEATHER SUITABILITY MATRIX
  const agInfo = diagnosis.agronomyInfo || {};
  const maxWindAllowed = agInfo.weatherSafety?.maxWindSpeed || 12; // km/h
  const humidityThreshold = agInfo.weatherSafety?.humidityThreshold || 75; // %

  // Check upcoming weather timeline for dry spraying window
  // Look for next 24-48h window where rainProb < 30% and wind < 12 km/h
  let immediateRainRisk = rainProb >= 50;
  let immediateWindRisk = windSpeed >= maxWindAllowed;
  let extremeHeatRisk = temp >= 36;

  // Evaluate risk factors for UI gauges
  const riskFactors = [
    { 
      label: 'Rain Wash-off Risk', 
      value: `${rainProb}% Next 12h`, 
      status: rainProb > 60 ? 'HIGH WASH-OFF RISK' : rainProb > 30 ? 'Moderate' : 'Safe (<30%)',
      isHigh: rainProb > 50
    },
    { 
      label: 'Wind Spray Drift Risk', 
      value: `${windSpeed} km/h`, 
      status: windSpeed > maxWindAllowed ? 'HIGH DRIFT RISK' : 'Safe',
      isHigh: windSpeed > maxWindAllowed
    },
    { 
      label: 'Fungal Humidity Pressure', 
      value: `${humidity}% RH`, 
      status: humidity >= humidityThreshold ? 'Accelerating Spores' : 'Moderate',
      isHigh: humidity >= humidityThreshold
    },
    { 
      label: 'Heat Evaporation Risk', 
      value: `${temp}°C`, 
      status: temp >= 36 ? 'High Evaporation' : 'Normal',
      isHigh: temp >= 36
    }
  ];

  // Determine if immediate action is safe vs WAIT
  let decisionStatus = 'ACT NOW';
  let recommendedWindow = 'Today 4:00 PM – 6:30 PM (Cool & Low Wind)';
  let whyReason = '';

  if (immediateRainRisk || immediateWindRisk || extremeHeatRisk) {
    decisionStatus = 'WAIT';
    
    // Find optimal future window in forecast
    const clearSlot = forecast.find(f => f.rainProb < 25 && f.wind <= maxWindAllowed);
    if (clearSlot) {
      recommendedWindow = `${clearSlot.time} (Rain ${clearSlot.rainProb}%, Wind ${clearSlot.wind} km/h)`;
    } else {
      recommendedWindow = 'Tomorrow 7:00 AM – 10:00 AM (Cool Dry Morning Window)';
    }

    const reasons = [];
    if (immediateRainRisk) reasons.push(`High rain probability (${rainProb}%) will wash off foliar sprays before absorbing.`);
    if (immediateWindRisk) reasons.push(`High wind speed (${windSpeed} km/h) exceeds safe spraying threshold (${maxWindAllowed} km/h), causing spray drift.`);
    if (extremeHeatRisk) reasons.push(`Midday extreme temperature (${temp}°C) causes fast spray evaporation and leaf scorch.`);

    whyReason = `${disease} is present, BUT immediate spraying is unsafe: ${reasons.join(' ')} Wait for the recommended window when weather conditions stabilize.`;
  } else {
    // Conditions are good for ACT NOW
    decisionStatus = 'ACT NOW';
    recommendedWindow = 'Immediate / Within Next 12 Hours (Conditions Safe)';
    whyReason = `${disease} is at a ${diagnosis.severity} severity stage and field weather conditions are highly suitable: rain probability is low (${rainProb}%), wind is calm (${windSpeed} km/h), allowing maximum bio-fungicide/treatment absorption.`;
  }

  // Practical agronomic step-by-step actions
  const safeTreatmentList = agInfo.safeTreatment || [
    'Apply bio-control agents or recommended protective sprays',
    'Ensure proper nozzle calibration and underside leaf coverage'
  ];

  const preventionList = agInfo.prevention || [
    'Practice crop rotation and field sanitation',
    'Avoid excessive nitrogen fertilization'
  ];

  const steps = [
    `Recommended Action Window: ${recommendedWindow}`,
    ...safeTreatmentList.map(t => `Agronomic Step: ${t}`),
    `Prevention Practice: ${preventionList[0] || 'Maintain clean field bunds and crop sanitation'}`
  ];

  // Weather warning alerts
  const weatherWarnings = [];
  if (rainProb > 50) {
    weatherWarnings.push(`⚠️ Heavy Rain Alert: High rain probability (${rainProb}%) expected in field region. Ensure zero standing water near root zone.`);
  }
  if (windSpeed > 15) {
    weatherWarnings.push(`⚠️ Spray Drift Hazard: Wind speed of ${windSpeed} km/h will carry chemical drift to adjacent non-target crops or water sources.`);
  }
  if (humidity > 80) {
    weatherWarnings.push(`⚠️ High Humidity Alert: Humidity (${humidity}%) accelerates spore germination. Monitor canopy closely twice a day.`);
  }

  return {
    status: decisionStatus,
    statusColor: decisionStatus === 'ACT NOW' 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
      : 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    badgeColor: decisionStatus === 'ACT NOW' ? 'emerald' : 'amber',
    actionWindow: recommendedWindow,
    headline: decisionStatus === 'ACT NOW' ? 'Conditions Safe for Action' : 'Postpone Action — Weather Window Required',
    why: whyReason,
    riskFactors,
    steps,
    weatherWarnings,
    safetyDisclaimer: 'AI guidance is informational and should not replace qualified local agricultural advice.'
  };
}
