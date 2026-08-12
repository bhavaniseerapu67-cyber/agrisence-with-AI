// Comprehensive Agronomy Knowledge Layer
// Provides agronomic rules, symptoms, IPM treatment guidelines, and weather constraints

export const AGRONOMY_KNOWLEDGE = {
  tomato: {
    'Early Blight': {
      category: 'Fungal Disease',
      pathogen: 'Alternaria solani',
      severity: 'Medium-High',
      symptoms: [
        'Concentric ring spots ("target spots") on older lower leaves',
        'Yellow halos surrounding dark brown necrotic leaf spots',
        'Leaf yellowing, premature defoliation starting from canopy base',
        'Dark sunken lesions near stems and fruit calyx'
      ],
      alternativeCauses: ['Late Blight', 'Septoria Leaf Spot', 'Bacterial Spot'],
      prevention: [
        'Use certified disease-free seeds and resistant varieties',
        'Practice 2-3 year crop rotation with non-solanaceous crops',
        'Mulch soil around plant bases to prevent fungal spore splash-back',
        'Maintain proper plant spacing for canopy aeration and fast drying'
      ],
      safeTreatment: [
        'Prune and remove infected lower leaves early and dispose of them away from the field',
        'Apply bio-fungicides such as Trichoderma harzianum or Bacillus subtilis as foliar spray',
        'For conventional protective sprays, use copper-based formulations or recommended protective fungicides',
        'Avoid overhead sprinkler irrigation; use drip or furrow irrigation to keep foliage dry'
      ],
      weatherSafety: {
        rainSensitivity: 'High (Rain within 6h washes off spray and spreads fungal spores)',
        humidityThreshold: 75, // Fungal spores germinate when RH > 75%
        maxWindSpeed: 12, // km/h max for foliar spraying
        idealTemperatureRange: [18, 28] // °C
      }
    },
    'Late Blight': {
      category: 'Oomycete Fungal Disease',
      pathogen: 'Phytophthora infestans',
      severity: 'Critical',
      symptoms: [
        'Water-soaked dark green/brown pale blotches on leaves and stems',
        'White cottony fungal growth on leaf undersides during humid morning hours',
        'Rapid collapse and blackening of entire foliage canopy',
        'Firm, brown leathery rot on tomato fruits'
      ],
      alternativeCauses: ['Early Blight', 'Gray Mold (Botrytis)', 'Bacterial Canker'],
      prevention: [
        'Plant resistant varieties and monitor fields daily during cool, wet weather',
        'Destroy volunteer tomato and potato plants near field margins',
        'Ensure wide row spacing to maximize sunlight penetration'
      ],
      safeTreatment: [
        'Immediately destroy heavily blighted plants to stop spore cloud dissemination',
        'Apply preventive bio-control agents or protective copper hydroxide spray prior to rain',
        'Ensure spray covers lower undersides of leaves thoroughly',
        'Consult local agricultural extension officers for region-approved bio-fungicides'
      ],
      weatherSafety: {
        rainSensitivity: 'Extreme (High humidity >85% + cool temp 15-22°C creates rapid outbreak risk)',
        humidityThreshold: 80,
        maxWindSpeed: 10,
        idealTemperatureRange: [15, 22]
      }
    },
    'Tomato Yellow Leaf Curl': {
      category: 'Viral Disease (Whitefly Transmitted)',
      pathogen: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
      severity: 'High',
      symptoms: [
        'Severe upward curling and cupping of young leaves',
        'Marginal leaf chlorosis (yellowing between veins)',
        'Stunted plant height and bushy rosette appearance',
        'Flower drop and drastic reduction in fruit set'
      ],
      alternativeCauses: ['Thrips damage', 'Herbicide drift', 'Water stress'],
      prevention: [
        'Install yellow sticky traps (15-20 per acre) to monitor whitefly vectors',
        'Use insect-proof mesh (40-50 mesh size) in seedling nurseries',
        'Reflective silver mulches deter whiteflies from landing on young seedlings'
      ],
      safeTreatment: [
        'Spray Neem seed kernel extract (NSKE 5%) or Azadirachtin 10,000 ppm to manage whitefly vectors',
        'Rogue out severely virus-infected plants early to reduce field virus reservoir',
        'Introduce natural predators like Chrysoperla carnea (Green lacewing larvae)'
      ],
      weatherSafety: {
        rainSensitivity: 'Low rain effect on virus, but heavy rain reduces vector whitefly population',
        humidityThreshold: 60,
        maxWindSpeed: 15,
        idealTemperatureRange: [22, 35]
      }
    },
    'Healthy Tomato': {
      category: 'Healthy',
      pathogen: 'None',
      severity: 'Healthy',
      symptoms: [
        'Vibrant green, sturdy foliage with clear leaf margins',
        'No visible spots, discoloration, or pest feeding damage',
        'Healthy flower clusters and steady fruit development'
      ],
      alternativeCauses: [],
      prevention: [
        'Maintain balanced fertilization based on soil test recommendations',
        'Ensure consistent watering schedule to avoid calcium transport issues',
        'Regular field monitoring twice a week'
      ],
      safeTreatment: [
        'No corrective spray needed!',
        'Continue standard irrigation, weeding, and organic compost application'
      ],
      weatherSafety: {
        rainSensitivity: 'None',
        humidityThreshold: 90,
        maxWindSpeed: 25,
        idealTemperatureRange: [15, 35]
      }
    }
  },

  rice: {
    'Rice Leaf Blast': {
      category: 'Fungal Disease',
      pathogen: 'Magnaporthe oryzae',
      severity: 'Critical',
      symptoms: [
        'Spindle-shaped or diamond-shaped lesions with gray/white centers and reddish-brown margins',
        'Large lesions coalesce causing entire leaves to wither and turn brown',
        'Neck rot causing empty/chaffy panicles ("neck blast")',
        'Blackening at leaf collar nodes'
      ],
      alternativeCauses: ['Brown Spot', 'Narrow Brown Leaf Spot', 'Bacterial Leaf Streak'],
      prevention: [
        'Avoid excessive nitrogen fertilizer applications which promote succulent susceptible growth',
        'Maintain optimum field water level (5-7 cm standing water inhibits spore multiplication)',
        'Use resistant cultivars recommended for your agro-ecological zone'
      ],
      safeTreatment: [
        'Apply Pseudomonas fluorescens bio-formulation (10g/liter) at boot leaf stage',
        'Apply recommended protective bio-fungicide or systemic triazole spray at first sight of spots',
        'Split nitrogen fertilizer doses into 3-4 smaller applications rather than 1 heavy dose'
      ],
      weatherSafety: {
        rainSensitivity: 'High (Dew periods >10 hours or frequent drizzle accelerate spore germination)',
        humidityThreshold: 85,
        maxWindSpeed: 10,
        idealTemperatureRange: [20, 28]
      }
    },
    'Bacterial Leaf Blight': {
      category: 'Bacterial Disease',
      pathogen: 'Xanthomonas oryzae pv. oryzae',
      severity: 'High',
      symptoms: [
        'Water-soaked yellow-to-white wavy stripes starting from leaf tips and margins',
        'Milky bacterial ooze droplets visible on leaf surfaces during humid mornings',
        'Drying and grayish roll of affected leaves ("kresek" wilt stage in young plants)'
      ],
      alternativeCauses: ['Rice Leaf Blast', 'Bacterial Leaf Streak', 'Potassium Deficiency'],
      prevention: [
        'Ensure clean irrigation water; avoid transferring water from infected fields',
        'Drain field temporarily if severe bacterial ooze is observed',
        'Balance nitrogen with adequate potassium fertilization'
      ],
      safeTreatment: [
        'Spray Copper Oxychloride 50% WP (2.5g/L) mixed with Streptocycline or bio-bactericide as per local extension guide',
        'Avoid field operations when leaves are wet to prevent spreading bacteria via clothing/tools'
      ],
      weatherSafety: {
        rainSensitivity: 'Extreme (Heavy rain and strong wind damage leaves and spread bacterial bacteria rapidly)',
        humidityThreshold: 80,
        maxWindSpeed: 8,
        idealTemperatureRange: [25, 34]
      }
    }
  },

  chilli: {
    'Chilli Leaf Curl Virus': {
      category: 'Viral Disease (Thrips/Whitefly Vector)',
      pathogen: 'Begomovirus / Chilli Leaf Curl Virus',
      severity: 'High',
      symptoms: [
        'Upward curling, crinkling, and puckering of leaves',
        'Thickened leaf veins and reduced leaf size ("boat shaped" leaves)',
        'Stunted plant growth with shortened internodes',
        'Flower drop and distorted, undersized pods'
      ],
      alternativeCauses: ['Thrips damage (downward curling)', 'Mite infestation', 'Herbicide injury'],
      prevention: [
        'Raise seedlings under 40-mesh insect net cover',
        'Plant barrier crops like maize or sorghum around chilli plots (4-5 rows)',
        'Apply neem cake to soil at land preparation to reduce pest pupation'
      ],
      safeTreatment: [
        'Spray Neem Oil 10,000 ppm (3-5 ml/L) with liquid soap sticker to control vector populations',
        'Spray bio-pesticide Beauveria bassiana or Lecanicillium lecanii for sucking pest management',
        'Remove severely virus-stunted plants to prevent spread to neighboring healthy plants'
      ],
      weatherSafety: {
        rainSensitivity: 'Low direct rain effect; high wind helps thrips dispersal',
        humidityThreshold: 70,
        maxWindSpeed: 12,
        idealTemperatureRange: [20, 32]
      }
    }
  },

  wheat: {
    'Yellow Stripe Rust': {
      category: 'Fungal Disease',
      pathogen: 'Puccinia striiformis',
      severity: 'Critical',
      symptoms: [
        'Bright yellow-orange linear stripes of fungal pustules on leaf blades along veins',
        'Yellow powdery dust (spores) rubs off easily onto fingers',
        'Premature drying of leaf canopy leading to severe grain yield loss'
      ],
      alternativeCauses: ['Leaf Rust (Brown Rust)', 'Stem Rust', 'Physiological Leaf Spot'],
      prevention: [
        'Sow rust-resistant varieties recommended by agricultural universities',
        'Avoid late sowing; early sown crops often escape peak rust pressure'
      ],
      safeTreatment: [
        'Spray bio-fungicide or targeted protective fungicide at early onset of yellow stripes',
        'Focus spray coverage on top flag leaves which contribute 70% to grain filling'
      ],
      weatherSafety: {
        rainSensitivity: 'Moderate (Dew and high humidity 10-15°C promote spore germination)',
        humidityThreshold: 80,
        maxWindSpeed: 10,
        idealTemperatureRange: [10, 18]
      }
    }
  },

  maize: {
    'Fall Armyworm': {
      category: 'Insect Pest',
      pathogen: 'Spodoptera frugiperda',
      severity: 'Critical',
      symptoms: [
        'Ragged holes in leaf whorls with heavy moist brownish frass (excreta)',
        'Caterpillar with Y-shape mark on head and 4 dark spots arranged in square on tail segment',
        'Destruction of growing point (whorl damage) and cob feeding'
      ],
      alternativeCauses: ['Maize Stem Borer', 'Corn Earworm', 'Grasshopper damage'],
      prevention: [
        'Deep autumn plowing to expose pupae to birds and sunlight',
        'Intercrop maize with cowpea or desmodium (Push-Pull technique)',
        'Install Pheromone traps (4 traps/acre) for early moth monitoring'
      ],
      safeTreatment: [
        'Apply dry soil, wood ash, or sand mixed with neem powder directly inside the central leaf whorl',
        'Release Trichogramma chilonis egg parasitoids (50,000/acre)',
        'Spray bio-insecticide Metarhizium anisopliae or Bacillus thuringiensis (Bt) in whorls early morning'
      ],
      weatherSafety: {
        rainSensitivity: 'Heavy rain can wash young caterpillars out of whorls',
        humidityThreshold: 65,
        maxWindSpeed: 15,
        idealTemperatureRange: [20, 32]
      }
    }
  },

  potato: {
    'Late Blight': {
      category: 'Oomycete Fungal Disease',
      pathogen: 'Phytophthora infestans',
      severity: 'Critical',
      symptoms: [
        'Water-soaked dark lesions on leaf tips and margins',
        'White mildew on leaf undersides under moist humid conditions',
        'Tuber rot with reddish-brown dry rot below skin'
      ],
      alternativeCauses: ['Early Blight', 'Bacterial Wilt'],
      prevention: [
        'Use certified disease-free seed tubers',
        'High earthing up of soil around potato stems to shield tubers from falling spores'
      ],
      safeTreatment: [
        'Spray protective copper fungicides or Trichoderma bio-agent before rain events',
        'Destroy infected haulms (vines) 10-14 days before harvest'
      ],
      weatherSafety: {
        rainSensitivity: 'Extreme',
        humidityThreshold: 85,
        maxWindSpeed: 10,
        idealTemperatureRange: [12, 22]
      }
    }
  },

  cotton: {
    'Pink Bollworm': {
      category: 'Insect Pest',
      pathogen: 'Pectinophora gossypiella',
      severity: 'Critical',
      symptoms: [
        'Rosetted flowers that fail to open fully',
        'Small entry holes in green bolls sealed with frass',
        'Lint discoloration and seed kernel damage inside mature bolls'
      ],
      alternativeCauses: ['American Bollworm', 'Spotted Bollworm'],
      prevention: [
        'Destroy crop residue and avoid double cropping/extension of cotton season',
        'Install pheromone traps (5/acre) for moth monitoring'
      ],
      safeTreatment: [
        'Release Trichogrammatoidea bactrae parasitoids',
        'Spray Neem oil formulations (10,000 ppm) at egg laying stage'
      ],
      weatherSafety: {
        rainSensitivity: 'Moderate',
        humidityThreshold: 70,
        maxWindSpeed: 15,
        idealTemperatureRange: [22, 35]
      }
    }
  },

  groundnut: {
    'Tikka Leaf Spot': {
      category: 'Fungal Disease',
      pathogen: 'Cercospora arachidicola / Phaeoisariopsis personata',
      severity: 'Medium-High',
      symptoms: [
        'Small circular dark brown/black spots on upper leaf surfaces surrounded by yellow halo',
        'Severe premature leaf drop leaving bare stems'
      ],
      alternativeCauses: ['Rust', 'Pepper Spot'],
      prevention: [
        'Crop rotation and field sanitation',
        'Seed treatment with Trichoderma viride'
      ],
      safeTreatment: [
        'Foliar spray of Pseudomonas fluorescens or protective copper spray',
        'Maintain proper soil phosphorus and potassium levels'
      ],
      weatherSafety: {
        rainSensitivity: 'High',
        humidityThreshold: 75,
        maxWindSpeed: 12,
        idealTemperatureRange: [22, 30]
      }
    }
  }
};

// Fallback lookup if specific crop/problem combo is missing
export const getAgronomyInfo = (cropId, problemTitle) => {
  const cropData = AGRONOMY_KNOWLEDGE[cropId?.toLowerCase()];
  if (cropData && cropData[problemTitle]) {
    return cropData[problemTitle];
  }
  // Return intelligent default template
  return {
    category: 'Crop Health Issue',
    pathogen: 'Agronomic Stress / Pest / Fungal',
    severity: 'Medium',
    symptoms: [
      `Visible discoloration, spot formation, or structural stress on ${cropId || 'crop'} foliage`,
      'Reduced leaf chlorophyll activity and potential canopy vigor drop'
    ],
    alternativeCauses: ['Nutrient Imbalance', 'Environmental Heat/Water Stress', 'Fungal Infection'],
    prevention: [
      'Practice crop sanitation and weed management along field boundaries',
      'Use certified quality seeds and balanced soil nutrition',
      'Inspect fields twice weekly during vulnerable growth stages'
    ],
    safeTreatment: [
      'Apply neem-based organic bio-pesticide (10,000 ppm) or Trichoderma bio-fungicide',
      'Improve soil drainage and avoid water stagnation near roots',
      'Consult local extension officer for region-specific registered solutions'
    ],
    weatherSafety: {
      rainSensitivity: 'Moderate (Avoid spraying prior to anticipated heavy rain)',
      humidityThreshold: 75,
      maxWindSpeed: 12,
      idealTemperatureRange: [18, 32]
    }
  };
};
