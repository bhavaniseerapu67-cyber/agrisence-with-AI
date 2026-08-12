// Demo Scenarios for 1-Click Interactive Testing

// High quality SVG leaf visual representations for realistic preset testing
const SVG_TOMATO_EARLY_BLIGHT = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231a2e1a"/><path d="M200,40 Q280,100 290,200 Q260,320 200,360 Q140,320 110,200 Q120,100 200,40 Z" fill="%2338a169" stroke="%2322543d" stroke-width="4"/><line x1="200" y1="40" x2="200" y2="360" stroke="%231a4731" stroke-width="3"/><line x1="200" y1="120" x2="260" y2="90" stroke="%231a4731" stroke-width="2"/><line x1="200" y1="180" x2="130" y2="150" stroke="%231a4731" stroke-width="2"/><line x1="200" y1="240" x2="270" y2="210" stroke="%231a4731" stroke-width="2"/><circle cx="160" cy="170" r="28" fill="%23744210" stroke="%23ecc94b" stroke-width="3"/><circle cx="160" cy="170" r="18" fill="%23451a03"/><circle cx="160" cy="170" r="8" fill="%231c1917"/><circle cx="240" cy="230" r="35" fill="%23744210" stroke="%23ecc94b" stroke-width="4"/><circle cx="240" cy="230" r="22" fill="%23451a03"/><circle cx="240" cy="230" r="10" fill="%231c1917"/><circle cx="190" cy="280" r="20" fill="%23744210" stroke="%23ecc94b" stroke-width="2"/><text x="20" y="380" fill="%23a7f3d0" font-family="sans-serif" font-size="14" font-weight="bold">DEMO: Tomato Leaf (Early Blight concentric target spots)</text></svg>`;

const SVG_RICE_BLAST = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231c1917"/><path d="M180,20 Q220,100 210,380 Q180,380 170,100 Z" fill="%23854d0e" stroke="%23ca8a04" stroke-width="2"/><path d="M190,40 Q215,200 200,360" stroke="%23eab308" stroke-width="3" fill="none"/><path d="M175,120 Q190,140 205,120 Q190,100 175,120 Z" fill="%23fef08a" stroke="%23991b1b" stroke-width="3"/><path d="M170,220 Q190,250 210,220 Q190,190 170,220 Z" fill="%23fef08a" stroke="%23991b1b" stroke-width="4"/><path d="M178,300 Q190,320 202,300 Q190,285 178,300 Z" fill="%23fef08a" stroke="%23991b1b" stroke-width="2"/><text x="20" y="380" fill="%23fef08a" font-family="sans-serif" font-size="14" font-weight="bold">DEMO: Rice Blade (Spindle-shaped Leaf Blast lesions)</text></svg>`;

const SVG_CHILLI_LEAF_CURL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%230f172a"/><path d="M200,50 C290,90 270,190 260,280 C230,340 170,340 140,280 C130,190 110,90 200,50 Z" fill="%2315803d" stroke="%23166534" stroke-width="4"/><path d="M140,150 Q200,120 260,150 Q200,200 140,150 Z" fill="%2384cc16" opacity="0.6"/><path d="M150,230 Q200,200 250,230 Q200,270 150,230 Z" fill="%23a3e635" opacity="0.6"/><line x1="200" y1="50" x2="200" y2="330" stroke="%23fef08a" stroke-width="4"/><text x="20" y="380" fill="%2386efac" font-family="sans-serif" font-size="14" font-weight="bold">DEMO: Chilli Foliage (Upward Leaf Curl & Vein Thickening)</text></svg>`;

const SVG_HEALTHY_TOMATO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23064e3b"/><path d="M200,40 Q290,100 290,210 Q260,320 200,360 Q140,320 110,210 Q110,100 200,40 Z" fill="%2310b981" stroke="%23059669" stroke-width="4"/><line x1="200" y1="40" x2="200" y2="360" stroke="%23047857" stroke-width="4"/><line x1="200" y1="120" x2="260" y2="85" stroke="%23047857" stroke-width="3"/><line x1="200" y1="180" x2="135" y2="145" stroke="%23047857" stroke-width="3"/><line x1="200" y1="240" x2="265" y2="205" stroke="%23047857" stroke-width="3"/><circle cx="280" cy="270" r="45" fill="%23ef4444" stroke="%23b91c1c" stroke-width="4"/><path d="M280,220 L275,230 L285,230 Z" fill="%23047857"/><text x="20" y="380" fill="%23a7f3d0" font-family="sans-serif" font-size="14" font-weight="bold">DEMO: Healthy Tomato Leaf & Fruit (Zero Disease)</text></svg>`;

export const DEMO_SCENARIOS = [
  {
    id: 'demo-1',
    title: 'Tomato — Early Blight (Rain Coming)',
    subtitle: 'High fungal risk + upcoming rain requires precise action window',
    cropId: 'tomato',
    location: 'Guntur, Andhra Pradesh',
    lat: 16.3067,
    lon: 80.4365,
    imageUrl: SVG_TOMATO_EARLY_BLIGHT,
    mockWeather: {
      locationName: 'Guntur, Andhra Pradesh',
      temp: 29,
      humidity: 82,
      rainProb: 85, // Rain incoming!
      windSpeed: 14,
      condition: 'Approaching Thunderstorms & Moderate Rain',
      forecast: [
        { time: 'Next 3h', temp: 28, rainProb: 85, wind: 16 },
        { time: 'Next 6h', temp: 26, rainProb: 90, wind: 18 },
        { time: 'Tomorrow AM', temp: 25, rainProb: 15, wind: 7 }, // Clear window tomorrow AM!
        { time: 'Tomorrow PM', temp: 31, rainProb: 10, wind: 9 }
      ]
    },
    mockDiagnosis: {
      disease: 'Early Blight',
      crop: 'Tomato',
      confidence: 94,
      severity: 'High',
      symptoms: [
        'Concentric brown ring "target spots" on lower leaf canopy',
        'Chlorotic yellow halos surrounding necrotic lesions',
        'Early defoliation at plant base'
      ],
      alternativeCauses: ['Late Blight', 'Septoria Leaf Spot']
    },
    expectedDecision: 'WAIT', // Rain incoming next 6h -> WAIT for tomorrow AM clear window!
    actionWindow: 'Tomorrow 7:00 AM – 10:00 AM',
    reasoning: 'Heavy rain (85-90% probability) within the next 6 hours will wash off foliar bio-fungicide sprays. High wind speed (16-18 km/h) today will cause spray drift. Wait for the optimal dry window tomorrow morning (7-10 AM) when rain probability drops to 15% and wind calms to 7 km/h.'
  },
  {
    id: 'demo-2',
    title: 'Rice — Leaf Blast (Dry Weather)',
    subtitle: 'Fungal leaf blast detected with clear 48-hour dry weather window',
    cropId: 'rice',
    location: 'Mandya, Karnataka',
    lat: 12.5222,
    lon: 76.8974,
    imageUrl: SVG_RICE_BLAST,
    mockWeather: {
      locationName: 'Mandya, Karnataka',
      temp: 27,
      humidity: 68,
      rainProb: 5, // Dry weather!
      windSpeed: 8,
      condition: 'Clear & Sunny',
      forecast: [
        { time: 'Today PM', temp: 28, rainProb: 5, wind: 8 },
        { time: 'Tomorrow AM', temp: 22, rainProb: 10, wind: 6 },
        { time: 'Tomorrow PM', temp: 29, rainProb: 10, wind: 7 },
        { time: 'Day After', temp: 30, rainProb: 15, wind: 8 }
      ]
    },
    mockDiagnosis: {
      disease: 'Rice Leaf Blast',
      crop: 'Rice',
      confidence: 92,
      severity: 'Critical',
      symptoms: [
        'Spindle-shaped grayish-white central lesions with reddish margins',
        'Leaf tip collapse and lesion coalescence',
        'Incipient neck lesion yellowing'
      ],
      alternativeCauses: ['Brown Spot', 'Bacterial Leaf Streak']
    },
    expectedDecision: 'ACT NOW',
    actionWindow: 'Today 4:00 PM – 6:30 PM (or Tomorrow 6:30 AM – 9:30 AM)',
    reasoning: 'Leaf blast is in a critical stage. Weather conditions over the next 48 hours are optimal: 0-10% rain risk ensures zero spray wash-off, low wind speed (< 8 km/h) prevents drift, and moderate temperatures will allow protective bio-fungicide absorption.'
  },
  {
    id: 'demo-3',
    title: 'Chilli — Leaf Curl (High Humidity)',
    subtitle: 'Viral infection with vector thrips; high morning humidity',
    cropId: 'chilli',
    location: 'Anand, Gujarat',
    lat: 22.5645,
    lon: 72.9289,
    imageUrl: SVG_CHILLI_LEAF_CURL,
    mockWeather: {
      locationName: 'Anand, Gujarat',
      temp: 33,
      humidity: 89, // High humidity
      rainProb: 35,
      windSpeed: 19, // High wind!
      condition: 'Partly Cloudy & Very Humid',
      forecast: [
        { time: 'Today PM', temp: 34, rainProb: 40, wind: 21 },
        { time: 'Tomorrow AM', temp: 26, rainProb: 20, wind: 10 },
        { time: 'Tomorrow PM', temp: 32, rainProb: 15, wind: 9 }
      ]
    },
    mockDiagnosis: {
      disease: 'Chilli Leaf Curl Virus',
      crop: 'Chilli',
      confidence: 89,
      severity: 'High',
      symptoms: [
        'Severe upward leaf cupping and boat-like leaf shape',
        'Vein thickening and stunted leaf laminae',
        'Shortened stem internodes'
      ],
      alternativeCauses: ['Thrips Infestation', 'Mite Damage']
    },
    expectedDecision: 'WAIT',
    actionWindow: 'Tomorrow 7:00 AM – 10:00 AM',
    reasoning: 'Current high wind speed (19-21 km/h) creates high spray drift risk. Wait until tomorrow morning when wind speed calms to 10 km/h and relative humidity stabilizes. Apply neem oil bio-spray to target vector thrips and whiteflies.'
  },
  {
    id: 'demo-4',
    title: 'Tomato — Healthy Crop',
    subtitle: 'Vibrant green canopy with normal growth and no symptoms',
    cropId: 'tomato',
    location: 'Nashik, Maharashtra',
    lat: 19.9975,
    lon: 73.7898,
    imageUrl: SVG_HEALTHY_TOMATO,
    mockWeather: {
      locationName: 'Nashik, Maharashtra',
      temp: 26,
      humidity: 62,
      rainProb: 10,
      windSpeed: 9,
      condition: 'Pleasant & Sunlit',
      forecast: [
        { time: 'Today PM', temp: 27, rainProb: 10, wind: 9 },
        { time: 'Tomorrow AM', temp: 20, rainProb: 5, wind: 7 }
      ]
    },
    mockDiagnosis: {
      disease: 'Healthy Crop (No Disease Detected)',
      crop: 'Tomato',
      confidence: 97,
      severity: 'Healthy',
      symptoms: [
        'Uniform green foliage with clear leaf margins',
        'Sturdy stems and normal node elongation',
        'Zero lesions, spots, or feeding damage'
      ],
      alternativeCauses: []
    },
    expectedDecision: 'AVOID ACTION',
    actionWindow: 'No Spray Needed (Routine Monitoring)',
    reasoning: 'Your crop canopy is clean and healthy! No corrective pest or disease spray is required. Avoid prophylactic chemical spraying to preserve natural beneficial predatory insects and minimize unnecessary farming expenditure.'
  }
];
