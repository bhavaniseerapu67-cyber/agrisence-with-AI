// Comprehensive Multilingual Translation System for AgriSense AI
// Supports English (en), Telugu (te), and Hindi (hi)

export const LANGUAGES = [
  { code: 'en', name: 'English', label: 'English', flag: '🇬🇧', speechLang: 'en-IN' },
  { code: 'te', name: 'Telugu', label: 'తెలుగు', flag: '🇮🇳', speechLang: 'te-IN' },
  { code: 'hi', name: 'Hindi', label: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' }
];

export const TRANSLATIONS = {
  en: {
    // Navigation & Branding
    navHome: 'Home',
    navDiagnose: 'Diagnose',
    navWeather: 'Weather',
    navAdvisory: 'Advisory',
    navHistory: 'History',
    navFarm: 'Farm Profile',
    demoMode: 'Demo Mode',
    climateIntel: 'Climate Intelligence',
    tagline: 'From Field Signals to Smarter Action',
    systemStatus: 'System Status: Fully Operational',

    // Home Page
    heroTitlePrefix: 'Turn Raw Field Signals Into ',
    heroTitleSuffix: 'Smarter Agronomic Action.',
    heroSubtitle: 'Upload a crop leaf photo. AgriSense AI identifies crop diseases, analyzes live field weather forecasts, and tells you what to do and when weather conditions make it safest to act.',
    btnDiagnose: 'Diagnose Crop & Action Window',
    btnDemo: 'Try 1-Click Demo Scenarios',
    aiVisionPathology: 'AI Pathology Vision',
    aiVisionPathologyDesc: 'Detects disease, pests, deficiencies',
    liveWeatherMetrics: 'Live Weather Metrics',
    liveWeatherMetricsDesc: 'Rain risk, wind drift, humidity',
    actionWindowEngine: 'Action Window Engine',
    actionWindowEngineDesc: 'Exact timing (e.g. Tomorrow 7–10 AM)',
    latestAdvisoryTitle: 'Latest Field Advisory & Action Window',
    viewFullReport: 'View Full Report →',
    analyzedCrop: 'Analyzed Crop',
    agronomicDecision: 'Agronomic Decision',
    openFullAdvisory: 'Open Full Advisory',
    liveWeatherDashboard: 'Live Field Weather Dashboard',
    fiveDayForecastLink: '5-Day Forecast →',
    supportedCrops: 'Supported Target Crops',
    eightCrops: '8 Supported Crops',

    // Crop Names & Categories
    tomato: 'Tomato',
    rice: 'Rice',
    wheat: 'Wheat',
    cotton: 'Cotton',
    maize: 'Maize',
    chilli: 'Chilli',
    potato: 'Potato',
    groundnut: 'Groundnut',
    vegetable: 'Vegetable',
    cerealGrain: 'Cereal Grain',
    cashCrop: 'Cash Crop',
    spice: 'Spice / Vegetable',
    tuber: 'Tuber',
    oilseed: 'Oilseed / Legume',

    // Diagnose Page
    selectCropStep: '1. Select Target Crop',
    cropSelectedLabel: 'Selected Crop',
    photoCaptureStep: '2. Capture or Upload Leaf Photo',
    qualityValidated: 'Quality Auto-Validated',
    btnCamera: 'Open Live Camera',
    btnBrowse: 'Browse Local Files',
    alignLeafInsideBox: 'Align leaf specimen in frame',
    btnTakeSnapshot: 'Take Snapshot',
    btnCancel: 'Cancel',
    photoReady: 'Leaf image validated for AI analysis',
    btnRemoveRetake: 'Remove & Retake',
    uploadInstructionTitle: 'Upload or Capture Affected Leaf Photo',
    uploadInstructionSub: 'Supported formats: JPG, PNG, WEBP. Close-up shots of lesions/leaves yield maximum AI accuracy.',
    sampleLeafTitle: 'Or Quick Load Sample Leaf Specimen for Testing:',
    btnRunAI: 'Run AI Pathology & Decision Engine',
    analyzing: 'Analyzing Leaf Pathology & Weather Forecast...',

    // Location & Weather
    fieldLocation: 'Farm Field Location',
    gpsActive: 'GPS & Weather Active',
    btnUseGPS: 'Use Auto GPS',
    locating: 'Locating...',
    searchPlaceholder: 'Search village, city, district or speak location...',
    micListening: 'Listening to your voice...',
    quickRegions: 'Quick Select Agronomic Hubs:',
    fieldTemp: 'Field Temp',
    rainRisk: 'Rain Risk',
    windSpeed: 'Wind Speed',
    humidity: 'Humidity',
    precipitation: 'Precipitation',
    sprayingCondition: 'Foliar Spraying Condition:',
    safeForSpraying: '✓ SAFE FOR SPRAYING',
    postponeSpraying: '⚠ POSTPONE SPRAYING (Rain/Wind Risk)',
    fiveDayForecast: '5-Day Field Weather Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    next3h: 'Next 3h',
    next6h: 'Next 6h',
    tomorrowAM: 'Tomorrow AM',
    tomorrowPM: 'Tomorrow PM',

    // Decision Engine Statuses & Risk Matrix
    actNow: '🟢 ACT NOW',
    waitWindow: '🟡 WAIT FOR A BETTER WINDOW',
    avoidAction: '🔴 AVOID ACTION RIGHT NOW',
    insufficientInfo: '🟠 INSUFFICIENT INFORMATION',

    coreDifferentiator: 'Core Differentiator',
    precisionWeatherEngine: 'Precision Weather-Aware Decision Engine',
    actionWindowLabel: 'Recommended Action Window',
    whyTitle: 'Why This Timing Is Recommended',
    riskMatrixTitle: 'Weather & Field Spraying Risk Matrix',
    weatherWarningsTitle: 'Weather Related Warning Alerts',
    rainWashoffRisk: 'Rain Wash-off Risk',
    windDriftRisk: 'Wind Spray Drift Risk',
    humidityPressure: 'Fungal Humidity Pressure',
    heatEvaporationRisk: 'Heat Evaporation Risk',
    safe: 'Safe',
    highDriftRisk: 'HIGH DRIFT RISK',
    acceleratingSpores: 'Accelerating Spores',
    highEvaporation: 'High Evaporation',
    moderate: 'Moderate',

    // AI Pathology Diagnosis Card
    aiPathologyTitle: 'AI Crop Pathology Diagnosis',
    targetCropLabel: 'Target Crop:',
    engineLabel: 'Engine:',
    confidenceLabel: 'Confidence',
    severityLabel: 'Severity',
    symptomsTitle: 'Identified Visible Symptoms',
    alternativeCausesTitle: 'Alternative Differential Diagnoses:',
    lowConfidenceAlertTitle: 'Low Confidence Detection Alert',
    lowConfidenceAlertSub: 'The vision model returned a lower confidence score. We strongly recommend:',
    lowConfidenceStep1: 'Take a closer photo of single affected leaves in bright natural light.',
    lowConfidenceStep2: 'Consult your nearest Krishi Vigyan Kendra (KVK) or extension officer before spraying.',

    // Severity Levels
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    healthy: 'Healthy',

    // Advisory Page (3 Questions)
    advisoryReportTitle: 'Complete Agronomic Guidance Report',
    q1Title: '1. What is wrong?',
    q2Title: '2. What should I do?',
    q3Title: '3. When should I act?',
    recommendedActionLabel: 'Recommended Action Protocol:',
    weatherRationaleLabel: 'Weather Window Rationale:',
    practicalStepsTitle: 'Practical Step-by-Step Agronomic Protocol',
    preventiveTitle: 'Preventive & Cultural Agronomy Guidelines',
    disclaimerTitle: 'Pesticide Safety & Advisory Disclaimer',
    btnSaveAdvisory: 'Save Advisory',
    btnSaved: 'Saved to History',
    btnPrint: 'Print Report',

    // Voice Features
    voiceAdvisoryTitle: 'Farmer Voice Advisory',
    btnListen: '🔊 Listen to Advisory',
    btnSpeaking: 'Speaking Advisory...',
    btnStopVoice: '⏹️ Stop Audio',
    readingAloud: 'Reading Advisory Aloud...',
    voiceNotSupported: 'Speech features are not supported by this browser. Text guidance is displayed above.',
    voiceSelectLang: 'Select Voice Language:',
    micPermissionDenied: 'Microphone permission denied. Please allow microphone access in browser settings.',

    // History Page
    historyTitle: 'Advisory Field History',
    savedRecords: 'saved records',
    allCrops: 'All Crops',
    noRecords: 'No field advisories found matching criteria.',
    runDiagnosePrompt: 'Run a crop leaf diagnosis to create new field advisories.',
    deleteRecord: 'Delete Record',

    // Farm Profile & Settings
    farmProfileTitle: 'My Farm Profile',
    activeRegionLabel: 'Active Region:',
    apiConfigTitle: 'AI Vision Engine API Configuration',
    customKeyActive: 'Custom Key Active',
    defaultKeyActive: 'Default / Fallback Engine Active',
    apiConfigDesc: 'AgriSense AI includes a built-in intelligent vision classifier so it works 100% offline out-of-the-box. To enable live multimodal Gemini 1.5 Flash Vision AI analysis, enter your Google Gemini API key below:',
    btnSaveKey: 'Save Key',
    keySaved: 'Key Saved!',
    agronomyLibraryTitle: 'Agronomic Knowledge Base Reference',
    pathogenLabel: 'Pathogen:',
    noDiseasesListed: 'No specific diseases listed for this crop in library.',

    // Demo Modal
    demoModalTitle: 'AgriSense Demo Mode',
    demoModalSub: '1-Click Working Agronomic Scenarios',
    demoNote: 'Selecting a scenario loads crop photos, live/mock weather, AI pathology, and the Decision Engine action window.',

    // Common Text
    noneDetected: 'None Detected',
    normal: 'Normal',
    optimal: 'Optimal'
  },

  te: {
    // Navigation & Branding
    navHome: 'హోమ్',
    navDiagnose: 'పంట వ్యాధి నిర్ధారణ',
    navWeather: 'వాతావరణం',
    navAdvisory: 'సలహా నివేదిక',
    navHistory: 'చరిత్ర',
    navFarm: 'నా పొలం వివరాలు',
    demoMode: 'డెమో విధానం',
    climateIntel: 'వాతావరణ సమాచారం',
    tagline: 'పొలం సంకేతాల నుండి స్పష్టమైన వ్యవసాయ చర్యలకు',
    systemStatus: 'వ్యవస్థ పరిస్థితి: పూర్తి అందుబాటులో ఉంది',

    // Home Page
    heroTitlePrefix: 'మీ పొలం సంకేతాలను ',
    heroTitleSuffix: 'స్మార్ట్ వ్యవసాయ చర్యలుగా మార్చండి.',
    heroSubtitle: 'మీ పంట ఆకు ఫోటో తీయండి. అగ్రిసెన్స్ AI పంట తెగుళ్లను గుర్తించి, ప్రత్యక్ష వాతావరణాన్ని పరిశీలించి ఏ మందు ఎప్పుడు చల్లాలి అనేది స్పష్టంగా చెబుతుంది.',
    btnDiagnose: 'పంట వ్యాధి నిర్ధారణ మరియు సమయం',
    btnDemo: '1-క్లిక్ డెమో ఉదాహరణలు చూడండి',
    aiVisionPathology: 'AI పంట తెగుళ్ల నిర్ధారణ',
    aiVisionPathologyDesc: 'తెగుళ్లు, పురుగులు, పోషకాల లోపాలను గుర్తిస్తుంది',
    liveWeatherMetrics: 'ప్రత్యక్ష వాతావరణం',
    liveWeatherMetricsDesc: 'వర్షపాతం, గాలి వేగం, తేమ శాతం',
    actionWindowEngine: 'ఉత్తమ సమయ నిర్ణయం',
    actionWindowEngineDesc: 'మందు చల్లడానికి సరైన సమయం (ఉదా: రేపు ఉదయం 7–10)',
    latestAdvisoryTitle: 'తాజా పంట సలహా & ఉత్తమ సమయం',
    viewFullReport: 'పూర్తి నివేదిక చూడండి →',
    analyzedCrop: 'పరిశీలించిన పంట',
    agronomicDecision: 'వ్యవసాయ నిర్ణయం',
    openFullAdvisory: 'పూర్తి సలహా తెరవండి',
    liveWeatherDashboard: 'ప్రత్యక్ష పొలం వాతావరణం',
    fiveDayForecastLink: '5 రోజుల అంచనా →',
    supportedCrops: 'అందుబాటులో ఉన్న పంటలు',
    eightCrops: '8 రకాల పంటలు',

    // Crop Names & Categories
    tomato: 'టమోటా',
    rice: 'వరి (వరి ధాన్యం)',
    wheat: 'గోధుమ',
    cotton: 'ప్రత్తి',
    maize: 'జొన్న / మొక్కజొన్న',
    chilli: 'మిరప',
    potato: 'బంగాళాదుంప',
    groundnut: 'వేరుశనగ',
    vegetable: 'కూరగాయ',
    cerealGrain: 'ధాన్యపు పంట',
    cashCrop: 'వాణిజ్య పంట',
    spice: 'మసాలా / కూరగాయ',
    tuber: 'దుంప పంట',
    oilseed: 'నూనె గింజలు',

    // Diagnose Page
    selectCropStep: '1. మీ పంటను ఎంచుకోండి',
    cropSelectedLabel: 'ఎంచుకున్న పంట',
    photoCaptureStep: '2. ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి',
    qualityValidated: 'నాణ్యత పరిశీలించబడింది',
    btnCamera: 'లైవ్ కెమెరా తెరవండి',
    btnBrowse: 'గ్యాలరీ నుండి ఎంచుకోండి',
    alignLeafInsideBox: 'ఆకును బాక్స్‌లో సరిగ్గా ఉంచండి',
    btnTakeSnapshot: 'ఫోటో తీయండి',
    btnCancel: 'రద్దు చేయండి',
    photoReady: 'ఆకు ఫోటో పరిశీలనకు సిద్ధంగా ఉంది',
    btnRemoveRetake: 'తొలగించి మళ్లీ తీయండి',
    uploadInstructionTitle: 'ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి',
    uploadInstructionSub: 'JPG, PNG, WEBP అనుకూలం. తెగులు మచ్చలు స్పష్టంగా కనిపించేలా దగ్గరగా ఫోటో తీయండి.',
    sampleLeafTitle: 'లేదా పరీక్ష కోసం నమూనా ఆకును ఎంచుకోండి:',
    btnRunAI: 'AI తెగులు పరీక్ష చేయండి',
    analyzing: 'ఆకు తెగుళ్లు మరియు వాతావరణం విశ్లేషిస్తోంది...',

    // Location & Weather
    fieldLocation: 'పొలం ఉన్న ప్రదేశం',
    gpsActive: 'GPS & వాతావరణం సిద్ధంగా ఉంది',
    btnUseGPS: 'ఆటో GPS ఉపయోగించండి',
    locating: 'ప్రదేశం గుర్తిస్తోంది...',
    searchPlaceholder: 'గ్రామం లేదా నగరం పేరు వెతకండి లేదా మాట్లాడండి...',
    micListening: 'మీ మాటలు వింటోంది...',
    quickRegions: 'ముఖ్య వ్యవసాయ ప్రాంతాలు:',
    fieldTemp: 'పొలం ఉష్ణోగ్రత',
    rainRisk: 'వర్షం అవకాశం',
    windSpeed: 'గాలి వేగం',
    humidity: 'తేమ శాతం',
    precipitation: 'వర్షపాతం',
    sprayingCondition: 'మందు చల్లే వాతావరణ పరిస్థితి:',
    safeForSpraying: '✓ మందు చల్లుటకు అనుకూలం',
    postponeSpraying: '⚠ మందు చల్లడం వాయిదా వేయండి (వర్షం/గాలి ప్రమాదం)',
    fiveDayForecast: '5 రోజుల వాతావరణ అంచనా',
    today: 'ఈ రోజు',
    tomorrow: 'రేపు',
    next3h: 'తదుపరి 3 గంటలు',
    next6h: 'తదుపరి 6 గంటలు',
    tomorrowAM: 'రేపు ఉదయం',
    tomorrowPM: 'రేపు సాయంత్రం',

    // Decision Engine Statuses & Risk Matrix
    actNow: '🟢 వెంటనే చర్య తీసుకోండి',
    waitWindow: '🟡 మెరుగైన వాతావరణం కోసం వేచి ఉండండి',
    avoidAction: '🔴 ఇప్పుడు ఏ మందు చల్లకండి',
    insufficientInfo: '🟠 అదనపు సమాచారం అవసరం',

    coreDifferentiator: 'ముఖ్యమైన ప్రత్యేకత',
    precisionWeatherEngine: 'వాతావరణ అధారిత సలహా వ్యవస్థ',
    actionWindowLabel: 'సిఫార్సు చేసిన ఉత్తమ సమయం',
    whyTitle: 'ఈ సమయం ఎందుకు సిఫార్సు చేయబడింది',
    riskMatrixTitle: 'వాతావరణం & మందు చల్లే ప్రమాద విశ్లేషణ',
    weatherWarningsTitle: 'వాతావరణ హెచ్చరికలు',
    rainWashoffRisk: 'వర్షం వల్ల మందు కొట్టుకుపోయే ప్రమాదం',
    windDriftRisk: 'గాలి వల్ల మందు పక్కకు కొట్టుకుపోయే ప్రమాదం',
    humidityPressure: 'తేమ వల్ల తెగులు వ్యాప్తి',
    heatEvaporationRisk: 'ఎండ వల్ల మందు ఆవిరయ్యే ప్రమాదం',
    safe: 'సురక్షితం',
    highDriftRisk: 'గాలి వేగం ఎక్కువ',
    acceleratingSpores: 'తేమ ఎక్కువ',
    highEvaporation: 'ఎండ ఎక్కువ',
    moderate: 'మధ్యస్థం',

    // AI Pathology Diagnosis Card
    aiPathologyTitle: 'AI పంట తెగుళ్ల నిర్ధారణ నివేదిక',
    targetCropLabel: 'పరిశీలించిన పంట:',
    engineLabel: 'సాంకేతికత:',
    confidenceLabel: 'కచ్చితత్వం',
    severityLabel: 'తీవ్రత',
    symptomsTitle: 'కనిపిస్తున్న తెగులు లక్షణాలు',
    alternativeCausesTitle: 'ఇతర సాధ్యమయ్యే కారణాలు:',
    lowConfidenceAlertTitle: 'తక్కువ కచ్చితత్వ హెచ్చరిక',
    lowConfidenceAlertSub: 'ఈ ఫోటో కచ్చితత్వం తక్కువగా ఉంది. మేము సూచించేది:',
    lowConfidenceStep1: 'మంచి వెలుతురులో ఆకును దగ్గరగా మళ్లీ ఫోటో తీయండి.',
    lowConfidenceStep2: 'మందు కొట్టే ముందు దగ్గరలోని వ్యవసాయ అధికారిని సంప్రదించండి.',

    // Severity Levels
    critical: 'అతి తీవ్రం',
    high: 'తీవ్రం',
    medium: 'మధ్యస్థం',
    healthy: 'ఆరోగ్యకరం',

    // Advisory Page (3 Questions)
    advisoryReportTitle: 'పూర్తి వ్యవసాయ నివారణ సలహా నివేదిక',
    q1Title: '1. పంటకు ఏమి జరిగింది?',
    q2Title: '2. రైతు ఏమి చేయాలి?',
    q3Title: '3. ఎప్పుడు మందు చల్లాలి?',
    recommendedActionLabel: 'సిఫార్సు చేసిన నివారణ చర్యలు:',
    weatherRationaleLabel: 'వాతావరణ కారణం:',
    practicalStepsTitle: 'దశలవారీగా చేయవలసిన పనులు',
    preventiveTitle: 'ముందస్తు జాగ్రత్తలు మరియు నిర్వహణ',
    disclaimerTitle: 'కీటకనాశిని భద్రత & బాధ్యతారాహిత్య ప్రకటన',
    btnSaveAdvisory: 'సలహాను సేవ్ చేయండి',
    btnSaved: 'సేవ్ చేయబడింది',
    btnPrint: 'నివేదిక ప్రింట్ చేయండి',

    // Voice Features
    voiceAdvisoryTitle: 'రైతు వాయిస్ సలహా',
    btnListen: '🔊 వాయిస్ సలహా వినండి (తెలుగు)',
    btnSpeaking: 'సలహా వినిపిస్తోంది...',
    btnStopVoice: '⏹️ ఆపివేయండి (Stop)',
    readingAloud: 'సలహాను గొంతుతో చదువుతోంది...',
    voiceNotSupported: 'మీ బ్రౌజర్‌లో వాయిస్ సదుపాయం లేదు. పైన ఉన్న వచనాన్ని చదవగలరు.',
    voiceSelectLang: 'వాయిస్ భాష ఎంచుకోండి:',
    micPermissionDenied: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది.',

    // History Page
    historyTitle: 'గత పంట సలహాల చరిత్ర',
    savedRecords: 'దాచిన నివేదికలు',
    allCrops: 'అన్ని పంటలు',
    noRecords: 'ఎటువంటి పాత సలహాలు లేవు.',
    runDiagnosePrompt: 'కొత్త సలహా కోసం పంట పరీక్ష చేయండి.',
    deleteRecord: 'తొలగించండి',

    // Farm Profile & Settings
    farmProfileTitle: 'నా పొలం వివరాలు',
    activeRegionLabel: 'ప్రస్తుత ప్రాంతం:',
    apiConfigTitle: 'AI విజన్ ఇంజిన్ సెట్టింగులు',
    customKeyActive: 'సొంత కీ సక్రియం',
    defaultKeyActive: 'సాధారణ ఇంజిన్ సక్రియం',
    apiConfigDesc: 'అగ్రిసెన్స్ AI లో సొంతంగా తెగుళ్లను గుర్తించే ఇంజిన్ ఉంది. పూర్తి లైవ్ గూగుల్ జెమిని API ని ఉపయోగించాలనుకుంటే మీ API కీ ఇక్కడ నమోదు చేయండి:',
    btnSaveKey: 'కీని భద్రపరచండి',
    keySaved: 'కీ భద్రపరచబడింది!',
    agronomyLibraryTitle: 'వ్యవసాయ విజ్ఞాన నిధి',
    pathogenLabel: 'కారణమైన శిలీంధ్రం/క్రిమి:',
    noDiseasesListed: 'ఈ పంటకు సమాచారం లభించలేదు.',

    // Demo Modal
    demoModalTitle: 'అగ్రిసెన్స్ డెమో విధానం',
    demoModalSub: '1-క్లిక్ ఉదాహరణల పరిశీలన',
    demoNote: 'ఉదాహరణను ఎంచుకుంటే ఆకు ఫోటో, వాతావరణం మరియు సలహా వెంటనే ప్రత్యక్షమవుతాయి.',

    // Common Text
    noneDetected: 'ఏమీ లేదు',
    normal: 'సాధారణం',
    optimal: 'అనుకూలం'
  },

  hi: {
    // Navigation & Branding
    navHome: 'होम',
    navDiagnose: 'फसल निदान',
    navWeather: 'मौसम',
    navAdvisory: 'सलाह पत्र',
    navHistory: 'इतिहास',
    navFarm: 'मेरा खेत',
    demoMode: 'डेमो मोड',
    climateIntel: 'मौसम बुद्धिमत्ता',
    tagline: 'खेत के संकेतों से सही कृषि कार्रवाई तक',
    systemStatus: 'सिस्टम स्थिति: पूर्ण कार्यशील',

    // Home Page
    heroTitlePrefix: 'अपने खेत के संकेतों को ',
    heroTitleSuffix: 'स्मार्ट कृषि कार्रवाई में बदलें।',
    heroSubtitle: 'अपनी फसल की पत्ती का फोटो लें। एग्रीसेंस AI बीमारी की पहचान करता है, लाइव मौसम की जांच करता है और बताता है कि क्या करना है और किस समय छिड़काव करना सबसे सुरक्षित है।',
    btnDiagnose: 'फसल जांच और सही समय जानें',
    btnDemo: '1-क्लिक डेमो उदाहरण देखें',
    aiVisionPathology: 'AI फसल बीमारी जांच',
    aiVisionPathologyDesc: 'बीमारी, कीट और पोषक तत्वों की कमी पहचानता है',
    liveWeatherMetrics: 'लाइव मौसम संकेतक',
    liveWeatherMetricsDesc: 'बारिश का जोखिम, हवा की गति, नमी',
    actionWindowEngine: 'सही समय सीमा इंजन',
    actionWindowEngineDesc: 'छिड़काव का सटीक समय (जैसे कल सुबह 7-10 बजे)',
    latestAdvisoryTitle: 'नवीनतम फसल सलाह और कार्रवाई का समय',
    viewFullReport: 'पूरी रिपोर्ट देखें →',
    analyzedCrop: 'जांची गई फसल',
    agronomicDecision: 'कृषि निर्णय',
    openFullAdvisory: 'पूरी सलाह खोलें',
    liveWeatherDashboard: 'लाइव खेत का मौसम',
    fiveDayForecastLink: '5 दिवसीय पूर्वानुमान →',
    supportedCrops: 'उपलब्ध फसलें',
    eightCrops: '8 समर्थित फसलें',

    // Crop Names & Categories
    tomato: 'टमाटर',
    rice: 'धान (चावल)',
    wheat: 'गेहूं',
    cotton: 'कपास',
    maize: 'मक्का',
    chilli: 'मिर्च',
    potato: 'आलू',
    groundnut: 'मूंगफली',
    vegetable: 'सब्जी',
    cerealGrain: 'अनाज फसल',
    cashCrop: 'नकदी फसल',
    spice: 'मसाला / सब्जी',
    tuber: 'कंद फसल',
    oilseed: 'तिलहन फसल',

    // Diagnose Page
    selectCropStep: '1. अपनी फसल चुनें',
    cropSelectedLabel: 'चुनी गई फसल',
    photoCaptureStep: '2. पत्ती का फोटो खींचें या अपलोड करें',
    qualityValidated: 'गुणवत्ता जांची गई',
    btnCamera: 'लाइव कैमरा खोलें',
    btnBrowse: 'गैलरी से चुनें',
    alignLeafInsideBox: 'पत्ती को बॉक्स में सही रखें',
    btnTakeSnapshot: 'फोटो खींचें',
    btnCancel: 'रद्द करें',
    photoReady: 'पत्ती की फोटो जांच के लिए तैयार है',
    btnRemoveRetake: 'हटाएं और दोबारा खींचें',
    uploadInstructionTitle: 'पत्ती का फोटो खींचें या अपलोड करें',
    uploadInstructionSub: 'JPG, PNG, WEBP समर्थित। बीमारी के धब्बों की साफ और पास से फोटो लें।',
    sampleLeafTitle: 'या परीक्षण के लिए नमूना पत्ती चुनें:',
    btnRunAI: 'AI जांच शुरू करें',
    analyzing: 'बीमारी और मौसम का विश्लेषण किया जा रहा है...',

    // Location & Weather
    fieldLocation: 'खेत का स्थान',
    gpsActive: 'GPS और मौसम तैयार है',
    btnUseGPS: 'ऑटो GPS का उपयोग करें',
    locating: 'स्थान खोजा जा रहा है...',
    searchPlaceholder: 'गांव, शहर का नाम खोजें या बोलें...',
    micListening: 'आपकी आवाज सुन रहा है...',
    quickRegions: 'प्रमुख कृषि क्षेत्र:',
    fieldTemp: 'खेत का तापमान',
    rainRisk: 'बारिश की संभावना',
    windSpeed: 'हवा की गति',
    humidity: 'नमी का स्तर',
    precipitation: 'वर्षा की मात्रा',
    sprayingCondition: 'छिड़काव के लिए मौसम की स्थिति:',
    safeForSpraying: '✓ छिड़काव के लिए सुरक्षित मौसम',
    postponeSpraying: '⚠ छिड़काव स्थगित करें (बारिश/हवा का जोखिम)',
    fiveDayForecast: '5 दिवसीय मौसम पूर्वानुमान',
    today: 'आज',
    tomorrow: 'कल',
    next3h: 'अगले 3 घंटे',
    next6h: 'अगले 6 घंटे',
    tomorrowAM: 'कल सुबह',
    tomorrowPM: 'कल शाम',

    // Decision Engine Statuses & Risk Matrix
    actNow: '🟢 तुरंत कार्रवाई करें',
    waitWindow: '🟡 बेहतर मौसम की प्रतीक्षा करें',
    avoidAction: '🔴 अभी कोई छिड़काव न करें',
    insufficientInfo: '🟠 अतिरिक्त जानकारी की आवश्यकता',

    coreDifferentiator: 'मुख्य विशेषता',
    precisionWeatherEngine: 'मौसम आधारित सटीक सलाह इंजन',
    actionWindowLabel: 'अनुशंसित सही समय सीमा',
    whyTitle: 'यह समय क्यों अनुशंसित किया गया है',
    riskMatrixTitle: 'मौसम और छिड़काव जोखिम विश्लेषण',
    weatherWarningsTitle: 'मौसम संबंधी चेतावनी',
    rainWashoffRisk: 'दवा बहने का जोखिम',
    windDriftRisk: 'हवा से दवा उड़ने का जोखिम',
    humidityPressure: 'नमी से बीमारी फैलने का खतरा',
    heatEvaporationRisk: 'गर्मी से दवा सूखने का जोखिम',
    safe: 'सुरक्षित',
    highDriftRisk: 'हवा की गति तेज',
    acceleratingSpores: 'नमी अधिक',
    highEvaporation: 'तापमान अधिक',
    moderate: 'मध्यम',

    // AI Pathology Diagnosis Card
    aiPathologyTitle: 'AI फसल बीमारी जांच रिपोर्ट',
    targetCropLabel: 'जांची गई फसल:',
    engineLabel: 'तकनीक:',
    confidenceLabel: 'सटीकता',
    severityLabel: 'गंभीरता',
    symptomsTitle: 'पहचाने गए मुख्य लक्षण',
    alternativeCausesTitle: 'अन्य संभावित कारण:',
    lowConfidenceAlertTitle: 'कम सटीकता चेतावनी',
    lowConfidenceAlertSub: 'इस फोटो की सटीकता कम है। हम सलाह देते हैं:',
    lowConfidenceStep1: 'अच्छी रोशनी में पत्ती की पास से दोबारा फोटो लें।',
    lowConfidenceStep2: 'छिड़काव से पहले नजदीकी कृषि अधिकारी या विशेषज्ञ से सलाह लें।',

    // Severity Levels
    critical: 'अत्यंत गंभीर',
    high: 'गंभीर',
    medium: 'मध्यम',
    healthy: 'स्वस्थ',

    // Advisory Page (3 Questions)
    advisoryReportTitle: 'संपूर्ण कृषि सलाह रिपोर्ट',
    q1Title: '1. फसल में क्या समस्या है?',
    q2Title: '2. किसान को क्या करना चाहिए?',
    q3Title: '3. छिड़काव कब करना चाहिए?',
    recommendedActionLabel: 'अनुशंसित उपचार और कार्रवाई:',
    weatherRationaleLabel: 'मौसम का कारण:',
    practicalStepsTitle: 'चरण-दर-चरण कृषि निर्देश',
    preventiveTitle: 'रोकथाम और लंबी अवधि के उपाय',
    disclaimerTitle: 'कीटनाशक सुरक्षा और कानूनी अस्वीकरण',
    btnSaveAdvisory: 'सलाह सुरक्षित करें',
    btnSaved: 'सुरक्षित कर लिया गया',
    btnPrint: 'रिपोर्ट प्रिंट करें',

    // Voice Features
    voiceAdvisoryTitle: 'किसान वॉइस सलाह',
    btnListen: '🔊 आवाज में सलाह सुनें (हिन्दी)',
    btnSpeaking: 'सलाह पढ़ रहा है...',
    btnStopVoice: '⏹️ आवाज बंद करें (Stop)',
    readingAloud: 'सलाह बोलकर पढ़ी जा रही है...',
    voiceNotSupported: 'आपके ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है। ऊपर दिए गए पाठ को पढ़ें।',
    voiceSelectLang: 'आवाज की भाषा चुनें:',
    micPermissionDenied: 'माइक की अनुमति अस्वीकृत की गई।',

    // History Page
    historyTitle: 'पिछली फसल सलाह का इतिहास',
    savedRecords: 'सुरक्षित रिकॉर्ड',
    allCrops: 'सभी फसलें',
    noRecords: 'कोई पिछला रिकॉर्ड नहीं मिला।',
    runDiagnosePrompt: 'नई सलाह के लिए फसल जांच करें।',
    deleteRecord: 'हटाएं',

    // Farm Profile & Settings
    farmProfileTitle: 'मेरा खेत विवरण',
    activeRegionLabel: 'वर्तमान क्षेत्र:',
    apiConfigTitle: 'AI विजन इंजन सेटिंग्स',
    customKeyActive: 'कस्टम कुंजी सक्रिय',
    defaultKeyActive: 'डिफ़ॉल्ट इंजन सक्रिय',
    apiConfigDesc: 'एग्रीसेंस AI में इन-बिल्ट बीमारी जांच इंजन है। यदि आप गूगल जेमिनी API का उपयोग करना चाहते हैं तो अपनी कुंजी दर्ज करें:',
    btnSaveKey: 'कुंजी सुरक्षित करें',
    keySaved: 'कुंजी सुरक्षित!',
    agronomyLibraryTitle: 'कृषि ज्ञानकोश संदर्भ',
    pathogenLabel: 'कारक रोगाणु/कीट:',
    noDiseasesListed: 'इस फसल के लिए कोई बीमारी सूचीबद्ध नहीं है।',

    // Demo Modal
    demoModalTitle: 'एग्रीसेंस डेमो मोड',
    demoModalSub: '1-क्लिक उदाहरण जांच',
    demoNote: 'उदाहरण चुनने पर फोटो, मौसम और सलाह तुरंत दिखाई देंगे।',

    // Common Text
    noneDetected: 'कोई नहीं',
    normal: 'सामान्य',
    optimal: 'अनुकूल'
  }
};

// Disease Title Translator Helper
export const translateDiseaseName = (diseaseName = '', lang = 'en') => {
  if (lang === 'en') return diseaseName;

  const mapTe = {
    'Early Blight': 'అల్టర్నేరియా అర్లీ బ్లైట్ (మచ్చల తెగులు)',
    'Late Blight': 'లేట్ బ్లైట్ (లేట్ తెగులు)',
    'Tomato Yellow Leaf Curl': 'టమోటా ఆకు ముడుత వైరస్',
    'Healthy Tomato': 'ఆరోగ్యకరమైన టమోటా పంట',
    'Healthy Crop (No Disease Detected)': 'ఆరోగ్యకరమైన పంట (తెగుళ్లు లేవు)',
    'Rice Leaf Blast': 'వరి అగ్గి తెగులు (లీఫ్ బ్లాస్ట్)',
    'Bacterial Leaf Blight': 'వరి బాక్టీరియా ఎండు తెగులు',
    'Chilli Leaf Curl Virus': 'మిరప ఆకు ముడుత వైరస్',
    'Yellow Stripe Rust': 'గోధుమ పసుపు కుంకుమ తెగులు',
    'Fall Armyworm': 'కత్తిరి పురుగు (లద్దె పురుగు)',
    'Pink Bollworm': 'ప్రత్తి గులాబీ రంగు కాయ తొలుచు పురుగు',
    'Tikka Leaf Spot': 'వేరుశనగ తిక్కా ఆకుమచ్చ తెగులు'
  };

  const mapHi = {
    'Early Blight': 'अगेती झुलसा रोग (अर्ली ब्लाइट)',
    'Late Blight': 'पछेती झुलसा रोग (लेट ब्लाइट)',
    'Tomato Yellow Leaf Curl': 'टमाटर पत्ती मरोड़ वायरस',
    'Healthy Tomato': 'स्वस्थ टमाटर की फसल',
    'Healthy Crop (No Disease Detected)': 'स्वस्थ फसल (कोई बीमारी नहीं)',
    'Rice Leaf Blast': 'धान का झोंका रोग (लीफ ब्लास्ट)',
    'Bacterial Leaf Blight': 'धान का जीवाणु झुलसा रोग',
    'Chilli Leaf Curl Virus': 'मिर्च का पत्ती मरोड़ रोग',
    'Yellow Stripe Rust': 'गेहूं का पीला रतुआ रोग',
    'Fall Armyworm': 'फॉलो आर्मीवर्म (कीट हमला)',
    'Pink Bollworm': 'कपास गुलाबी सुंडी कीट',
    'Tikka Leaf Spot': 'मूंगफली का टिक्का रोग'
  };

  if (lang === 'te') return mapTe[diseaseName] || diseaseName;
  if (lang === 'hi') return mapHi[diseaseName] || diseaseName;
  return diseaseName;
};

// Reasoning Explanation Translator Helper
export const translateReasoningText = (reasoningText = '', lang = 'en') => {
  if (lang === 'en') return reasoningText;

  if (reasoningText.includes('Heavy rain')) {
    if (lang === 'te') return 'తదుపరి 6 గంటల్లో భారీ వర్షం పడే అవకాశం ఉన్నందున మందు చల్లితే కొట్టుకుపోతుంది. పైగా ఈ రోజు గాలి వేగం ఎక్కువ. రేపు ఉదయం 7 నుండి 10 గంటల మధ్య వర్షం తగ్గి గాలి ప్రశాంతంగా ఉన్నప్పుడు మందు చల్లడం మంచిది.';
    if (lang === 'hi') return 'अगले 6 घंटों में भारी बारिश की संभावना है जिससे दवा बह जाएगी। हवा की गति भी अधिक है। कल सुबह 7 से 10 बजे के बीच जब बारिश कम और हवा शांत हो तब छिड़काव करें।';
  }

  if (reasoningText.includes('critical stage') || reasoningText.includes('ACT NOW')) {
    if (lang === 'te') return 'పంట తెగులు తీవ్ర దశలో ఉంది. తదుపరి 48 గంటలు పొడి వాతావరణం ఉన్నందున మందు కొట్టుకుపోయే ప్రమాదం లేదు. గాలి వేగం తక్కువగా ఉన్నందున వెంటనే మందు చల్లడం సురక్షితం.';
    if (lang === 'hi') return 'फसल बीमारी गंभीर चरण में है। अगले 48 घंटे सूखा मौसम रहेगा जिससे दवा नहीं बहेगी। हवा की गति कम होने के कारण तुरंत छिड़काव करना सुरक्षित है।';
  }

  if (reasoningText.includes('high wind speed') || reasoningText.includes('vector thrips')) {
    if (lang === 'te') return 'ప్రస్తుతం గాలి వేగం ఎక్కువగా ఉన్నందున మందు పక్కకు కొట్టుకుపోతుంది. రేపు ఉదయం గాలి వేగం తగ్గినప్పుడు నీమ్‌ ఆయిల్‌ స్ప్రే చల్లడం మంచిది.';
    if (lang === 'hi') return 'वर्तमान में हवा की गति तेज है जिससे दवा उड़ जाएगी। कल सुबह जब हवा शांत हो तब नीम तेल का छिड़काव करें।';
  }

  if (reasoningText.includes('healthy') || reasoningText.includes('clean')) {
    if (lang === 'te') return 'మీ పంట ఆకులు పూర్తి ఆరోగ్యంగా ఉన్నాయి. ఎలాంటి తెగుళ్లు లేనందున మందులు చల్లవలసిన అవసరం లేదు. అనవసర ఖర్చు తగ్గించుకోండి.';
    if (lang === 'hi') return 'आपकी फसल पूरी तरह स्वस्थ है। कोई बीमारी न होने के कारण किसी छिड़काव की आवश्यकता नहीं है। अनावश्यक खर्च से बचें।';
  }

  return reasoningText;
};

export const getTranslation = (langCode = 'en') => {
  return TRANSLATIONS[langCode] || TRANSLATIONS.en;
};
